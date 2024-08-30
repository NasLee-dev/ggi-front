import { Dispatch, ReactNode, SetStateAction } from "react"
import { IFilterProps, ITabStatus } from "./DM"

export interface IPortalProps {
  children: ReactNode
  portalId: string
}

export interface IConditionStatusProps {
  title: string
  subTitle: string
  setBtnType: (type: string) => void
  contents?: Array<any>
  setOpenModal?: Dispatch<SetStateAction<boolean>>
  setOpenConfirmModal?: Dispatch<SetStateAction<boolean>>
  clickSave?: (type: string) => void
}

export interface IMyConditionProps {
  status: string
  title: string,
  subTitle: string,
  setOpenModal: Dispatch<SetStateAction<boolean>>
  setBtnType: (type: string) => void
  contents?: any
  setOpenConfirmModal?: Dispatch<SetStateAction<boolean>>
}

export interface IMyConditionModalProps {
  modalType: string
  openModal: boolean
  openConfirmModal: boolean
  title: string
  subTitle: string
  setOpenModal: Dispatch<SetStateAction<boolean>>
  setOpenConfirmModal: Dispatch<SetStateAction<boolean>>
  setBtnType: (type: string) => void
  confirmType: 'SAVE' | 'CANCEL' | 'DELETE' | 'OVER'
  clickLeftBtn: (type: string) => void
  clickRightBtn: (type: string) => void
  contents?: any
}

export interface IConfirmModalProps {
  type: 'SAVE' | 'CANCEL' | 'DELETE' | 'OVER'
  clickLeftBtn: (type: string) => void
  clickRightBtn: (type: string) => void
}

export interface IExtraModalProps {
  type: string
  values: Array<{
    status: boolean,
    name: string
  }>
  setValues: Dispatch<SetStateAction<Array<{
    status: boolean,
    name: string
  }>>>
  setOpenModal: Dispatch<SetStateAction<boolean>>
  clickSave: () => void
  extra?: number
}
