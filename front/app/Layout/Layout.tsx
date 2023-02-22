import { useRouter } from 'next/router'
import React, { PropsWithChildren, useEffect } from 'react'
import GlobalHeader from '../components/GlobalHeader'
import { AuthApi } from '../screens/Auth/AuthApi/AuthApi'
import s from './Layout.module.scss'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const refresh = async () => {
    try {
      const { data } = await AuthApi.refresh()
      localStorage.setItem('token', data.token)
      localStorage.setItem('refresh', data.refresh)
    } catch (e) {
      router.replace('/auth')
      console.log(e)
    }
  }
  useEffect(() => {
    refresh()
  }, [])

  return (
    <div className={s.cont}>
      <GlobalHeader />
      {children}
    </div>
  )
}

export default Layout
