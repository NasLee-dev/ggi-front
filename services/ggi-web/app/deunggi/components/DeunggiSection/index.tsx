import ContentTop from 'app/deunggi/components/ContentTop'
import * as S from './style'
import ContentBottom from 'app/deunggi/components/ContentBottom'
import ModeSetter from 'app/deunggi/components/ModeSetter'

export default function DeunggiSection() {
  return (
    <S.Wrap>
      <S.Container>
        <ModeSetter />
        <ContentTop />
        <ContentBottom />
      </S.Container>
    </S.Wrap>
  )
}
