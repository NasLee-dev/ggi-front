import * as B from "../../styles/Boxes";
import { IconBtn, ModalBtn } from "../../styles/Button";
import { theme } from "../../styles/theme";
import * as T from "../../styles/Typography";
import Image from "next/image";
import { useState } from "react";
import ModalInput from "../../styled/ModalInput";
import { IConditionStatusProps } from "@/models/dm/Modal";
import * as S from "./style";

export default function ViewMyCondition ({
  title,
  subTitle,
  contents,
  setBtnType,
  setOpenModal,
  setOpenConfirmModal
}: IConditionStatusProps) {
  const [edit, setEdit] = useState<boolean>(false)

  const handleChangeInput = (value: string) => {

  }

  const handleClickDelete = (type: string) => () => {
    if (!setOpenModal) return
    setOpenModal(false)
    if (!setOpenConfirmModal) return
    setOpenConfirmModal(true)
    setBtnType(type)
  }

  return (
    <S.ModalBox>
      <T.TextSuitBold20px 
        style={{ 
          marginBottom: '10px' 
        }}
      >
        {`${title} (n/10)`}
      </T.TextSuitBold20px>
      <T.TextGothic15px>
        {subTitle}
      </T.TextGothic15px>
      <S.ModalScrollBox>
        <S.ModalContentBox>
          {contents?.length 
          ? <B.FlexSpaceBetweenAlignCenter 
              style={{ 
                width: '410px' 
              }}
            >
              {edit ? (
              <>
                <ModalInput
                  width='320px'
                  value={`조건이름`} 
                  changeInput={handleChangeInput}          
                />
                <ModalBtn styles={theme.styles.modal.condition.editSave}>
                  <T.TextGothic15px color={theme.palette.white}>
                    저장하기
                  </T.TextGothic15px>
                </ModalBtn>
              </>
            ) : (
              <>
              <B.FlexNowrap>
                <T.InfoGothicBoldText>
                  조건이름
                </T.InfoGothicBoldText>
                <IconBtn onClick={() => setEdit(!edit)}>
                  <Image 
                    src='/dm/images/edit.png' 
                    alt='edit' 
                    width={20} 
                    height={20} 
                  />
                </IconBtn>
              </B.FlexNowrap>
              <IconBtn onClick={handleClickDelete('DELETE')}>
                <Image 
                  src='/dm/images/delete.png' 
                  alt='delete' 
                  width={20} 
                  height={20} 
                />
              </IconBtn>
              </>
            )}
          </B.FlexSpaceBetweenAlignCenter>
          : <B.FlexCenter>
              저장된 조건이 없습니다.
            </B.FlexCenter>}
        </S.ModalContentBox>
      </S.ModalScrollBox>
    </S.ModalBox>
  )
}