import Router from 'express'
import AuthController from '../Controllers/AuthController.js'
import { check } from 'express-validator'

const AuthRouter = new Router()

AuthRouter.post(
  '/registration',
  [
    check('name', 'name must be less than 10 and greater than 4').isLength({
      min: 4,
      max: 10
    }),
    check(
      'password',
      'password must be less than 10 and greater than 4'
    ).isLength({ min: 4, max: 10 })
  ],
  AuthController.registration
)
AuthRouter.post(
  '/login',
  [
    check('name', 'name must be less than 10 and greater than 4').isLength({
      min: 4,
      max: 10
    }),
    check(
      'password',
      'password must be less than 10 and greater than 4'
    ).isLength({ min: 4, max: 10 })
  ],
  AuthController.login
)

export default AuthRouter
