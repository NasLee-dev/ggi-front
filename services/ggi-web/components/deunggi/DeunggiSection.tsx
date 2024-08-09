import * as S from './style'

import ContentTop from '@/components/deunggi/ContentTop'
import ContentBottom from '@/components/deunggi/ContentBottom'

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
