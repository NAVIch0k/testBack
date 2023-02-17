import Router from 'express'
import PostController from '../Controllers/PostController.js'

const TodosRouter = new Router()

TodosRouter.post('/', PostController.create)
TodosRouter.get('/', PostController.getAll)
TodosRouter.get('/:id', PostController.getById)
TodosRouter.put('/:id', PostController.update)
TodosRouter.delete('/:id', PostController.delete)

export default TodosRouter