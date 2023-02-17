import Router from 'express'
import PostController from '../Controllers/PostController.js'

const AuthRouter = new Router()

AuthRouter.post('/registration', PostController.create)
AuthRouter.post('/login', PostController.getAll)
AuthRouter.get('/users', PostController.getById)

export default AuthRouter