import React, { useState } from 'react'
import s from './Todo.module.scss'
import { Stack, Checkbox, Button } from '@chakra-ui/react'
import { useGetAllTodo } from './hook/useGetAllTodo'
import { Spinner } from '@chakra-ui/react'
import Image from 'next/image'
import trash from '@/public/svg/trash.svg'
import { useDeleteTodo } from './hook/useDeleteTodo'
import { Input } from '@chakra-ui/react'
import { useAddTodo } from './hook/useAddTodo'
import { useUpdateTodo } from './hook/useUpdateTodo'

const Todo = () => {
  const { data, isError, isLoading } = useGetAllTodo()
  const { mutate: deleteTodo } = useDeleteTodo()
  const { mutate: addTodo } = useAddTodo()
  const { mutate: updateTodo } = useUpdateTodo()
  const [title, setTitle] = useState('')

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTodo({ title })
    setTitle('')
  }

  if (isLoading)
    return (
      <div className={s.cont}>
        <Spinner />
      </div>
    )
  if (isError) return <></>
  return (
    <div className={s.cont}>
      <Stack spacing={5} height={'fit-content'} className='items-center'>
        {data?.data.map((el) => (
          <div key={el._id} className={s.itemTodo}>
            <Checkbox
              isChecked={el.done}
              onChange={() => updateTodo({ ...el, done: !el.done })}
            >
              {el.title}
            </Checkbox>
            <Image
              alt='delete'
              src={trash}
              className={s.itemTodo__img}
              onClick={() => deleteTodo(el._id)}
            />
          </div>
        ))}
        <form onSubmit={(e) => submit(e)} className={s.form}>
          <Input
            placeholder='add new todo'
            isRequired={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button colorScheme='blue' type='submit' className='w-full'>
            add
          </Button>
        </form>
      </Stack>
    </div>
  )
}

export default Todo
