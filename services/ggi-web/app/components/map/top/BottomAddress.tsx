import { css } from '@emotion/react'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import Spacing from '@/components/shared/Spacing'
import { useRecoilValue } from 'recoil'
import { jusoAtom } from '@/store/atom/map'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { NaverMap } from '@/models/Map'
import { queryKey } from '../sections/hooks/useMap'
import NextArrow from '../icons/NextArrow'
import SidoList from './detailAddrList/SidoList'
import GunguList from './detailAddrList/GunguList'
import DongList from './detailAddrList/DongList'

interface BottomAddressProps {
  range: number
  setRange: Dispatch<SetStateAction<number>>
  setOpenCursor: Dispatch<SetStateAction<boolean>>
}

export default function BottomAddress({
  range,
  setRange,
  setOpenCursor,
}: BottomAddressProps) {
  const { data: map }: UseQueryResult<NaverMap> = useQuery({
    queryKey: queryKey,
    enabled: false,
  })
  const juso = useRecoilValue(jusoAtom)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [selectedGunguIndex, setSelectedGunguIndex] = useState<number | null>(
    null,
  )
  const [selectedDongIndex, setSelectedDongIndex] = useState<number | null>(
    null,
  )

  const addrToCenter = useCallback(
    async (x: number, y: number) => {
      if (map) {
        map.setCenter({
          lat: y,
          lng: x,
        })
      }
    },
    [map],
  )

  const handleClick = (level: number, condition: boolean, message: string) => {
    if (condition) {
      alert(message)
      return
    }
    setRange(level)
  }

  return (
    <Flex direction="column" css={containerStyle}>
      <Flex direction="row" css={flexRowStyle}>
        <Text
          css={textStyle}
          style={{
            color:
              range === 0 || juso.bottomSido !== '' || juso.topSido !== ''
                ? '#000001'
                : '#9d9999',
            cursor: 'pointer',
          }}
          onClick={() => {
            handleClick(0, false, '')
          }}
        >
          {juso.bottomSido || '시 / 도'}
        </Text>
        <NextArrow />
        <Text
          css={textStyle}
          style={{
            color: juso.bottomGungu !== '' ? '#000001' : '#9d9999',
          }}
          onClick={() => {
            handleClick(1, !juso.bottomSido, '시 / 도를 먼저 선택해주세요.')
          }}
        >
          {juso.bottomGungu || '시 / 군 / 구'}
        </Text>
        <NextArrow />
        <Text
          css={textStyle}
          style={{
            color: juso.bottomDong !== '' ? '#000001' : '#9d9999',
          }}
          onClick={() => {
            handleClick(
              2,
              !juso.bottomGungu,
              '시 / 군 / 구를 먼저 선택해주세요.',
            )
          }}
        >
          {juso.bottomDong || '읍 / 면 / 동'}
        </Text>
      </Flex>
      <Spacing size={20} />
      {range === 0 && (
        <SidoList
          setRange={setRange}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          addrToCenter={addrToCenter}
        />
      )}
      {range === 1 && (
        <GunguList
          setRange={setRange}
          selectedGunguIndex={selectedGunguIndex}
          setSelectedGunguIndex={setSelectedGunguIndex}
          addrToCenter={addrToCenter}
        />
      )}
      {range === 2 && (
        <DongList
          selectedDongIndex={selectedDongIndex}
          setSelectedDongIndex={setSelectedDongIndex}
          addrToCenter={addrToCenter}
          setOpenCursor={setOpenCursor}
        />
      )}
    </Flex>
  )
}

const containerStyle = css`
  background-color: #fff;
  width: 360px;
  max-height: 400px;
  display: flex;
  left: calc(50% + 100px);
  transform: translateX(-50%);
  justify-content: center;
  align-items: center;
  top: 75px;
  position: absolute;
  border-radius: 10px;
  padding: 10px 5px 10px 5px;
  z-index: 100;
  border: 1px solid #9d9999;
`

const flexRowStyle = css`
  height: 20px;
  width: 100%;
  justify-content: start;
  align-items: start;
  display: flex;
`

const textStyle = css`
  text-align: center;
  min-width: 100px;
  max-width: 120px;
  font-family: SUIT;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 135%;
  letter-spacing: -0.15px;
  cursor: pointer;
`
