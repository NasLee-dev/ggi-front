import { NaverMap } from '@/models/map/Map'
import styled from '@emotion/styled'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { queryKey } from '../sections/hooks/useMap'

export default function CurrentBtn() {
  const { data: map }: UseQueryResult<NaverMap> = useQuery({
    queryKey: queryKey,
    enabled: false,
  })
  const handleMoveCurrentLocation = () => {
    navigator?.geolocation?.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      map?.setCenter({ lat: latitude, lng: longitude })
    })
  }
  return (
    <ContainerStyle
      onClick={() => {
        handleMoveCurrentLocation()
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <g clipPath="url(#clip0_97_1975)">
          <path
            d="M9.99888 16.4275C13.5493 16.4275 16.4275 13.5493 16.4275 9.99888C16.4275 6.44848 13.5493 3.57031 9.99888 3.57031C6.44848 3.57031 3.57031 6.44848 3.57031 9.99888C3.57031 13.5493 6.44848 16.4275 9.99888 16.4275Z"
            stroke="#000001"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.99944 10.7137C10.3939 10.7137 10.7137 10.3939 10.7137 9.99944C10.7137 9.60495 10.3939 9.28516 9.99944 9.28516C9.60495 9.28516 9.28516 9.60495 9.28516 9.99944C9.28516 10.3939 9.60495 10.7137 9.99944 10.7137Z"
            fill="#2ACB42"
            stroke="#2ACB42"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 3.57199V0.714844"
            stroke="#000001"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 19.2868V16.4297"
            stroke="#000001"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.4297 10H19.2868"
            stroke="#000001"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M0.714844 10H3.57199"
            stroke="#000001"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_97_1975">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <CurrentTextStyle>현위치</CurrentTextStyle>
    </ContainerStyle>
  )
}

const ContainerStyle = styled.div`
  background-color: white;
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
const CurrentTextStyle = styled.span`
  color: #333333;
  text-align: center;
  font-family: SUIT;
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
  line-height: 135%;
  letter-spacing: -0.11px;
`
