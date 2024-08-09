// useAddressStore.ts

import create from 'zustand'

interface DeunggiState {
  mode: '등기발행' | '장바구니' | '등기관리'
  setMode: (mode: '등기발행' | '장바구니' | '등기관리') => void
}

export const useDeunggiStore = create<DeunggiState>((set) => ({
  mode: '등기발행',
  setMode: (mode) => set({ mode }),
}))
