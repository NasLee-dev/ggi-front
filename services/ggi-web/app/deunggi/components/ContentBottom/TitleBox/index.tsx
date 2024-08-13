'use client'

import * as S from './style'
import { useState } from 'react'

import { useDeunggiStore } from '@/store/useDeunggiStore'
import { Flex } from 'styles/sharedStyle'
import { MODES } from 'constants/deunggi'
import DefaultButton from 'app/deunggi/components/commons/button/DefaultButton'
import ModalPortal from 'app/deunggi/components/commons/modal/ModalPortal'
import BasketModal from 'app/deunggi/components/commons/modal/BasketModal'
import { useRouter } from 'next/navigation'
import theme from 'app/shared/styles/theme'

const BUTTON_TEXT = {
  delete: '삭제하기',
  checkout: '결제하기',
  basket: '장바구니',
}

export default function TitleBox() {
  const { mode } = useDeunggiStore()
  const [isOpenFirstModal, setIsOpenFirstModal] = useState(false)
  const [isOpenSecondModal, setIsOpenSecondModal] = useState(false)
  const [isOpenThirdModal, setIsOpenThirdModal] = useState(false)

  const router = useRouter()

  const handleClickBasket = () => setIsOpenFirstModal(true)
  const handleCloseFirstModal = () => setIsOpenFirstModal(false)
  const handleCloseSecondModal = () => setIsOpenSecondModal(false)
  const handleCloseThirdModal = () => setIsOpenThirdModal(false)

  const handleClickBasketConfirm = () => {
    handleCloseFirstModal()
    alert('장바구니 담기 로직')
    setIsOpenSecondModal(true)
  }

  const locationBasket = () => {
    handleCloseSecondModal()
    router.push('/deunggi?mode=장바구니')
  }

  const locationView = () => {
    handleCloseThirdModal()
    router.push('/deunggi?mode=등기관리')
  }

  const handleClickPaymentBtn = () => {
    setIsOpenThirdModal(true)
  }

  const renderButtons = () => {
    switch (mode) {
      case MODES.REGISTRATION:
        return (
          <DefaultButton
            text={BUTTON_TEXT.basket}
            onClick={handleClickBasket}
          />
        )
      case MODES.BASKET:
        return (
          <Flex gap={15}>
            <DefaultButton
              backColor="#4B5563"
              text={BUTTON_TEXT.delete}
              onClick={() => {}}
            />
            <DefaultButton
              text={BUTTON_TEXT.checkout}
              onClick={handleClickPaymentBtn}
            />
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
      <ModalPortal isOpen={isOpenFirstModal} onClose={handleCloseFirstModal}>
        <BasketModal
          text={
            <div>
              선택한 등기 <span style={{ color: theme.colors.primary }}>2</span>
              건을
              <br />
              장바구니에 넣으시겠습니까?
            </div>
          }
          onClick={handleClickBasketConfirm}
          onClose={handleCloseFirstModal}
          type="basket"
        />
      </ModalPortal>
      <ModalPortal isOpen={isOpenSecondModal} onClose={handleCloseSecondModal}>
        <BasketModal
          text={
            <div>
              장바구니에 저장이 완료되었습니다. <br />
              장바구니로 이동하겠습니까?
            </div>
          }
          onClick={locationBasket}
          onClose={handleCloseSecondModal}
          type="complete"
        />
      </ModalPortal>
      <ModalPortal isOpen={isOpenThirdModal} onClose={handleCloseThirdModal}>
        <BasketModal
          text={
            <div>
              <div style={{ marginBottom: '30px' }}>
                고객님의 사이버머니는{' '}
                <span style={{ color: theme.colors.primary }}>16,200</span>원
                입니다.
                <br />
                사이버머니{' '}
                <span style={{ color: theme.colors.primary }}>2,000</span>
                원(부가세 포함) 으로 <br />
                바로등기 <span style={{ color: theme.colors.primary }}>2</span>
                건을 열람 하시겠습니까?
              </div>
              <div>
                <S.ModalSpan>건수</S.ModalSpan>에 따라 3분~10분가량 시간이
                소요됩니다. <br /> <S.ModalSpan>과다등기</S.ModalSpan> 등 특정
                사유로 인터넷 등기 발급이
                <br /> 불가 할 경우 사이버머니로 환급 됩니다.
              </div>
            </div>
          }
          onClick={locationView}
          onClose={handleCloseThirdModal}
          type="view"
        />
      </ModalPortal>
    </S.TitleContainer>
  )
}
