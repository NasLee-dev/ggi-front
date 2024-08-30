import * as B from "../../styles/Boxes";
import * as T from "../../styles/Typography";
import { ModalBtn } from "../../styles/Button";
import { theme } from "../../styles/theme";
import Image from "next/image";
import { IConditionStatusProps } from "@/models/dm/Modal";
import * as S from "./style";

export default function SearchMyCondition ({
  title,
  subTitle,
  contents,
  clickSave,
  setOpenModal,
}: IConditionStatusProps) {

  const handleClickSave = () => {
    if (!clickSave) return
    clickSave('save')
  }

  const handleClickDelete = () => {
    if (!setOpenModal) return
    setOpenModal(false)
    alert('해당 검색기록이 삭제되었습니다.')
  }

  return (
    <S.ModalBox>
      <T.TextSuitBold20px 
        style={{ 
          marginBottom: '10px' 
        }}
      >
        {title}
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
              <B.FlexCenter>
                <T.InfoGothicBoldText>
                  최근검색 yyyy.mm.dd
                </T.InfoGothicBoldText>
              </B.FlexCenter>
              <B.FlexNowrap>
                <ModalBtn 
                  styles={theme.styles.modal.condition.searchSave}
                  onClick={handleClickSave}
                >
                  <T.TextSuitBold14px color={theme.palette.grayMain}>
                    조건저장
                  </T.TextSuitBold14px>
                </ModalBtn>
                <S.DeleteIconButton
                  onClick={handleClickDelete}
                >
                  <Image src="/dm/images/delete.png" alt="delete" width={20} height={20} />
                </S.DeleteIconButton>
              </B.FlexNowrap>
            </B.FlexSpaceBetweenAlignCenter>
          : <B.FlexCenter>
              최근 검색 결과가 없습니다.
            </B.FlexCenter>}
          {/* contents */}
        </S.ModalContentBox>
      </S.ModalScrollBox>
    </S.ModalBox>
  )
}