import { useMutation } from 'react-query/react';
import { toast } from 'react-hot-toast';
import { TodoApi } from './../TodoApi/TodoApi';
import { queryClient } from '@/pages/_app';
export const useDeleteTodo = () => {
  return useMutation('deleteTodo', (_id: string) => TodoApi.deleteTodo(_id),{
    onSuccess(){
        toast.success('Задача удалена!')
        queryClient.invalidateQueries('getAllTodo')
    }
  })
}
