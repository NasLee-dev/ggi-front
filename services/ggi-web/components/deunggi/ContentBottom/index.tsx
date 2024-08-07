import TitleBox from '@/components/deunggi/ContentBottom/TitleBox'
import * as S from './style'
import SearchListBox from '@/components/deunggi/ContentBottom/SearchListBox'

export default function ContentBottom() {
  return (
    <S.ContentBottom>
      <TitleBox />
      <SearchListBox />
    </S.ContentBottom>
  )
}
