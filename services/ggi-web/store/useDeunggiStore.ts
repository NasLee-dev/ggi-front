// useDeunggiStore.ts
import { create } from 'zustand'

type Mode = '등기발행' | '장바구니' | '등기관리'

interface DeunggiState {
  mode: Mode
  setMode: (mode: Mode) => void
}

interface DeunggiDataState {
  deunggiData: any[]
  setDeunggiData: (newData: any) => void
  isChecked: (newData: any) => boolean
  clearDeunggiData: () => void
}

export const useDeunggiStore = create<DeunggiState>((set) => ({
  mode: '등기발행',
  setMode: (mode) => set({ mode }),
}))

export const useDeunggiDataStore = create<DeunggiDataState>((set, get) => ({
  deunggiData: [],
  setDeunggiData: (newData) =>
    set((state) => {
      const isExisting = state.deunggiData.includes(newData)
      if (isExisting) {
        return {
          deunggiData: state.deunggiData.filter((item) => item !== newData),
        }
      } else {
        return { deunggiData: [...state.deunggiData, newData] }
      }
    }),
  clearDeunggiData: () =>
    set(() => {
      return {
        deunggiData: [],
      }
    }),
  isChecked: (newData) => {
    return get().deunggiData.includes(newData)
  },
}))
