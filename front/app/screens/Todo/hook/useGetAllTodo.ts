import { TodoApi } from './../../../Api/TodoApi/TodoApi'
import { useQuery } from 'react-query'
import { toast } from 'react-hot-toast'

export const useGetAllTodo = () => {
  return useQuery('getAllTodo', TodoApi.getAllTodos, {
    onError: () => toast.error('Не удлось загрузить задачи')
  })
}
