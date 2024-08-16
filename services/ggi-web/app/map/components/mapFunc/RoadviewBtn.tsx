import { NaverMap } from '@/models/map/Map'
import styled from '@emotion/styled'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { queryKey } from '../sections/hooks/useMap'

type clickedMapProps = {
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

interface MapTypeProps {
  clickedMapType: clickedMapProps
  setClickedMapType: Dispatch<SetStateAction<clickedMapProps>>
}

export default function RoadviewBtn({
  clickedMapType,
  setClickedMapType,
}: MapTypeProps) {
  const { data: map }: UseQueryResult<NaverMap> = useQuery({
    queryKey: queryKey,
    enabled: false,
  })

  useEffect(() => {
    if (map) {
      const roadview = new window.naver.maps.StreetLayer()
      if (clickedMapType.roadView === true) {
        roadview.setMap(map)
      } else {
        roadview.setMap(map)
        roadview.setMap(null)
      }
    }
  }, [clickedMapType.roadView, map])
  return (
    <ContainerStyle
      roadview={clickedMapType.roadView}
      onClick={() => {
        setClickedMapType((prev) => {
          return {
            ...prev,
            roadView: !prev.roadView,
          }
        })
      }}
    >
      {clickedMapType.roadView === false ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M14.7863 6.43025C14.7863 9.63167 9.00056 17.3588 9.00056 17.3588C9.00056 17.3588 3.21484 9.63167 3.21484 6.43025C3.21484 4.89578 3.82441 3.42416 4.90944 2.33913C5.99447 1.2541 7.46609 0.644531 9.00056 0.644531C10.535 0.644531 12.0066 1.2541 13.0917 2.33913C14.1767 3.42416 14.7863 4.89578 14.7863 6.43025V6.43025Z"
            stroke="#000001"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.99888 8.35714C10.064 8.35714 10.9275 7.49369 10.9275 6.42857C10.9275 5.36345 10.064 4.5 8.99888 4.5C7.93376 4.5 7.07031 5.36345 7.07031 6.42857C7.07031 7.49369 7.93376 8.35714 8.99888 8.35714Z"
            fill="#00CF15"
            stroke="#000001"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M14.7863 6.43025C14.7863 9.63167 9.00056 17.3588 9.00056 17.3588C9.00056 17.3588 3.21484 9.63167 3.21484 6.43025C3.21484 4.89578 3.82441 3.42416 4.90944 2.33913C5.99447 1.2541 7.46609 0.644531 9.00056 0.644531C10.535 0.644531 12.0066 1.2541 13.0917 2.33913C14.1767 3.42416 14.7863 4.89578 14.7863 6.43025V6.43025Z"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.99888 8.35714C10.064 8.35714 10.9275 7.49369 10.9275 6.42857C10.9275 5.36345 10.064 4.5 8.99888 4.5C7.93376 4.5 7.07031 5.36345 7.07031 6.42857C7.07031 7.49369 7.93376 8.35714 8.99888 8.35714Z"
            fill="white"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      <RoadviewBtnStyle roadview={clickedMapType.roadView}>
        거리뷰
      </RoadviewBtnStyle>
    </ContainerStyle>
  )
}

const ContainerStyle = styled.div<{ roadview: boolean }>`
  background-color: ${({ roadview }) =>
    roadview === false ? 'white' : '#DC4798'};
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

const RoadviewBtnStyle = styled.span<{ roadview: boolean }>`
  color: ${({ roadview }) => (roadview === false ? '#333333' : 'white')};
  text-align: center;
  font-family: SUIT;
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
  line-height: 135%;
  letter-spacing: -0.11px;
`
