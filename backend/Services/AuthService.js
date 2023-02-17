import User from '../Models/UserModel.js'
import Role from '../Models/RoleModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import SECRET_KEY from '../config.js'
const generateAccessToken = (id, role) => {
  const payload = {
    id,
    role
  }
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' })
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
    const token = generateAccessToken(user._id, user.role)
    return token
  }
}

export default new AuthService()
