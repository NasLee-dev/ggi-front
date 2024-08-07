import TitleBox from '@/components/deunggi/ContentBottom/TitleBox'
import * as S from './style'
import SearchListBox from '@/components/deunggi/ContentBottom/SearhListBox'

export default function ContentBottom() {
  return (
    <S.ContentBottom>
      <TitleBox />
      <SearchListBox />
    </S.ContentBottom>
  )
}
