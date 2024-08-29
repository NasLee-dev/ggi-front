import { theme } from "../../styles/theme";
import * as T from "../../styles/Typography";
import * as S from "./style";
import MyConditionModal from "../../modal/MyConditionModal";
import useMyConditionModal from "@/hooks/dm/useMyConditionModal";
import * as C from "constants/dm/dm";
import { useFilterStore } from "@/store/dm/useFilterStore";

export default function ButtonBox() {
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
  const { filters, page, size, sort } = useFilterStore()

  const handleClickSearch = () => {
    console.log(filters)
  }

  return (
    <>
      <S.BtnContainer>
        <S.SearchBtn 
          color={theme.palette.graySecondary}
        >
          <T.TextGothicBold18px
            color={theme.palette.grayMain}
          >
            초기화
          </T.TextGothicBold18px>
        </S.SearchBtn>
        <S.SearchBtn 
          color={theme.palette.graySecondary} 
          onClick={() => setOpenModal(!openModal)}
        >
          <T.TextGothicBold18px
            color={theme.palette.grayMain}
          >
            ★ 조건저장
          </T.TextGothicBold18px>
        </S.SearchBtn>
        <S.SearchBtn
          color={theme.palette.blueMain}
          onClick={handleClickSearch}
        >
          <T.TextGothicBold18px
            color={theme.palette.white}
          >
            검색하기
          </T.TextGothicBold18px>
        </S.SearchBtn>
      </S.BtnContainer>

      <MyConditionModal 
        modalType='save'
        title={C.SAVETITLE} 
        subTitle={C.SAVESUBTITLE} 
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