'use client'

import DefaultButton from '@/components/commons/buttons/DefaultButton'
import * as S from './style'

export default function TitleBox() {
  return (
    <S.TitleContainer>
      <S.SearchResultTitle>검색결과</S.SearchResultTitle>
      <DefaultButton text="장바구니" onClick={() => {}} />
    </S.TitleContainer>
  )
}
