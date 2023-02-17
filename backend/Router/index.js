import Router from 'express'
import AuthRouter from './AuthRouter.js'
import TodosRouter from './TodosRouter.js'

const router = new Router()

router.use('/todos', TodosRouter)
router.use('/', AuthRouter)

export default router
