import { Dispatch, SetStateAction } from "react"

export interface ITabStatus {
  expected: boolean,
  ongoing: boolean,
  mine: boolean
}

export interface IDmProps {
  tabs: ITabStatus,
  setTabs?: Dispatch<SetStateAction<{
    expected: boolean,
    ongoing: boolean,
    mine: boolean
  }>>,
  openDetail?: boolean
}

export interface ILocalFilter {
  court: boolean,
  local: boolean
}