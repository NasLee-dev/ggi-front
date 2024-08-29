import * as I from '@/models/dm/DM'
import { create } from 'zustand'

interface IFilterState {
  filters: I.IFilterProps
  setFilters: (filters: I.IFilterProps) => void
  clearFilters?: () => void
  page?: number
  setPage?: (pageNum: number) => void
  size?: number
  setSize?: (pageSize: number) => void
  sort?: string[]
  setSort?: (sorts: string[]) => void
}

const InitialFilters = {
  fromBiddingDate: '',
  toBiddingDate: '',
  isAddress: true,
  sd: '서울',
  sgg: '강남구',
  umd: '개포동',
  code1: '01',
  code2: '01',
  code3: '01',
  isOwner: false,
  isDebtor: false,
  isTenant: true,
  isCreditor: false,
  usageIds: [1],
  checkIds: [],
  statusCode: '01',
  failCount: 0,
  fromAppraisalAmount: 0,
  toAppraisalAmount: 0,
  fromMinimumAmount: 0,
  toMinimumAmount: 0,
  isExceptPrevData: false
}

export const useFilterStore = create<IFilterState>((set) => ({
  filters: InitialFilters,
  setFilters: (newFilters) => set(() => {
    return {
      filters: newFilters
    }
  }),
  clearFilters: () => set(() => {
    return {
      filters: InitialFilters
    }
  }),
  page: 0,
  setPage: (pageNum) => set(() => {
    return {
      page: pageNum
    }
  }),
  size: 20,
  setSize: (pageSize) => set(() => {
    return {
      size: pageSize
    }
  }),
  sort: ["caseNo"],
  setSort: (sorts) => set(() => {
    return {
      sort: sorts
    }
  })
}))