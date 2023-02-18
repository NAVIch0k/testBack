import React, { useEffect } from 'react'
import s from './Auth.module.scss'
import { Input, Button } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useLogin } from './hook/useLogin'
import { useRouter } from 'next/router'
import { useUserStore } from './store/useUserStore'

export interface authInput {
  name: string
  password: string
}

const Auth = () => {
  const router = useRouter()
  const user = useUserStore((state) => state.userName)

  useEffect(() => {
    if (user) {
      router.replace('/')
    }
  }, [user])

  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm<authInput>()

  const { mutate } = useLogin()

  const fetch = (data: authInput) => {
    mutate(data)
  }

  return (
    <div className={s.cont}>
      <form className={s.wrapper} onSubmit={handleSubmit(fetch)}>
        <h1 className={s.title}>Authorization</h1>
        <div className={s.inpWrap}>
          <Input
            placeholder='login'
            {...register('name', { required: true })}
            isInvalid={errors.name ? true : false}
            minLength={4}
            maxLength={10}
          />
          <Input
            placeholder='passwword'
            {...register('password', { required: true })}
            isInvalid={errors.password ? true : false}
            minLength={4}
            maxLength={10}
          />
        </div>
        <Button type='submit' colorScheme='green'>
          Submit
        </Button>
      </form>
    </div>
  )
}

export default Auth
