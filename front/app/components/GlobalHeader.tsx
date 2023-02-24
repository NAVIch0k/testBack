import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import logout from '../../public/svg/logout.svg'
import { AuthApi } from '../screens/Auth/AuthApi/AuthApi'
import { useUserStore } from '../screens/Auth/store/useUserStore'
import s from './GlobalHeader.module.scss'
const GlobalHeader = () => {
  const route = useRouter()
  const clearUser = useUserStore((state) => state.setUser)

  const logoutFun = async () => {
    try {
      await AuthApi.logout()
      clearUser({role:'',userName:''})
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
