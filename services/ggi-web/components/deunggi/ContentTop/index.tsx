import DeunggiInfo from '@/components/deunggi/ContentTop/DeunggiInfo'
import * as S from './style'
import ProfileBox from '@/components/deunggi/ContentTop/ProfileBox'
import AddressSearch from '@/components/deunggi/ContentTop/AddressSearch'

export default function ContentTop() {
  return (
    <S.ContentHead>
      <S.HeadTop>
        <DeunggiInfo />
        <ProfileBox />
      </S.HeadTop>
      <AddressSearch />
    </S.ContentHead>
  )
}
