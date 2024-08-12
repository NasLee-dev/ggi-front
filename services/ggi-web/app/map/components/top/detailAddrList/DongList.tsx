'use client'
import Flex from 'app/map/components/shared/Flex'
import Text from 'app/map/components/shared/Text'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { css } from '@emotion/react'
import { useRecoilState } from 'recoil'
import { jusoAtom } from '@/store/atom/map'
import { DongProps } from '@/models/Address'
import useGetDongList from '../hooks/useGetDongList'

interface DongListProps {
  selectedDongIndex: number | null
  setSelectedDongIndex: Dispatch<SetStateAction<number | null>>
  addrToCenter: (x: number, y: number) => void
  setOpenCursor: Dispatch<SetStateAction<boolean>>
}

const COUNT_PER_ROW = 3

const DongList = ({
  selectedDongIndex,
  setSelectedDongIndex,
  addrToCenter,
  setOpenCursor,
}: DongListProps) => {
  const [juso, setJuso] = useRecoilState(jusoAtom)
  const { data: dongList } = useGetDongList()
  const handleClick = (dong: string, actualIndex: number) => {
    setSelectedDongIndex(actualIndex)
    setJuso((prev) => {
      return {
        ...prev,
        bottomDong: dong,
      }
    })
    setOpenCursor(false)
  }

  const renderDonItem = (
    item: DongProps,
    actualIndex: number,
    subIndex: number,
  ) => {
    const isSelected = juso.bottomDong === item.umd
    const shouldHighlightTop =
      selectedDongIndex != null
        ? actualIndex === selectedDongIndex ||
          actualIndex === selectedDongIndex + COUNT_PER_ROW
        : false
    return (
      <Flex
        direction="row"
        key={actualIndex}
        css={boxStyle}
        style={{
          marginRight: subIndex === 2 ? '2.5px' : '',
          backgroundColor: isSelected ? '#F0F0FF' : 'white',
          borderTop: getBorderTop(shouldHighlightTop),
          borderRight: getBorderRight(item, actualIndex),
          borderLeft: getBorderLeft(item, subIndex),
          borderBottom: getBorderBottom(item, subIndex),
          cursor: item.umd === ' ' ? 'default' : 'pointer',
        }}
        onClick={() => {
          if (item.umd !== ' ') {
            handleClick(item.umd, actualIndex)
            addrToCenter(item.x, item.y)
          }
        }}
      >
        <Text
          style={{
            color: isSelected ? '#332EFC' : '#000001',
          }}
        >
          {item.umd}
        </Text>
      </Flex>
    )
  }

  const getBorderTop = (shouldHighlightTop: boolean) => {
    return shouldHighlightTop ? `1px solid #332EFC` : '1px solid #E5E5E5'
  }

  const getBorderRight = (item: DongProps, actualIndex: number) => {
    if (!dongList) return ''
    const lastIndex =
      Math.ceil(dongList.length / COUNT_PER_ROW) * COUNT_PER_ROW - 1
    if (dongList[lastIndex]?.umd === ' ' && actualIndex === lastIndex) {
      return ''
    } else if (juso.bottomDong === item.umd) {
      return '1px solid #332EFC'
    } else if (actualIndex % COUNT_PER_ROW === 2 && item.umd !== ' ') {
      return '1px solid #E5E5E5'
    } else if (actualIndex % COUNT_PER_ROW === 1 && item.umd !== ' ') {
      return '1px solid #E5E5E5'
    } else {
      return ''
    }
  }

  const getBorderLeft = (item: DongProps, subIndex: number) => {
    if (subIndex % COUNT_PER_ROW === 0) {
      return juso.bottomDong === item.umd
        ? '1px solid #332EFC'
        : '1px solid #E5E5E5'
    } else if (subIndex % COUNT_PER_ROW === 1) {
      return juso.bottomDong === item.umd
        ? '1px solid #332EFC'
        : '1px solid #E5E5E5'
    } else if (subIndex % COUNT_PER_ROW === 2) {
      return juso.bottomDong === item.umd ? '1px solid #332EFC' : ''
    } else {
      return ''
    }
  }

  const getBorderBottom = (item: DongProps, subIndex: number) => {
    if (!dongList) return ''
    const lastIndex =
      Math.ceil(dongList.length / COUNT_PER_ROW) * COUNT_PER_ROW -
      COUNT_PER_ROW +
      subIndex
    if (item === dongList[lastIndex]) {
      if (dongList[lastIndex]?.umd === ' ') {
        return ''
      } else if (juso.bottomDong === item.umd) {
        return '1px solid #332EFC'
      } else {
        return '1px solid #E5E5E5'
      }
    } else {
      return ''
    }
  }

  useEffect(() => {
    if (!dongList) return
    if (dongList.length > 0) {
      const index = dongList.map((item) => item.umd).indexOf(juso.bottomDong)
      setSelectedDongIndex(index !== -1 ? index : null)
    }
  }, [juso.bottomDong, dongList, setSelectedDongIndex])

  return (
    <Flex direction="column" css={containerStyle}>
      {dongList &&
        dongList?.map((_, index) => (
          <Flex direction="row" key={index}>
            {dongList
              .slice(
                index * COUNT_PER_ROW,
                index * COUNT_PER_ROW + COUNT_PER_ROW,
              )
              .map((subItem, subIndex) =>
                renderDonItem(
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

export default DongList
