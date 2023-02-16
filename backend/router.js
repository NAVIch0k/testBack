import Router from 'express'
import PostController from './PostController.js'

const router = new Router()

router.post('/todos', PostController.create)
router.get('/todos', PostController.getAll)
router.get('/todos/:id', PostController.getById)
router.put('/todos', PostController.update)
router.delete('/todos/:id', PostController.delete)

export default router
