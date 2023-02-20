import User from '../Models/UserModel.js'
import Role from '../Models/RoleModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import SessionModel from '../Models/SessionModel.js'

const generateAccessToken = (role, name, key, time) => {
  const payload = {
    role,
    name
  }
  return jwt.sign(payload, key, { expiresIn: time })
}

class AuthService {
  async create({ name, password }) {
    const dublicate = await User.findOne({ name })
    if (dublicate) {
      throw new Error('user with this login already exists')
    }
    const hashPass = bcrypt.hashSync(password, 7)
    const userRole = await Role.findOne({ value: 'USER' })
    const user = new User({
      name,
      password: hashPass,
      role: userRole.value
    })
    await user.save()
  }
  async login({ name, password }) {
    const user = await User.findOne({ name })
    if (!user) {
      throw new Error('name or password is invalid')
    }
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      throw new Error('name or password is invalid')
    }
    const token = generateAccessToken(
      user.role,
      user.name,
      process.env.SECRET_KEY,
      '5m'
    )
    const refresh = generateAccessToken(
      user.role,
      user.name,
      process.env.SECRET_KEY_REFRESH,
      '24h'
    )
    const sessionUser = await SessionModel.findOne({ user: user._id })
    if (sessionUser) {
      console.log(user._id);
      await SessionModel.findOneAndUpdate({user:user._id}, {refresh})
    } else {
      const userSession = new SessionModel({
        refresh,
        user: user._id
      })
      userSession.save()
    }
    return { token, refresh }
  }
  async refresh({ refresh: myRefresh, role, name }) {
    try {
      const sessionUser = await SessionModel.findOne({ refresh:myRefresh })
      console.log(sessionUser)
      if (!sessionUser) {
        throw new Error('user not found')
      }
      const token = generateAccessToken(role, name, process.env.SECRET_KEY)
      const refresh = generateAccessToken(
        role,
        name,
        process.env.SECRET_KEY_REFRESH
      )
      await SessionModel.findOneAndUpdate(myRefresh, { refresh: refresh })
      return { refresh, token }
    } catch (e) {
      throw new Error('user not found')
    }
  }
}

export default new AuthService()
