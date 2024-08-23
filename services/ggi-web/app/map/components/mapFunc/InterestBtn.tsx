import { NaverMap } from '@/models/map/Map'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'
import { queryKey } from '../sections/hooks/useMap'
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

export default function InterestBtn({
  clickedMapType,
  setClickedMapType,
}: MapTypeProps) {
  const { data: map }: UseQueryResult<NaverMap> = useQuery({
    queryKey: queryKey,
    enabled: false,
  })
  return (
    <>
      {map && map?.getZoom() >= 15 && (
        <ContainerStyle
          interest={clickedMapType.interest}
          onClick={() => {
            setClickedMapType((prev) => {
              return {
                ...prev,
                interest: !prev.interest,
              }
            })
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
          >
            <path
              d="M9.00534 15.0933L1.79105 8.5586C-2.12977 4.63778 3.63383 -2.89018 9.00534 3.20015C14.3769 -2.89018 20.1143 4.66392 16.2196 8.5586L9.00534 15.0933Z"
              fill={clickedMapType.interest ? '#00A980' : 'white'}
              stroke={clickedMapType.interest ? 'white' : '#333333'}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Text
            style={{
              color: clickedMapType.interest ? 'white' : '#333333',
            }}
            css={TextStyle}
          >
            관심물건
          </Text>
        </ContainerStyle>
      )}
      {map && map?.getZoom() < 15 && (
        <NoContainerStyle>
          <div
            style={{
              width: '17px',
              height: '15px',
              flexShrink: 0,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
            >
              <path
                d="M9.00534 15.0933L1.79105 8.5586C-2.12977 4.63778 3.63383 -2.89018 9.00534 3.20015C14.3769 -2.89018 20.1143 4.66392 16.2196 8.5586L9.00534 15.0933Z"
                fill="#ECECEC"
                stroke="#9D9999"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <NoTextStyle>관심물건</NoTextStyle>
        </NoContainerStyle>
      )}
    </>
  )
}

const ContainerStyle = styled.div<{ interest: boolean }>`
  width: 45px;
  height: 45px;
  background-color: ${({ interest }) => (interest ? '#00A980' : 'white')};
  border: 1px solid #333333;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
const NoContainerStyle = styled.div`
  display: flex;
  width: 45px;
  height: 45px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 4px;
  border: 0.5px solid #9d9999;
  background: #ececec;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
`
const NoTextStyle = styled.span`
  color: #9d9999;
  text-align: center;
  font-family: SUIT;
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  line-height: 135%; /* 14.85px */
  letter-spacing: -0.11px;
`
