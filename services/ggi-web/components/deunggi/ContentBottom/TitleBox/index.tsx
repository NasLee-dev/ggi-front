'use client'

import DefaultButton from '@/components/commons/buttons/DefaultButton'
import * as S from './style'
import { useState } from 'react'
import ModalPortal from '@/components/commons/modals/ModalPortal'
import BasketModal from '@/components/deunggi/modal/BasketModal'
import { useDeunggiStore } from '@/store/useDeunggiStore'
import { Flex } from 'styles/sharedStyle'

const BUTTON_TEXT = {
  delete: '삭제하기',
  checkout: '결제하기',
  basket: '장바구니',
}

const MODES = {
  REGISTRATION: '등기발행',
  BASKET: '장바구니',
  MANAGEMENT: '등기관리',
}

export default function TitleBox() {
  const { mode } = useDeunggiStore()
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleClickBasket = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  const renderButtons = () => {
    switch (mode) {
      case MODES.REGISTRATION:
        return <DefaultButton text={BUTTON_TEXT.basket} onClick={handleClickBasket} />
      case MODES.BASKET:
        return (
          <Flex gap={15}>
            <DefaultButton
              backColor="#4B5563"
              text={BUTTON_TEXT.delete}
              onClick={() => {}}
            />
            <DefaultButton text={BUTTON_TEXT.checkout} onClick={() => {}} />
          </Flex>
        )
      case MODES.MANAGEMENT:
        return (
          <DefaultButton
            backColor="#4B5563"
            text={BUTTON_TEXT.delete}
            onClick={() => {}}
          />
        )
      default:
        return null
    }
  }

  return (
    <S.TitleContainer>
      <S.SearchResultTitle>
        {mode === MODES.REGISTRATION
          ? '검색결과'
          : mode === MODES.BASKET
          ? '장바구니'
          : '열람내역'}
      </S.SearchResultTitle>
      {renderButtons()}
      <ModalPortal isOpen={isOpenModal} onClose={handleCloseModal}>
        <BasketModal
          text={
            <div>
              선택한 등기 <span style={{ color: '#2563EB' }}>2</span>건을
              <br />
              장바구니에 넣으시겠습니까?
            </div>
          }
          onClick={() => {}}
          onClose={handleCloseModal}
          type="basket"
        />
      </ModalPortal>
    </S.TitleContainer>
  )
}
