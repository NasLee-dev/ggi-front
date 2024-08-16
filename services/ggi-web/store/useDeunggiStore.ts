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

interface BasketDataState {
  basketData: any[]
  setBasketData: (newData: any) => void
  isChecked: (newData: any) => boolean
  clearBasketData: () => void
}

interface ViewDataState {
  viewData: any[]
  setViewData: (newData: any) => void
  isChecked: (newData: any) => boolean
  clearViewData: () => void
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

export const useBasketDataStore = create<BasketDataState>((set, get) => ({
  basketData: [],
  setBasketData: (newData) =>
    set((state) => {
      const isExisting = state.basketData.includes(newData)
      if (isExisting) {
        return {
          basketData: state.basketData.filter((item) => item !== newData),
        }
      } else {
        return { basketData: [...state.basketData, newData] }
      }
    }),
  clearBasketData: () =>
    set(() => {
      return {
        basketData: [],
      }
    }),
  isChecked: (newData) => {
    return get().basketData.includes(newData)
  },
}))

export const useViewDataStore = create<ViewDataState>((set, get) => ({
  viewData: [],
  setViewData: (newData) =>
    set((state) => {
      const isExisting = state.viewData.includes(newData)
      if (isExisting) {
        return {
          viewData: state.viewData.filter((item) => item !== newData),
        }
      } else {
        return { viewData: [...state.viewData, newData] }
      }
    }),
  clearViewData: () =>
    set(() => {
      return {
        viewData: [],
      }
    }),
  isChecked: (newData) => {
    return get().viewData.includes(newData)
  },
}))
