import { Dispatch, SetStateAction } from "react";
import * as B from "../../styles/Boxes";
import { IconBtn } from "../../styles/Button";
import { theme } from "../../styles/theme";
import Image from "next/image";
import * as T from "../../styles/Typography";
import * as C from "constants/dm/dm";
import * as S from "./style";



interface Props {
  setOpenModal: Dispatch<SetStateAction<boolean>>
}
export default function HelpModal ({
  setOpenModal
}: Props) {

  return (
    <S.ModalContainer>
      <S.IconButtonBox>
        <IconBtn onClick={() => setOpenModal(false)}>
          <Image src="/dm/images/close.png" width={16} height={16} alt={"close"}/>
        </IconBtn>
      </S.IconButtonBox>
      <S.ContentBox>
        <T.TextSuitBold20px style={{ marginBottom: '10px' }}>수신인이란?</T.TextSuitBold20px>
        <T.InfoSuitText style={{ marginBottom: '10px' }}>
          주소를 조회할 이해관계인을 선택할 수 있습니다.
        </T.InfoSuitText>
        {Object.keys(C.HELPCONTENTS).map((key, idx) => (
          <li 
            key={key} 
            style={{ 
              listStyle: 'inside',
              marginBottom: Object.keys(C.HELPCONTENTS).length-1 === idx ? '10px' : 0 
            }}
          >
            <T.InfoSuitBoldText>
              {key}
            </T.InfoSuitBoldText>
            <T.InfoSuitText>
              &nbsp;:&nbsp;{C.HELPCONTENTS[key].SUB1}
            </T.InfoSuitText>
            <T.InfoSuitText color={theme.palette.blueMain}>
              &nbsp;{C.HELPCONTENTS[key].SUB2}
            </T.InfoSuitText>
          </li>
        ))}
        <T.TextSuit14px color={theme.palette.grayMain}>
          ＊소재지, 소유자, 채무자 간 정보가 동일할 경우 대표적인 1개 정보만 조회됩니다.
        </T.TextSuit14px>
        <T.TextSuit14px color={theme.palette.grayMain} style={{ marginBottom: '10px' }}>
          &nbsp;&nbsp;&nbsp;{`(소재지 > 소유자 > 채무자 순)`}  
        </T.TextSuit14px>
        <T.TextSuit14px color={theme.palette.grayMain}>
          ＊주소 정보가 없거나 정확하지 않은 경우 조회되지 않습니다.
        </T.TextSuit14px>
      </S.ContentBox>
    </S.ModalContainer>
  )
}