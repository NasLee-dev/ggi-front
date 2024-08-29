import { useState } from "react";
import { IconBtn } from "../../../styles/Button";
import Image from "next/image";
import ViewMyCondition from "../ViewMyCondition";
import SaveMyCondition from "../SaveMyCondition";
import SearchMyCondition from "../SearchMyCondition";
import DetailMyCondition from "../DetailMyCondition";
import * as I from "@/models/dm/Modal";
import * as S from "./style";

export default function MyCondition({
  status,
  title,
  subTitle,
  setOpenModal,
  contents,
  setOpenConfirmModal,
  setBtnType
}: I.IMyConditionProps) {
  const [type, setType] = useState<string>(status)

  const handleClickSave = (type: string) => {
    setType(type)
  }

  return (
    <S.ModalContainer>
      <S.IconButtonBox>
        <IconBtn 
          onClick={() => setOpenModal(false)}
        >
          <Image 
            src='/dm/images/close.png'
            width={16} 
            height={16} 
            alt='close'
          />
        </IconBtn>
      </S.IconButtonBox>
      {type === 'view' ? (
        <ViewMyCondition 
          title={title} 
          subTitle={subTitle}
          setOpenModal={setOpenModal} 
          setOpenConfirmModal={setOpenConfirmModal}
          setBtnType={setBtnType}
        />
      ) : (type === 'save' ? (
        <SaveMyCondition 
          title={title} 
          subTitle={subTitle} 
          setOpenModal={setOpenModal} 
          setOpenConfirmModal={setOpenConfirmModal}
          setBtnType={setBtnType}
        />
      ) : (type === 'search' ? (
        <SearchMyCondition 
          title={title} 
          subTitle={subTitle} 
          setOpenModal={setOpenModal} 
          setOpenConfirmModal={setOpenConfirmModal}
          setBtnType={setBtnType}
          clickSave={handleClickSave}
        />
      ) : <DetailMyCondition 
            title={title} 
            subTitle={subTitle} 
            setOpenModal={setOpenModal} 
            setOpenConfirmModal={setOpenConfirmModal}
            setBtnType={setBtnType}
            contents={contents}
          />))}
    </S.ModalContainer>
  )
}