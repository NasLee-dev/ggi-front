import * as S from './style'
import Image from 'next/image'

export default function Header() {
  const handleClickExit = () => {
    const confirmed = confirm('종료하시겠습니까?')
    if (confirmed) {
      window.close()
    }
  }

  return (
    <S.HeaderContainer>
      <Image
        width={132}
        height={44}
        src="/images/logo.svg"
        alt="지지옥션 로고"
      />
      <S.EndButton onClick={handleClickExit}>종료하기</S.EndButton>
    </S.HeaderContainer>
  )
}
