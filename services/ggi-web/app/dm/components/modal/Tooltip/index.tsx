import * as T from "../../styles/Typography";
import ModalPortal from "../ModalPortal";
import * as S from "./style";

export default function Tooltip() {
  return (
    <ModalPortal portalId="tooltip-portal">
      <S.ModalContainer>
        <T.TextGothic14px>
          재 다운로드는 차감되지 않습니다
        </T.TextGothic14px>
      </S.ModalContainer>
    </ModalPortal>
  )
}