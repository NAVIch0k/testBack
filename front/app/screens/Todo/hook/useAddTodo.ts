import { toast } from 'react-hot-toast'
import { TodoApi } from './../../../Api/TodoApi/TodoApi'
import { useMutation } from 'react-query'
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
