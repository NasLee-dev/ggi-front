import ContentTop from 'app/deunggi/components/ContentTop'
import * as S from './style'
import ContentBottom from 'app/deunggi/components/ContentBottom'
import ModeSetter from 'app/deunggi/components/ModeSetter'

interface DeunggiSectionProps {
  mode: string | null
}

export default function DeunggiSection({ mode }: DeunggiSectionProps) {
  return (
    <S.Wrap>
      <S.Container>
        <ModeSetter mode={mode} />
        <ContentTop />
        <ContentBottom />
      </S.Container>
    </S.Wrap>
  )
}
