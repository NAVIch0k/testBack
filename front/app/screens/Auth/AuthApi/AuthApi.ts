import instance from '@/app/Api'

import { authInput } from './../Auth'
export const AuthApi = {
  login(data: authInput) {
    return instance.post<{token:string,refresh:string}>('login',data)
  },
  logout(){
    return instance.post('logout',{refresh:localStorage.getItem('refresh')})
  },
  refresh(){
    return instance.post<{token:string,refresh:string}>('refresh',{refresh:localStorage.getItem('refresh')})
  }
}
