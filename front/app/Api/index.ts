import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/',
  withCredentials: true
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

// instance.interceptors.response.use(
//   (config) => {
//     return config
//   },
//   async (error) => {
//     const originalRequest = error.config
//     if (error.response.status == 401 && error.config && !error.config._isRetry) {
//       originalRequest._isRetry = true
//       try{
//         const res = await instance.post<{ token: string; refresh: string }>(
//           'refresh',
//           { refreshToken: localStorage.getItem('refresh') }
//         )
//         localStorage.setItem('refresh', res.data.refresh)
//         localStorage.setItem('refresh', res.data.token)
//         return instance.request(originalRequest)
//       }catch(e){
//         console.log(e);
//       }
//     }
//     throw error
//   }
// )

export default instance
