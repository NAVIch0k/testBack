import { toast } from 'react-hot-toast';
import { TodoApi } from '../TodoApi/TodoApi';
import { useMutation } from 'react-query/react'
import { queryClient } from '@/pages/_app';
export const useUpdateTodo = () => {
  return useMutation(
    'updateTodo',
    (data: { done: boolean; _id: string }) => TodoApi.updateTodo(data),{
        onSuccess(){
            toast.success('Задача обновлена!')
            queryClient.invalidateQueries('getAllTodo')
        }
    }
  )
}
