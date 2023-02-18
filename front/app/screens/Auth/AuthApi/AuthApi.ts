import instance from '@/app/Api'

import { authInput } from './../Auth'
export const AuthApi = {
  login(data: authInput) {
    return instance.post<{token:string}>('login',data)
  }
}
