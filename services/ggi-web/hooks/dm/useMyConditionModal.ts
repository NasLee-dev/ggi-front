import { useState } from "react"

const useMyConditionModal = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false)
  const [confirmBtnType, setConfirmBtnType] = useState<string>('')

  const handleConfirmBtnType = (type: string) => {
    setConfirmBtnType(type)
  }

  const handleClickBefor = () => {
    setOpenConfirmModal(false)
    if (!setOpenModal) return
    setOpenModal(true)
  }

  const handleClickConfirm = () => {
    setOpenConfirmModal(false)
  }

  return {
    openModal,
    setOpenModal,
    openConfirmModal,
    setOpenConfirmModal,
    confirmBtnType,
    handleConfirmBtnType,
    handleClickBefor,
    handleClickConfirm
  }
}

export default useMyConditionModal
