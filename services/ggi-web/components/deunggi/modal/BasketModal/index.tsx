import { FlexBetween } from 'styles/sharedStyle'
import * as S from './style'
import StrokeButton from '@/components/deunggi/ContentTop/DeunggiInfo/StrokeButton'
import DefaultButton from '@/components/commons/buttons/DefaultButton'
import { ReactNode } from 'react'

interface BasketModalProps {
  text: ReactNode
  onClick: () => void
  onClose: () => void
  type: 'basket' | 'complete'
}

export default function BasketModal({
  text,
  onClick,
  onClose,
  type,
}: BasketModalProps) {
  return (
    <S.BasketModalContainer>
      <S.CloseButton onClick={onClose}>
        <img src="/images/close-btn.svg" alt="닫기 버튼" />
      </S.CloseButton>
      <S.BasketIcon src="/images/basket-icon.png" alt="카트 아이콘" />
      <S.ModalText>{text}</S.ModalText>
      <FlexBetween>
        <StrokeButton
          width="222px"
          radius="8px"
          text="아니오"
          onClick={onClose}
        />
        <DefaultButton
          width="222px"
          text={type === 'basket' ? '확인' : type === 'complete' ? '이동' : ''}
          onClick={onClick}
        />
      </FlexBetween>
    </S.BasketModalContainer>
  )
}
