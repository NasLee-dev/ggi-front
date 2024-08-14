import AddressSearch from './AddressSearch'
import DeunggiInfo from './DeunggiInfo'
import ProfileBox from './ProfileBox'
import * as S from './style'

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
