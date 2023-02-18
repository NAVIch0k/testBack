import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

interface userState {
  userName: string
  role: string
  setUser: (userName: { userName: string; role: string }) => void
}

export const useUserStore = create<userState>()(
  devtools(
    persist(
      (set) => ({
        userName: '',
        role: '',
        setUser: (data: { userName: string; role: string }) =>
          set({ userName: data.userName, role: data.role })
      }),
      { name: 'userStore' }
    )
  )
)
