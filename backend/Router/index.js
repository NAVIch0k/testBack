import Router from 'express'
import AuthRouter from './AuthRouter.js'
import TodosRouter from './TodosRouter.js'
import AuthMiddleWare from '../Middleware/AuthMiddleWare.js'

const router = new Router()

router.use('/todos', AuthMiddleWare, TodosRouter)
router.use('/', AuthRouter)

export default router
