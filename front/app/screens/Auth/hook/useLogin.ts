import { toast } from 'react-hot-toast'
import { authInput } from './../Auth'
import { useMutation } from 'react-query/react'
import { AuthApi } from '../AuthApi/AuthApi'
import { useUserStore } from '../store/useUserStore'
import jwt_decode from 'jwt-decode'

export const useLogin = () => {
  const setUser = useUserStore((state) => state.setUser)
  return useMutation('login', (data: authInput) => AuthApi.login(data), {
    onSuccess(data) {
      localStorage.setItem('token', data.data.token)
      const info = jwt_decode(data.data.token)
      //@ts-ignore
      setUser({ role: info.role, userName: info.name })
    },
    onError(e: any) {
      toast.error(e.message)
      if (e.response?.data?.message) {
        toast.error(e.response?.data?.message)
      }
    }
  })
}
