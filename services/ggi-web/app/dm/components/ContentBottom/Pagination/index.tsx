import * as B from "../../styles/Boxes";
import { theme } from "../../styles/theme";
import * as T from "../../styles/Typography";
import * as S from "./style";
import Image from 'next/image'

export default function Pagination() {
  return (
    <B.FlexCenter>
      <S.PaginationBox>
        <S.ArrowButton>
          <T.InfoSuitBoldText color={theme.palette.grayMain}>
            <B.FlexCenter>
              <Image 
                src="/dm/images/pageLeft.png" 
                alt="pageLeft" 
                width={9} 
                height={9} 
                style={{ marginRight: '5px' }}
              />
              이전 페이지
            </B.FlexCenter>
          </T.InfoSuitBoldText>
        </S.ArrowButton>
        <B.FlexNowrap style={{ margin: '0 10px'}}>
          <S.PageButton clicked={true}>
            <T.InfoSuitBoldText color={theme.palette.grayMain}>
              1
            </T.InfoSuitBoldText>
          </S.PageButton>
          <S.PageButton clicked={false}>
          <T.InfoSuitBoldText color={theme.palette.grayMain}>
            2
          </T.InfoSuitBoldText>
          </S.PageButton>
          <S.PageButton clicked={false}>
          <T.InfoSuitBoldText color={theme.palette.grayMain}>
            3
          </T.InfoSuitBoldText>
          </S.PageButton>
          <S.PageButton clicked={false}>
          <T.InfoSuitBoldText color={theme.palette.grayMain}>
            4
          </T.InfoSuitBoldText>
          </S.PageButton>
        </B.FlexNowrap>
        <S.ArrowButton>
        <T.InfoSuitBoldText color={theme.palette.grayMain}>
          <B.FlexCenter>
            다음 페이지
            <Image 
              src="/dm/images/pageRight.png" 
              alt="pageRight" 
              width={9} 
              height={9} 
              style={{ marginLeft: '5px' }}
            />
          </B.FlexCenter>
        </T.InfoSuitBoldText>
        </S.ArrowButton>
      </S.PaginationBox>
    </B.FlexCenter>
  )
}