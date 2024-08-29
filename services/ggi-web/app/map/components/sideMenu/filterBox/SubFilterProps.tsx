'use client'
import Text from 'app/map/components/shared/Text'
import { css } from '@emotion/react'
import { NaverMap } from '@/models/map/Map'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { queryKey } from '../../sections/hooks/useMap'
import { colors } from 'app/styles/colorPallette'

interface SubFilter {
  textType: string
  isSelected: boolean
  onButtonClick: () => void
  nowChecked?: boolean
  isBoxOpen?: boolean
}

export default function SubFilterProps({
  isSelected,
  textType,
  onButtonClick,
  nowChecked,
  isBoxOpen,
}: SubFilter) {
  const { data: map }: UseQueryResult<NaverMap> = useQuery({
    queryKey: queryKey,
    enabled: false,
  })
  return (
    <button
      css={FilterStyle}
      style={{
        position: 'relative',
        cursor:
          textType !== '용도' && map && map?.getZoom() < 15
            ? 'not-allowed'
            : 'pointer',
      }}
      disabled={
        textType !== '용도' && map && map?.getZoom() < 15 ? true : false
      }
      onClick={onButtonClick}
    >
      <div
        css={dotStyle}
        style={{
          backgroundColor:
            isSelected && isBoxOpen && textType === '낙찰결과'
              ? colors.filterOrange
              : isSelected && isBoxOpen && textType === '용도'
                ? colors.filterDarkBlue
                : isSelected && isBoxOpen && textType === '감정가'
                  ? colors.filterDarkBlue
                  : isSelected && isBoxOpen && textType === '최저가'
                    ? colors.filterDarkBlue
                    : isSelected
                      ? colors.textGray
                      : '',
          right:
            textType.length === 2
              ? '5px'
              : textType.length === 3
                ? '0px'
                : '-5px',
          top: '0px',
        }}
      />
      <Text
        color={
          nowChecked && isBoxOpen && textType === '낙찰결과'
            ? 'filterOrange'
            : nowChecked && isBoxOpen && textType === '용도'
              ? 'filterDarkBlue'
              : nowChecked && isBoxOpen && textType === '감정가'
                ? 'filterDarkBlue'
                : nowChecked && isBoxOpen && textType === '최저가'
                  ? 'filterDarkBlue'
                  : isSelected
                    ? 'textGray'
                    : 'textGray'
        }
        fontWeight="600"
        typography="t4"
      >
        {textType}
      </Text>
    </button>
  )
}

const dotStyle = css`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  position: absolute;
  top: 5px;
`

const FilterStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 67px;
  height: 100%;
`
