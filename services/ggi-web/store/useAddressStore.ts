// useAddressStore.ts

import create from 'zustand'

interface AddressState {
  address: string
  setAddress: (address: string) => void
  page: number
  setPage: (page: number) => void
}

export const useAddressStore = create<AddressState>((set) => ({
  address: '',
  setAddress: (address) => set({ address }),
  page: 1,
  setPage: (page) => set({ page }),
}))
