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
      return res.status(400).json({ message: e.message })
    }
  }
  async login(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json(errors)
      }
      const { name, password } = req.body
      const { refresh, token } = await AuthService.login({ name, password })
      return res.json({ token, refresh })
    } catch (e) {
      return res.status(400).json({ message: e.message })
    }
  }
  async refresh(req, res) {
    try {
      const { refresh } = req.body
      const data = await AuthService.refresh({
        refresh,
        ...req.user
      })
      return res.json(data)
    } catch (e) {
      return res.status(400).json({ message: e.message })
    }
  }
  async logOut(req, res) {
    try {
      await AuthService.logout({ ...req.body })
      return res.json({ message: 'success' })
    } catch (e) {
      return res.status(400).json({ message: e.message })
    }
  }
}

export default new AuthController()
