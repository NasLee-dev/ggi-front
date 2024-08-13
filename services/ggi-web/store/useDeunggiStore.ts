// useAddressStore.ts
import { create } from 'zustand'

type Mode = '등기발행' | '장바구니' | '등기관리'

interface DeunggiState {
  mode: Mode
  setMode: (mode: Mode) => void
}

export const useDeunggiStore = create<DeunggiState>((set) => ({
  mode: '등기발행',
  setMode: (mode) => set({ mode }),
}))
