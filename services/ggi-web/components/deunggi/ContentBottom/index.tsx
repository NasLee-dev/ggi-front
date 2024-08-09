'use client'

import TitleBox from '@/components/deunggi/ContentBottom/TitleBox'
import * as S from './style'
import SearchListBox from '@/components/deunggi/ContentBottom/SearchListBox'
import BasketListBox from '@/components/deunggi/ContentBottom/BasketListBox'
import { useDeunggiStore } from '@/store/useDeunggiStore'
import ViewListBox from '@/components/deunggi/ContentBottom/ViewListBox'

export default function ContentBottom() {
  const { mode } = useDeunggiStore()

  return (
    <S.ContentBottom>
      <TitleBox />
      {mode === '등기발행' && <SearchListBox />}
      {mode === '장바구니' && <BasketListBox />}
      {mode === '등기관리' && <ViewListBox />}
    </S.ContentBottom>
  )
}
