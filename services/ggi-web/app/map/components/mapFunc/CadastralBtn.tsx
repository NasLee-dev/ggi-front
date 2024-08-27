/* eslint-disable react-hooks/rules-of-hooks */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react'
import { queryKey } from '../sections/hooks/useMap'
import { NaverMap } from 'app/map/models/map/Map'
import Text from '../shared/Text'

interface MapTypeProps {
  clickedMapType: {
    basic: boolean
    terrain: boolean
    satellite: boolean
    cadastral: boolean
    interest: boolean
    roadView: boolean
    current: boolean
    distance: boolean
    area: boolean
  }
  setClickedMapType: Dispatch<
    SetStateAction<{
      basic: boolean
      terrain: boolean
      satellite: boolean
      cadastral: boolean
      interest: boolean
      roadView: boolean
      current: boolean
      distance: boolean
      area: boolean
    }>
  >
}

export default function CadastralBtn({
  clickedMapType,
  setClickedMapType,
}: MapTypeProps) {
  const { data: map } = useQuery({
    queryKey: queryKey,
    enabled: false,
  })

  useEffect(() => {
    if (map) {
      const cadastral = new window.naver.maps.CadastralLayer()
      if (clickedMapType.cadastral === true) {
        cadastral.setMap(map as NaverMap)
      } else {
        cadastral.setMap(map as NaverMap)
        cadastral.setMap(null)
      }
    }
  }, [clickedMapType.cadastral, map])

  return (
    <ContainerStyle
      cadastral={clickedMapType.cadastral}
      onClick={() => {
        setClickedMapType((prev) => {
          return {
            ...prev,
            cadastral: !prev.cadastral,
          }
        })
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <g
          clipPath={
            clickedMapType.cadastral
              ? 'url(#clip0_97_2013)'
              : 'url(#clip0_97_1967)'
          }
        >
          <path
            d="M1.9308 17.3594L16.0737 17.3594C16.7837 17.3594 17.3594 16.7837 17.3594 16.0737L17.3594 1.9308C17.3594 1.22072 16.7837 0.64509 16.0737 0.64509L1.9308 0.64509C1.22072 0.64509 0.64509 1.22072 0.64509 1.9308L0.64509 16.0737C0.64509 16.7837 1.22072 17.3594 1.9308 17.3594Z"
            stroke={clickedMapType.cadastral ? 'white' : '#000001'}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.07422 0.644531V17.3588"
            stroke={clickedMapType.cadastral ? 'white' : '#000001'}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.07422 11.5742H17.3599"
            stroke={clickedMapType.cadastral ? 'white' : '#000001'}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M0.644531 6.04297H7.0731"
            stroke={clickedMapType.cadastral ? 'white' : '#000001'}
          />
        </g>
        <defs>
          <clipPath id="clip0_97_1967">
            <rect width="18" height="18" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <Text
        style={{
          color: clickedMapType.cadastral ? 'white' : '#333333',
        }}
        css={TextStyle}
      >
        지적도
      </Text>
    </ContainerStyle>
  )
}

const ContainerStyle = styled.div<{ cadastral: boolean }>`
  background-color: ${({ cadastral }) => (cadastral ? '#4945FF' : 'white')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border: 1px solid #333333;
  cursor: pointer;
  border-radius: 5px;
`
const TextStyle = css`
  font-weight: bold;
  color: #000001;
  text-align: center;
  font-family: SUIT;
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
  line-height: 135%;
  letter-spacing: -0.11px;
`
