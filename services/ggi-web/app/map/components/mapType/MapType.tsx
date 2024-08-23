import { NaverMap } from 'app/map/models/map/Map'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { queryKey } from '../sections/hooks/useMap'
import Flex from '../shared/Flex'

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
  setOpenOverlay: Dispatch<SetStateAction<boolean>>
}

export default function MapType({
  clickedMapType,
  setClickedMapType,
  setOpenOverlay,
}: MapTypeProps) {
  const { data: map }: UseQueryResult<NaverMap> = useQuery({
    queryKey: queryKey,
    enabled: false,
  })
  const [indexNum, setIndexNum] = useState(0)
  const handleMapTypeChange = useCallback(
    (type: string) => {
      if (type === 'basic') {
        setClickedMapType((prev) => {
          return {
            ...prev,
            basic: true,
            terrain: false,
            satellite: false,
            cadastral: false,
          }
        })
        map?.setMapTypeId(window.naver.maps?.MapTypeId.NORMAL)
      }
      if (type === 'terrain') {
        setClickedMapType((prev) => {
          return {
            ...prev,
            basic: false,
            terrain: true,
            satellite: false,
            cadastral: false,
          }
        })
        map?.setMapTypeId(window.naver.maps?.MapTypeId.TERRAIN)
      }
      if (type === 'satellite') {
        setClickedMapType((prev) => {
          return {
            ...prev,
            basic: false,
            terrain: false,
            satellite: true,
            cadastral: false,
          }
        })
        map?.setMapTypeId(window.naver.maps?.MapTypeId.HYBRID)
      }
    },
    [map, setClickedMapType],
  )
  return (
    <Flex
      css={ContainerStyle}
      onClick={() => {
        setOpenOverlay(false)
      }}
    >
      <NormalType
        index={indexNum}
        clicked={clickedMapType.basic}
        onClick={() => {
          handleMapTypeChange('basic')
          setIndexNum(0)
        }}
      >
        <TextStyle clicked={clickedMapType.basic}>기본지도</TextStyle>
      </NormalType>
      <TerrainType
        index={indexNum}
        clicked={clickedMapType.terrain}
        onClick={() => {
          handleMapTypeChange('terrain')
          setIndexNum(1)
        }}
      >
        <TextStyle clicked={clickedMapType.terrain}>지형도</TextStyle>
      </TerrainType>
      <SatelliteType
        index={indexNum}
        clicked={clickedMapType.satellite}
        onClick={() => {
          handleMapTypeChange('satellite')
          setIndexNum(2)
        }}
      >
        <TextStyle clicked={clickedMapType.satellite}>위성지도</TextStyle>
      </SatelliteType>
    </Flex>
  )
}
const ContainerStyle = css`
  position: absolute;
  top: 10px;
  right: 20px;
  display: flex;
  width: 150px;
  height: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background: #fbfbfb;
  flex-direction: row;
  border-radius: 5px;
`

const NormalType = styled.div<{
  index: number
  clicked: boolean
}>`
  background-color: ${({ clicked }) => (clicked ? '#F0F0FF' : 'white')};
  border-left: ${({ clicked }) =>
    clicked ? '1px solid #332EFC' : '1px solid #333333'};
  border-top: ${({ clicked }) =>
    clicked ? '1px solid #332EFC' : '1px solid #333333'};
  border-bottom: ${({ clicked }) =>
    clicked ? '1px solid #332EFC' : '1px solid #333333'};
  width: 50px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`

const TerrainType = styled.div<{
  index: number
  clicked: boolean
}>`
  background-color: ${({ clicked }) => (clicked ? '#F0F0FF' : 'white')};
  border-left: ${({ clicked, index }) =>
    index === 1 && clicked
      ? '1px solid #332EFC'
      : index === 0 && !clicked
      ? '1px solid #332EFC'
      : '1px solid #333333'};
  border-top: ${({ clicked }) =>
    clicked ? '1px solid #332EFC' : '1px solid #333333'};
  border-bottom: ${({ clicked }) =>
    clicked ? '1px solid #332EFC' : '1px solid #333333'};
  border-right: ${({ clicked, index }) =>
    clicked
      ? '1px solid #332EFC'
      : index === 1 && !clicked
      ? '1px solid #333333'
      : index === 2 && !clicked
      ? '1px solid #332EFC'
      : index === 0 && !clicked
      ? '1px solid #333333'
      : 'none'};
  width: 50px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const SatelliteType = styled.div<{
  index: number
  clicked: boolean
}>`
  background-color: ${({ clicked }) => (clicked ? '#F0F0FF' : 'white')};
  border-left: 'none';
  border-top: ${({ clicked }) =>
    clicked ? '1px solid #332EFC' : '1px solid #333333'};
  border-bottom: ${({ clicked }) =>
    clicked ? '1px solid #332EFC' : '1px solid #333333'};
  border-right: ${({ clicked }) =>
    clicked ? '1px solid #332EFC' : '1px solid #333333'};
  width: 50px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`

const TextStyle = styled.span<{ clicked: boolean }>`
  text-align: center;
  font-family: SUIT;
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
  line-height: 135%;
  letter-spacing: -0.11px;
  color: ${({ clicked }) => (clicked ? '#332EFC' : '#333333')};
`
