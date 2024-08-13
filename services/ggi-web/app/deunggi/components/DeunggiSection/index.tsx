import ContentTop from 'app/deunggi/components/ContentTop'
import * as S from './style'
import ContentBottom from 'app/deunggi/components/ContentBottom'

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
