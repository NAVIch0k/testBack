import User from '../Models/UserModel.js'
import Role from '../Models/RoleModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import SessionModel from '../Models/SessionModel.js'

const generateAccessToken = (role, name, userId, key, time) => {
  const payload = {
    role,
    name,
    userId
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
      user._id,
      process.env.SECRET_KEY,
      '5s'
    )
    const refresh = generateAccessToken(
      user.role,
      user.name,
      user._id,
      process.env.SECRET_KEY_REFRESH,
      '24h'
    )
    const sessionUser = await SessionModel.findOne({ user: user._id })
    if (sessionUser) {
      await SessionModel.findOneAndUpdate({ user: user._id }, { refresh })
    } else {
      const userSession = new SessionModel({
        refresh,
        user: user._id
      })
      userSession.save()
    }
    return { token, refresh }
  }
  async refresh({ refresh: myRefresh }) {
    try {
      const sessionUser = await SessionModel.findOne({ refresh: myRefresh })
      if (!sessionUser) {
        throw new Error('user not found')
      }
      const decodeData = jwt.verify(myRefresh, process.env.SECRET_KEY_REFRESH)
      const token = generateAccessToken(
        decodeData.role,
        decodeData.name,
        decodeData.userId,
        process.env.SECRET_KEY,
        '20m'
      )
      const refresh = generateAccessToken(
        decodeData.role,
        decodeData.name,
        decodeData.userId,
        process.env.SECRET_KEY_REFRESH,
        '24h'
      )
      await SessionModel.findOneAndUpdate({ refresh: myRefresh }, { refresh })
      return { refresh, token }
    } catch (e) {
      throw new Error('user not found')
    }
  }
  async logout({ refresh }) {
    try {
      const user = await SessionModel.findOne({ refresh })
      if (!user) throw new Error('user not found')
      await SessionModel.deleteOne({ refresh })
    } catch (e) {
      throw new Error('user not found')
    }
  }
}

export default new AuthService()
