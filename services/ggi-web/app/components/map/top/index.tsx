import styled from '@emotion/styled'

export default function TopBar({
  children,
  openCursor,
}: {
  children: React.ReactNode
  openCursor: boolean
}) {
  return <Container openCursor={openCursor}>{children}</Container>
}

const Container = styled.div<{ openCursor: boolean }>`
  position: fixed;
  min-width: 200px;
  max-width: 450px;
  top: 30px;
  left: calc(50% + 100px);
  transform: translateX(-50%);
  z-index: 9;
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: #fff;
  border: ${({ openCursor }) =>
    openCursor ? '1px solid #332EFC' : '1px solid #000001'};
`
