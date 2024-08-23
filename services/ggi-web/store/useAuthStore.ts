import { create } from 'zustand'

interface AddressState {
  token: string
  setToken: (token: string) => void
}

export const useAuthStore = create<AddressState>((set) => ({
  token: '',
  setToken: (token) => set({ token }),
}))
