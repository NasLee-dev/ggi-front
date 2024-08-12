import * as S from './style'
import Image from 'next/image'

export default function Header() {
  return (
    <S.HeaderContainer>
      <Image
        width={132}
        height={44}
        src="/images/logo.svg"
        alt="지지옥션 로고"
      />
      <S.EndButton>종료하기</S.EndButton>
    </S.HeaderContainer>
  )
}
