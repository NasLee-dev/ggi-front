import { Dispatch, SetStateAction } from "react"

export interface ITabStatus {
  expected: boolean,
  ongoing: boolean,
  mine: boolean
}

export interface ISearchProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export interface IFilterProps {
  fromBiddingDate: string
  toBiddingDate: string
  isAddress: boolean
  sd: string
  sgg: string
  umd: string
  code1: string
  code2: string
  code3: string
  isOwner: boolean
  isDebtor: boolean
  isTenant: boolean
  isCreditor: boolean
  usageIds: number[]
  checkIds: number[]
  statusCode: string
  failCount: number
  fromAppraisalAmount: number
  toAppraisalAmount: number
  fromMinimumAmount: number
  toMinimumAmount: number
  isExceptPrevData: boolean
}

export interface ICheckValues {
  status: boolean
  name: string
}

export interface IMultipleProps {
  type: string
  values: ICheckValues[]
  extra?: number
}

export interface ITableListProps {
  headers: any
}
