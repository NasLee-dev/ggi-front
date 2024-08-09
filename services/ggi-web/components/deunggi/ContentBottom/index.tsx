'use client'

import TitleBox from '@/components/deunggi/ContentBottom/TitleBox'
import * as S from './style'
import SearchListBox from '@/components/deunggi/ContentBottom/SearchListBox'
import BasketListBox from '@/components/deunggi/ContentBottom/BasketListBox'
import { useDeunggiStore } from '@/store/useDeunggiStore'
import ViewListBox from '@/components/deunggi/ContentBottom/ViewListBox'
import { MODES } from 'constants/deunggi'

export default function ContentBottom() {
  const { mode } = useDeunggiStore()

  return (
    <S.ContentBottom>
      <TitleBox />
      {mode === MODES.REGISTRATION && <SearchListBox />}
      {mode === MODES.BASKET && <BasketListBox />}
      {mode === MODES.MANAGEMENT && <ViewListBox />}
    </S.ContentBottom>
  )
}
