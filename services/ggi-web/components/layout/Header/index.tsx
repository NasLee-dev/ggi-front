import * as S from './style'

export default function Header() {
  return (
    <S.HeaderContainer>
      <img src="/images/logo.svg" alt="지지옥션 로고" />
      <S.EndButton>종료하기</S.EndButton>
    </S.HeaderContainer>
  )
}
