import TodyType from '@/app/screens/Todo/model/Todo'
import instance from '../index'

export const TodoApi = {
  async getAllTodos() {
    return await instance.get<TodyType[]>('todos')
  },
  async deleteTodo(_id:string) {
    return await instance.delete(`todos/${_id}`)
  }
}
