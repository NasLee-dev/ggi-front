import { FlexBetween } from 'styles/sharedStyle'
import * as S from './style'
import StrokeButton from '@/components/deunggi/ContentTop/DeunggiInfo/StrokeButton'
import DefaultButton from '@/components/commons/buttons/DefaultButton'
import { ReactNode } from 'react'
import Image from 'next/image'

interface BasketModalProps {
  text: ReactNode
  onClick: () => void
  onClose: () => void
  type: 'basket' | 'complete' | 'view'
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
        <Image
          width={16}
          height={16}
          src="/images/close-btn.svg"
          alt="닫기 버튼"
        />
      </S.CloseButton>
      {type === 'view' ? (
        <S.BasketIcon
          width={48}
          height={48}
          src="/images/won-icon.png"
          alt="금액 아이콘"
        />
      ) : (
        <S.BasketIcon
          width={48}
          height={48}
          src="/images/basket-icon.png"
          alt="카트 아이콘"
        />
      )}

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
          text={
            type === 'basket'
              ? '확인'
              : type === 'complete'
                ? '이동'
                : type === 'view'
                  ? '바로 등기 열람'
                  : ''
          }
          onClick={onClick}
        />
      </FlexBetween>
    </S.BasketModalContainer>
  )
}
