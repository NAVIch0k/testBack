import React from 'react'
import s from './Todo.module.scss'
import { Stack, Checkbox, Button } from '@chakra-ui/react'
import { useGetAllTodo } from './hook/useGetAllTodo'
import { Spinner } from '@chakra-ui/react'
import Image from 'next/image'
import trash from '@/public/svg/trash.svg'
import { useDeleteTodo } from './hook/useDeleteTodo'

const Todo = () => {
  const { data, isError, isLoading } = useGetAllTodo()
  const { mutate } = useDeleteTodo()
  if (isLoading)
    return (
      <div className={s.cont}>
        <Spinner />
      </div>
    )
  if (isError) return <></>
  return (
    <div className={s.cont}>
      <Stack spacing={5} height={'fit-content'}>
        {data?.data.map((el) => (
          <div id={el._id} className={s.itemTodo}>
            <Checkbox isChecked={el.done}>{el.title}</Checkbox>
            <Image
              alt='delete'
              src={trash}
              className={s.itemTodo__img}
              onClick={() => mutate(el._id)}
            />
          </div>
        ))}
        <Button colorScheme='blue'>Button</Button>
      </Stack>
    </div>
  )
}

export default Todo
