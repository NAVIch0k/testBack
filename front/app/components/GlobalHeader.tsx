import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import logout from '../../public/svg/logout.svg'
import { AuthApi } from '../screens/Auth/AuthApi/AuthApi'
import s from './GlobalHeader.module.scss'
const GlobalHeader = () => {
  const route = useRouter()

  const logoutFun = async () => {
    try {
      await AuthApi.logout()
      localStorage.clear()
      route.replace('/auth')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={s.cont}>
      <p>Todo List</p>
      <Image
        onClick={logoutFun}
        src={logout}
        width={30}
        height={30}
        alt='logout'
        className={s.img}
      />
    </div>
  )
}

export default GlobalHeader
