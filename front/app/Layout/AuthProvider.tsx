import { useRouter } from 'next/router'
import { useEffect } from 'react'

const AuthProvider = () => {
  const router = useRouter()
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.replace('/auth')
    }
  }, [])
}

export default AuthProvider
