import { useMutation } from 'react-query/react';
import { toast } from 'react-hot-toast';
import { TodoApi } from './../TodoApi/TodoApi';
import { queryClient } from '@/pages/_app'
export const useAddTodo = () => {
  return useMutation(
    'addTodo',
    ({ title }: { title: string }) => TodoApi.addTodo({ title }),
    {
      onSuccess() {
        toast.success('Задача добавлена!')
        queryClient.invalidateQueries('getAllTodo')
      }
    }
  )
}
