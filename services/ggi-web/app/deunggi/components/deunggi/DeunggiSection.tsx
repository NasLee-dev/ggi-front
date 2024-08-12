import ContentBottom from './ContentBottom'
import ContentTop from './ContentTop'
import * as S from './style'

export default function DeunggiSection() {
  return (
    <S.Wrap>
      <S.Container>
        <ContentTop />
        <ContentBottom />
      </S.Container>
    </S.Wrap>
  )
}
