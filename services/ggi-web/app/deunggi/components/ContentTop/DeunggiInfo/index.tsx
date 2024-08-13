'use client'

import React, { MouseEvent, useMemo } from 'react'
import { FlexColumn } from 'styles/sharedStyle'
import * as S from './style'
import Link from 'next/link'

import { useDeunggiStore } from '@/store/useDeunggiStore'
import { MODES } from 'constants/deunggi'
import StrokeButton from '../StrokeButton'

function DeunggiInfo() {
  const { mode, setMode } = useDeunggiStore()

  const handleChangeMode = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.target as HTMLButtonElement
    if (name === '등기발행' || name === '장바구니' || name === '등기관리') {
      setMode(name)
    }
  }
  const descriptionContent = useMemo(() => {
    switch (mode) {
      case MODES.REGISTRATION:
        return (
          <span>
            경매 부동산 인근의 등기, 평소 관심있는 부동산 등기를 지지옥션에서
            바로 발급받아 보세요. 간편한 주소 검색을 통해 손쉽게 발급
            가능합니다. 도로명주소가 병기되지 않은 부동산은 도로명주소로
            검색되지 않을 수 있으니, 검색이 안되는 경우 지번검색으로 검색하시기
            바랍니다.
          </span>
        )
      case MODES.BASKET:
        return (
          <span>
            모든 등기는 말소사항포함, 공동/전세목록, 매매목록 포함으로
            발행됩니다. 선택이 필요하신 경우 대법원 인터넷 등기소를 이용해
            주세요. 인터넷 등기소 사정에 따라 발급이 제한될 수도 있습니다.
          </span>
        )
      case MODES.MANAGEMENT:
        return (
          <span>
            열람등기는 열람일로부터 1개월(30일)까지만 보관됩니다. 열람기간
            중에는 자유롭게 열람 및 다운로드가 <br /> 가능합니다.
          </span>
        )
      default:
        return null
    }
  }, [mode])

  return (
    <FlexColumn gap={20}>
      <S.Title>바로등기</S.Title>
      <S.Description>
        {descriptionContent}
        <Link href={'#'}>이용방법 알아보기</Link>
      </S.Description>
      <S.ButtonContainer>
        <StrokeButton
          text={MODES.REGISTRATION}
          name={MODES.REGISTRATION}
          active={mode === MODES.REGISTRATION}
          onClick={handleChangeMode}
        />
        <StrokeButton
          text={MODES.BASKET}
          name={MODES.BASKET}
          active={mode === MODES.BASKET}
          onClick={handleChangeMode}
        />
        <StrokeButton
          text={MODES.MANAGEMENT}
          name={MODES.MANAGEMENT}
          active={mode === MODES.MANAGEMENT}
          onClick={handleChangeMode}
        />
      </S.ButtonContainer>
    </FlexColumn>
  )
}

export default React.memo(DeunggiInfo)
