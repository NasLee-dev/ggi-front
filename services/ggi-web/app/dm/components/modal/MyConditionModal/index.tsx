import ConfirmModal from "../ConfirmModal"
import ModalPortal from "../ModalPortal"
import MyCondition from "./MyCondition"
import { IMyConditionModalProps } from "@/models/dm/Modal"

export default function MyConditionModal ({
  modalType,
  openModal,
  openConfirmModal,
  title,
  subTitle,
  setOpenModal,
  setOpenConfirmModal,
  setBtnType,
  confirmType,
  clickLeftBtn,
  clickRightBtn,
  contents
}: IMyConditionModalProps) {
  
  return (
    <>
    {openModal ? (
      <ModalPortal portalId="root-portal">
        <MyCondition
          status={modalType}
          title={title} 
          subTitle={subTitle} 
          setOpenModal={setOpenModal}
          setOpenConfirmModal={setOpenConfirmModal}
          setBtnType={setBtnType}
          contents={contents}
        />
      </ModalPortal> 
    ): null}
    {openConfirmModal ? (
      <ModalPortal portalId="root-portal">
        <ConfirmModal
          type={confirmType} 
          clickLeftBtn={clickLeftBtn} 
          clickRightBtn={clickRightBtn}
        />
      </ModalPortal>
    ) : null}
    </>
  )
}