import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query/react'
import { TodoApi } from '../TodoApi/TodoApi';

export const useGetAllTodo = () => {
  return useQuery('getAllTodo', TodoApi.getAllTodos, {
    onError: () => toast.error('Не удлось загрузить задачи')
  })
}
