'use client'

import DefaultButton from '@/components/commons/buttons/DefaultButton'
import * as S from './style'
import { useState } from 'react'
import ModalPortal from '@/components/commons/modals/ModalPortal'
import BasketModal from '@/components/deunggi/modal/BasketModal'

export default function TitleBox() {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleClickBasket = () => {
    setIsOpenModal(true)
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  return (
    <S.TitleContainer>
      <S.SearchResultTitle>검색결과</S.SearchResultTitle>
      <DefaultButton text="장바구니" onClick={handleClickBasket} />
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
