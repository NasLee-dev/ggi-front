'use client'

import { FlexColumn } from 'styles/sharedStyle'
import * as S from './style'
import Link from 'next/link'
import StrokeButton from '@/components/deunggi/ContentTop/DeunggiInfo/StrokeButton'

export default function DeunggiInfo() {
  return (
    <FlexColumn gap={20}>
      <S.Title>바로등기</S.Title>
      <S.Description>
        경매 부동산 인근의 등기, 평소 관심있는 부동산의 등기를 지지옥션에서 바로
        발급받아 보세요. 간편한 주소 검색을 통해 손쉽에 발급 가능합니다.
        도로명주소가 병기되지 않은 부동산은 도로명주소로 검색되지 않을 수
        있으니, 검색이 안되는 경우 지번검색으로 검색하시기 바랍니다.
        <Link href={'#'}>이용방법 알아보기</Link>
      </S.Description>
      <S.ButtonContainer>
        <StrokeButton text="등기발행" active onClick={() => {}} />
        <StrokeButton text="장바구니" onClick={() => {}} />
        <StrokeButton text="등기관리" onClick={() => {}} />
      </S.ButtonContainer>
    </FlexColumn>
  )
}
