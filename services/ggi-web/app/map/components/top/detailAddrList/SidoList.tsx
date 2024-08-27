'use client'
import Flex from 'app/map/components/shared/Flex'
import Text from 'app/map/components/shared/Text'
<<<<<<< HEAD
import { jusoProps, SidoProps } from '@/models/map/Address'
=======
import { jusoProps, SidoProps } from '@/models/Address'
>>>>>>> e022c75304d00a528adc1ad77ae99f2d5e4a4daf
import { jusoAtom } from '@/store/atom/map'
import { css } from '@emotion/react'
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import useGetSidoList from '../hooks/useGetSidoList'

interface Props {
  setRange: Dispatch<SetStateAction<number>>
  selectedIndex: number | null
  setSelectedIndex: Dispatch<SetStateAction<number | null>>
  addrToCenter: (x: number, y: number) => void
}

const COUNT_PER_ROW = 3

const SidoList = ({
  setRange,
  selectedIndex,
  setSelectedIndex,
  addrToCenter,
}: Props) => {
  const [juso, setJuso] = useRecoilState<jusoProps>(jusoAtom)
  console.log('시도리스트 오픈')
  const { data: sidoList } = useGetSidoList()
  console.log('시도리스트 오픈')
  const handleClick = useCallback(
    (sido: string, actualIndex: number) => {
      setSelectedIndex(actualIndex)
      setJuso((prev) => ({
        ...prev,
        bottomSido: sido,
        bottomGungu: sido === juso.bottomSido ? prev.bottomGungu : '',
        bottomDong: sido === juso.bottomSido ? prev.bottomDong : '',
      }))
      setRange(1)
    },
    [setRange, setSelectedIndex, setJuso, juso.bottomSido],
  )

  const renderSidoItem = (
    item: SidoProps,
    actualIndex: number,
    subIndex: number,
  ) => {
    const isSelected = juso.bottomSido === item.sd
    const shouldHighlightTop =
      selectedIndex != null
        ? actualIndex === selectedIndex ||
          actualIndex === selectedIndex + COUNT_PER_ROW
        : false
    return (
      <Flex
        direction="row"
        key={actualIndex}
        css={boxStyle}
        style={{
          backgroundColor: isSelected ? '#F0F0FF' : 'white',
          borderTop:
            shouldHighlightTop || actualIndex === selectedIndex
              ? '1px solid #332EFC'
              : '1px solid #E5E5E5',
          borderRight: getBorderRight(item, actualIndex),
          borderLeft: getBorderLeft(item, subIndex),
          borderBottom: getBorderBottom(item, subIndex),
          cursor: item.sd === ' ' ? 'default' : 'pointer',
        }}
        onClick={() => {
          if (item.sd !== ' ') {
            handleClick(item.sd, actualIndex)
            addrToCenter(item.x, item.y)
          }
        }}
      >
        <Text
          style={{
            color: isSelected ? '#332EFC' : '#000001',
          }}
        >
          {item.sd}
        </Text>
      </Flex>
    )
  }

  const getBorderRight = (item: SidoProps, actualIndex: number) => {
    if (!sidoList) return ''
    const lastIndex =
      Math.ceil(sidoList.length / COUNT_PER_ROW) * COUNT_PER_ROW - 1
    if (sidoList[lastIndex]?.sd === ' ' && actualIndex === lastIndex) {
      return ''
    } else if (juso.bottomSido === item.sd) {
      return '1px solid #332EFC'
    } else if (actualIndex % COUNT_PER_ROW === 2) {
      return '1px solid #E5E5E5'
    } else if (actualIndex % COUNT_PER_ROW === 1) {
      return '1px solid #E5E5E5'
    } else {
      return ''
    }
  }

  const getBorderLeft = (item: SidoProps, subIndex: number) => {
    const isLastIndex = subIndex % COUNT_PER_ROW
    if (subIndex % COUNT_PER_ROW === 0) {
      if (juso.bottomSido === item.sd) {
        return '1px solid #332EFC'
      } else {
        return '1px solid #E5E5E5'
      }
    } else if (isLastIndex === 1) {
      if (juso.bottomSido === item.sd) {
        return '1px solid #332EFC'
      } else {
        return '1px solid #E5E5E5'
      }
    } else if (isLastIndex === 2) {
      if (juso.bottomSido === item.sd) {
        return '1px solid #332EFC'
      } else {
        return ''
      }
    } else {
      return ''
    }
  }

  const getLastItem = (subIndex: number) => {
    if (!sidoList) return
    return sidoList[
      Math.ceil(sidoList.length / COUNT_PER_ROW) * COUNT_PER_ROW -
        COUNT_PER_ROW +
        subIndex
    ]
  }

  const getBorderBottom = (item: SidoProps, subIndex: number) => {
    if (item === getLastItem(subIndex)) {
      if (getLastItem(subIndex)?.sd === ' ') {
        return ''
      } else if (juso.bottomSido === item.sd) {
        return '1px solid #332EFC'
      } else {
        return '1px solid #E5E5E5'
      }
    } else {
      return ''
    }
  }

  useEffect(() => {
    if (!sidoList) return
    if (sidoList.length > 0) {
      const index = sidoList.map((item) => item.sd).indexOf(juso.bottomSido)
      setSelectedIndex(index !== -1 ? index : null)
    }
  }, [juso.bottomSido, sidoList, setSelectedIndex])

  return (
    <Flex direction="column">
      {sidoList &&
        sidoList.map(
          (_, index) =>
            index % COUNT_PER_ROW === 0 && (
              <Flex direction="row" key={index}>
                {sidoList
                  .slice(index, index + COUNT_PER_ROW)
                  .map((item, subIndex) =>
                    renderSidoItem(item, index + subIndex, subIndex),
                  )}
              </Flex>
            ),
        )}
    </Flex>
  )
}

export default SidoList

const boxStyle = css`
  display: flex;
  width: 110px;
  height: 36px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`
