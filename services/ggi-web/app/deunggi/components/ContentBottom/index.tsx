'use client'

import * as S from './style'
import { useDeunggiStore } from '@/store/useDeunggiStore'
import { MODES } from 'constants/deunggi'
import TitleBox from './TitleBox'
import SearchListBox from './SearchListBox'
import BasketListBox from './BasketListBox'
import ViewListBox from './ViewListBox'

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
