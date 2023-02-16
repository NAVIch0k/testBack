import React from 'react'
import s from './Todo.module.scss'
import { Stack, Checkbox, Button } from '@chakra-ui/react'
import { useGetAllTodo } from './hook/useGetAllTodo'
import { Spinner } from '@chakra-ui/react'

const Todo = () => {
  const { data, isError, isLoading } = useGetAllTodo()
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
        {
          data?.data.map(el=><Checkbox id={el._id} className={s.itemTodo} isChecked={el.done}>{el.title}</Checkbox>)
        }
        <Button colorScheme='blue'>Button</Button>
      </Stack>
    </div>
  )
}

export default Todo
