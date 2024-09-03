import { ModalBtnGrid } from "../../styles/Boxes";
import { TextGothic15px, TextSuitBold20px } from "../../styles/Typography";
import { theme } from "../../styles/theme";
import ModalButton from "../../styled/ModalButton";
import ModalInput from "../../styled/ModalInput";
import { IConditionStatusProps } from "@/models/dm/Modal";
import * as S from "./style";

export default function SaveMyCondition ({
  title,
  subTitle,
  contents,
  setBtnType,
  setOpenModal,
  setOpenConfirmModal
}: IConditionStatusProps) {

  const handleChangeInput = (value: string) => {

  }
  
  const handleClickCancel = (type: string) => {
    if (!setOpenModal) return
    setOpenModal(false)
    if (!setOpenConfirmModal) return
    setOpenConfirmModal(true)
    setBtnType(type)
  }

  const handleClickSave = (type: string) => {
    if (!setOpenModal) return
    setOpenModal(false)

    setBtnType(type)
    if (!setOpenConfirmModal) return
    setOpenConfirmModal(true)
    
    // 저장하기!!
    // in case 초과 모달
  }

  return (
    <>
    <S.ModalBox>
      <TextSuitBold20px 
        style={{ 
          marginBottom: '10px' 
        }}
      >
        {`${title} (n/10)`}
      </TextSuitBold20px>
      <TextGothic15px>
        {subTitle}
      </TextGothic15px>
      <S.ModalContentBox>
        <ModalInput 
          width="411px"
          value={'새로운 조건1'} 
          changeInput={handleChangeInput}          
        />
      </S.ModalContentBox>
      <ModalBtnGrid 
        styles={theme.styles.modal.condition.btnGrid}
      >
        <ModalButton 
          // type="save"
          leftBtnTitle={"취소"} 
          rightBtnTitle={"저장하기"} 
          clickLeftBtn={() => handleClickCancel('CANCEL')} 
          clickRightBtn={() => handleClickSave('SAVE')}
        />
      </ModalBtnGrid>
    </S.ModalBox>
    </>
  )
}