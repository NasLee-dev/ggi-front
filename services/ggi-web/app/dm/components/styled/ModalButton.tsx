import { ModalBtn } from "../styles/Button";
import { theme } from "../styles/theme";
import { InfoGothicBoldMb15 } from "../styles/Typography";

interface IModalBtnProps {
  // type: 'save' | 'cancel' | 'delete' | 'over'
  leftBtnTitle: string
  rightBtnTitle: string
  clickLeftBtn: () => void
  clickRightBtn: () => void
}
export default function ModalButton ({
  // type,
  leftBtnTitle,
  rightBtnTitle,
  clickLeftBtn,
  clickRightBtn
}: IModalBtnProps) {
  
  return (
    <>
      <ModalBtn styles={theme.styles.modal.condition.canceled} onClick={clickLeftBtn}>
        <InfoGothicBoldMb15>
          {leftBtnTitle}
        </InfoGothicBoldMb15>
      </ModalBtn>
      <ModalBtn styles={theme.styles.modal.condition.save} onClick={clickRightBtn}>
        <InfoGothicBoldMb15 color={theme.palette.white}>
          {rightBtnTitle}
        </InfoGothicBoldMb15>
      </ModalBtn>
    </>
  )
}