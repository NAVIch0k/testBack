import AuthService from '../Services/AuthService.js'
import { validationResult } from 'express-validator'

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json(errors)
      }
      const { name, password } = req.body
      await AuthService.create({ name, password })
      return res.json({ messaage: 'user created' })
    } catch (e) {
      return res.status(400).json(e.message)
    }
  }
  async login(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json(errors)
      }
      const { name, password } = req.body
      const token = await AuthService.login({ name, password })
      return res.json({ token })
    } catch (e) {
      return res.status(400).json(e.message)
    }
  }
}

export default new AuthController()
