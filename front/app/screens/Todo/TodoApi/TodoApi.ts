import instance from '@/app/Api'
import TodyType from '@/app/screens/Todo/model/Todo'

export const TodoApi = {
  async getAllTodos() {
    return await instance.get<TodyType[]>('todos')
  },
  async deleteTodo(_id: string) {
    return await instance.delete(`todos/${_id}`)
  },
  async addTodo({ title }: { title: string }) {
    return await instance.post(`todos/`, { title })
  },
  async updateTodo(data: { done: boolean; _id: string }) {
    return await instance.put(`todos/${data._id}`, { done: data.done })
  }
}
