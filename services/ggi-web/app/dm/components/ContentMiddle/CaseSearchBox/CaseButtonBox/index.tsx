import * as I from "@/models/dm/DM";
import * as B from "../../../styles/Boxes";
import { theme } from "../../../styles/theme";
import * as T from "../../../styles/Typography";
import * as S from "./style";
import { useState } from "react";
import useMyConditionModal from "@/hooks/dm/useMyConditionModal";
import MyConditionModal from "../../../modal/MyConditionModal";
import * as C from "constants/dm/dm";
import { useTabStore } from "@/store/dm/useTabStore";

export default function CaseButtonBox({ open, setOpen }: I.ISearchProps) {
  const { tabs } = useTabStore()
  const [type, setType] = useState<string>('')
  const {
    openModal,
    setOpenModal,
    openConfirmModal,
    setOpenConfirmModal,
    confirmBtnType,
    handleConfirmBtnType,
    handleClickBefor,
    handleClickConfirm
  } = useMyConditionModal()

  return (
    <>
    <B.FlexSpaceBetweenMb mb={20}>
      <B.FlexCenter>
        <T.TextGothicBold18px>
          검색조건
        </T.TextGothicBold18px>
      </B.FlexCenter>

      <div>
        <S.CaseBtn 
          onClick={() => {
            setType('search')
            setOpenModal(!openModal)
          }}
        >
          <T.InfoGothicBoldText 
            color={theme.palette.grayMain}
          >
            최근검색
          </T.InfoGothicBoldText>
        </S.CaseBtn>
        <S.CaseBtn 
          onClick={() => {
            setType('view')
            setOpenModal(!openModal)
          }}
        >
          <T.InfoGothicBoldText 
            color={type === 'view' 
              ? theme.palette.blueMain 
              : theme.palette.grayMain}
          >
            ★나의조건
          </T.InfoGothicBoldText>
        </S.CaseBtn>

        {tabs?.ongoing 
          ? <S.CaseBtn 
              onClick={() => setOpen(!open)}
            >
              <T.InfoGothicBoldText 
                color={theme.palette.blueMain}
              >
                {open ? '-' : '+'} 상세조건
              </T.InfoGothicBoldText>
            </S.CaseBtn>
          : null}
        </div>
    </B.FlexSpaceBetweenMb>
    
    <MyConditionModal 
      modalType={type}
      title={type === 'view' ? '나의조건' : '최근 나의 검색'} 
      subTitle={type === 'view' ? C.VIEWSUBTITLE : ''} 
      openModal={openModal}
      setOpenModal={setOpenModal}
      openConfirmModal={openConfirmModal}
      setOpenConfirmModal={setOpenConfirmModal}
      setBtnType={handleConfirmBtnType}
      confirmType={confirmBtnType} 
      clickLeftBtn={handleClickBefor} 
      clickRightBtn={handleClickConfirm}
    />
    </>
  )
}