'use client'
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react'
import Flex from '@/components/shared/Flex'
import { css } from '@emotion/react'
import Text from '@/components/shared/Text'
import { useRecoilState } from 'recoil'
import { jusoAtom } from '@/store/atom/map'
import { GunguProps } from '@/models/Address'
import useGetGunguList from '../hooks/useGetGunguList'

interface Props {
  selectedGunguIndex: number | null
  setSelectedGunguIndex: Dispatch<SetStateAction<number | null>>
  addrToCenter: (x: number, y: number) => void
  setRange: Dispatch<SetStateAction<number>>
}

const COUNT_PER_ROW = 3

const GunguList = ({
  selectedGunguIndex,
  setSelectedGunguIndex,
  addrToCenter,
  setRange,
}: Props) => {
  const [juso, setJuso] = useRecoilState(jusoAtom)
  const { data: gunguList } = useGetGunguList()

  const handleClick = useCallback(
    (gungu: string, actualIndex: number) => {
      setRange(2)
      setSelectedGunguIndex(actualIndex)
      setJuso((prev) => {
        return {
          ...prev,
          bottomGungu: gungu,
          bottomDong: '',
        }
      })
    },
    [setJuso, setSelectedGunguIndex, setRange],
  )

  const renderGunguItem = (
    item: GunguProps,
    actualIndex: number,
    subIndex: number,
  ) => {
    const isSelected = juso.bottomGungu === item.sgg
    const shouldHighlightTop =
      selectedGunguIndex != null
        ? actualIndex === selectedGunguIndex ||
          actualIndex === selectedGunguIndex + COUNT_PER_ROW
        : false
    return (
      <Flex
        direction="row"
        key={actualIndex}
        css={boxStyle}
        style={{
          marginRight: subIndex === 2 ? '2.5px' : '',
          backgroundColor: isSelected ? '#F0F0FF' : 'white',
          borderTop: getBorderTop(item, actualIndex, shouldHighlightTop),
          borderRight: getBorderRight(item, actualIndex),
          borderLeft: getBorderLeft(item, subIndex),
          borderBottom: getBorderBottom(item, subIndex),
          cursor: item.sgg === ' ' ? 'default' : 'pointer',
        }}
        onClick={() => {
          if (item.sgg !== ' ') {
            handleClick(item.sgg, actualIndex)
            addrToCenter(item.x, item.y)
          }
        }}
      >
        <Text
          style={{
            color: isSelected ? '#332EFC' : '#000001',
          }}
        >
          {item.sgg}
        </Text>
      </Flex>
    )
  }

  const getBorderTop = (
    item: GunguProps,
    actualIndex: number,
    shouldHighlightTop: boolean,
  ) => {
    if (shouldHighlightTop) {
      return '1px solid #332EFC'
    } else if (actualIndex < 3) {
      return item.sgg === ' ' ? '' : '1px solid #E5E5E5'
    } else {
      return '1px solid #E5E5E5'
    }
  }

  const getBorderRight = (item: GunguProps, actualIndex: number) => {
    if (!gunguList) return ''
    const lastIndex =
      Math.ceil(gunguList.length / COUNT_PER_ROW) * COUNT_PER_ROW - 1
    if (gunguList[lastIndex]?.sgg === ' ' && actualIndex === lastIndex) {
      return ''
    } else if (juso.bottomGungu === item.sgg) {
      return '1px solid #332EFC'
    } else if (actualIndex % COUNT_PER_ROW === 2 && item.sgg !== ' ') {
      return '1px solid #E5E5E5'
    } else if (actualIndex % COUNT_PER_ROW === 1 && item.sgg !== ' ') {
      return '1px solid #E5E5E5'
    } else {
      return ''
    }
  }

  const getBorderLeft = (item: GunguProps, subIndex: number) => {
    if (subIndex % COUNT_PER_ROW === 0) {
      return juso.bottomGungu === item.sgg
        ? '1px solid #332EFC'
        : '1px solid #E5E5E5'
    } else if (subIndex % COUNT_PER_ROW === 1) {
      return juso.bottomGungu === item.sgg
        ? '1px solid #332EFC'
        : '1px solid #E5E5E5'
    } else if (subIndex % COUNT_PER_ROW === 2) {
      return juso.bottomGungu === item.sgg ? '1px solid #332EFC' : ''
    } else {
      return ''
    }
  }

  const getBorderBottom = (item: GunguProps, subIndex: number) => {
    if (!gunguList) return ''
    const gijunIndex =
      Math.ceil(gunguList.length / COUNT_PER_ROW) * COUNT_PER_ROW -
      COUNT_PER_ROW +
      subIndex
    if (item === gunguList[gijunIndex]) {
      return gunguList[gijunIndex]?.sgg === ' '
        ? ''
        : juso.bottomGungu === item.sgg
          ? '1px solid #332EFC'
          : '1px solid #E5E5E5'
    } else {
      return ''
    }
  }
  useEffect(() => {
    if (!gunguList) return
    if (gunguList.length > 0) {
      const index = gunguList.map((item) => item.sgg).indexOf(juso.bottomGungu)
      setSelectedGunguIndex(index !== -1 ? index : null)
    }
  }, [juso.bottomGungu, gunguList, setSelectedGunguIndex])
  return (
    <Flex direction="column" css={containerStyle}>
      {gunguList &&
        gunguList.map((_, index) => (
          <Flex direction="row" key={index}>
            {gunguList
              .slice(
                index * COUNT_PER_ROW,
                index * COUNT_PER_ROW + COUNT_PER_ROW,
              )
              .map((subItem, subIndex) =>
                renderGunguItem(
                  subItem,
                  index * COUNT_PER_ROW + subIndex,
                  subIndex,
                ),
              )}
          </Flex>
        ))}
    </Flex>
  )
}

export default GunguList

const containerStyle = css`
  overflow-y: auto;
  position: relative;
  min-height: 100px;
  max-height: 200px;
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    background: #dfdfdf;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  & {
    scrollbar-width: thin;
    scrollbar-color: #dfdfdf #fff;
  }

  &:hover {
    scrollbar-color: #555 #fff;
  }
`

const boxStyle = css`
  display: flex;
  width: 110px;
  height: 36px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`
