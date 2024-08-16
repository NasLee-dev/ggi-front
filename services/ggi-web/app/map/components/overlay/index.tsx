/* eslint-disable react-hooks/rules-of-hooks */
import { css } from '@emotion/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { clickedInfoAtom, markerPositionAtom } from '@/store/atom/map'
import { NaverMap } from '@/models/map/Map'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { queryKey } from '../sections/hooks/useMap'
import useGetDetail from './hooks/useGetDetail'
import Top from './Top'
import Bottom from './Bottom'
import Flex from '../shared/Flex'

interface OverlayProps {
  halfDimensions: { width: number; height: number }
  openOverlay: boolean
}

export default function Overlay({ halfDimensions, openOverlay }: OverlayProps) {
  const ref = useRef<HTMLDivElement>(null)
  const markerPosition = useRecoilValue(markerPositionAtom)
  const [nowIndex, setNowIndex] = useState<number>(0)
  const setClickedInfo = useSetRecoilState(clickedInfoAtom)
  const { data: map }: UseQueryResult<NaverMap> = useQuery({
    queryKey: queryKey,
    enabled: false,
  })
  const calculateScreenNum = useMemo(() => {
    const position = {
      first: false,
      second: false,
      third: false,
      fourth: false,
    }
    if (
      markerPosition.position[0] > 390 &&
      markerPosition.position[0] < halfDimensions.width &&
      markerPosition.position[1] < halfDimensions.height
    ) {
      position.first = true
    } else if (
      markerPosition.position[1] < halfDimensions.height &&
      markerPosition.position[0] > halfDimensions.width
    ) {
      position.second = true
    } else if (
      markerPosition.position[1] > halfDimensions.height &&
      markerPosition.position[0] > halfDimensions.width
    ) {
      position.third = true
    } else if (
      markerPosition.position[1] > halfDimensions.height &&
      markerPosition.position[0] > 370 &&
      markerPosition.position[0] < halfDimensions.width
    ) {
      position.fourth = true
    } else {
      position.first = false
      position.second = false
      position.third = false
      position.fourth = false
    }

    return position
  }, [markerPosition, halfDimensions])

  const handleCalcLeftTop = useCallback(() => {
    if (map && map.getZoom() > 15) {
      if (
        markerPosition.type[0] === 1 ||
        markerPosition.type[0] === 2 ||
        markerPosition.type[0] === 3
      ) {
        if (markerPosition.winYn === 'Y') {
          if (map.getZoom() === 16) {
            if (calculateScreenNum.first) {
              return {
                left: markerPosition.position[0] + 100,
                top: markerPosition.position[1] + 30,
              }
            } else if (calculateScreenNum.second) {
              return {
                left: markerPosition.position[0] - 300,
                top: markerPosition.position[1] + 30,
              }
            } else if (calculateScreenNum.third) {
              return {
                left: markerPosition.position[0] - 300,
                top: markerPosition.position[1] - 320,
              }
            } else if (calculateScreenNum.fourth) {
              return {
                left: markerPosition.position[0] + 100,
                top: markerPosition.position[1] - 320,
              }
            } else {
              return {
                left: 0,
                top: 0,
              }
            }
          } else if (map.getZoom() > 16) {
            if (calculateScreenNum.first) {
              return {
                left: markerPosition.position[0] + 100,
                top: markerPosition.position[1] + 90,
              }
            } else if (calculateScreenNum.second) {
              return {
                left: markerPosition.position[0] - 300,
                top: markerPosition.position[1] + 100,
              }
            } else if (calculateScreenNum.third) {
              return {
                left: markerPosition.position[0] - 300,
                top: markerPosition.position[1] - 320,
              }
            } else if (calculateScreenNum.fourth) {
              return {
                left: markerPosition.position[0] + 100,
                top: markerPosition.position[1] - 320,
              }
            } else {
              return {
                left: 0,
                top: 0,
              }
            }
          }
        } else if (calculateScreenNum.first) {
          return {
            left: markerPosition.position[0] + 100,
            top: markerPosition.position[1] + 90,
          }
        } else if (calculateScreenNum.second) {
          return {
            left: markerPosition.position[0] - 300,
            top: markerPosition.position[1] + 100,
          }
        } else if (calculateScreenNum.third) {
          return {
            left: markerPosition.position[0] - 300,
            top: markerPosition.position[1] - 320,
          }
        } else if (calculateScreenNum.fourth) {
          return {
            left: markerPosition.position[0] + 100,
            top: markerPosition.position[1] - 320,
          }
        } else {
          return {
            left: 0,
            top: 0,
          }
        }
      } else if (markerPosition.type[0] === 4) {
        if (calculateScreenNum.first) {
          return {
            left: markerPosition.position[0] + 100,
            top: markerPosition.position[1] + 30,
          }
        } else if (calculateScreenNum.second) {
          return {
            left: markerPosition.position[0] - 300,
            top: markerPosition.position[1] + 40,
          }
        } else if (calculateScreenNum.third) {
          return {
            left: markerPosition.position[0] - 300,
            top: markerPosition.position[1] - 320,
          }
        } else if (calculateScreenNum.fourth) {
          return {
            left: markerPosition.position[0] + 100,
            top: markerPosition.position[1] - 320,
          }
        } else {
          return {
            left: 0,
            top: 0,
          }
        }
      }
    } else {
      if (
        markerPosition.type[0] === 1 ||
        markerPosition.type[0] === 2 ||
        markerPosition.type[0] === 3
      ) {
        if (markerPosition.winYn === 'Y') {
          if (map && map.getZoom() === 15) {
            if (calculateScreenNum.first) {
              return {
                left: markerPosition.position[0] + 10,
                top: markerPosition.position[1] + 10,
              }
            } else if (calculateScreenNum.second) {
              return {
                left: markerPosition.position[0] - 300,
                top: markerPosition.position[1] + 10,
              }
            } else if (calculateScreenNum.third) {
              return {
                left: markerPosition.position[0] - 300,
                top: markerPosition.position[1] - 320,
              }
            } else if (calculateScreenNum.fourth) {
              return {
                left: markerPosition.position[0] + 10,
                top: markerPosition.position[1] - 330,
              }
            }
          } else if (map && map.getZoom() < 15) {
            if (calculateScreenNum.first) {
              return {
                left: markerPosition.position[0] + 100,
                top: markerPosition.position[1] + 50,
              }
            } else if (calculateScreenNum.second) {
              return {
                left: markerPosition.position[0] - 300,
                top: markerPosition.position[1] + 40,
              }
            } else if (calculateScreenNum.third) {
              return {
                left: markerPosition.position[0] - 300,
                top: markerPosition.position[1] - 320,
              }
            } else if (calculateScreenNum.fourth) {
              return {
                left: markerPosition.position[0] + 100,
                top: markerPosition.position[1] - 320,
              }
            }
          }
        } else {
          if (calculateScreenNum.first) {
            return {
              left: markerPosition.position[0] + 100,
              top: markerPosition.position[1] + 30,
            }
          } else if (calculateScreenNum.second) {
            return {
              left: markerPosition.position[0] - 300,
              top: markerPosition.position[1] + 40,
            }
          } else if (calculateScreenNum.third) {
            return {
              left: markerPosition.position[0] - 300,
              top: markerPosition.position[1] - 320,
            }
          } else if (calculateScreenNum.fourth) {
            return {
              left: markerPosition.position[0] + 100,
              top: markerPosition.position[1] - 320,
            }
          }
        }
      } else if (markerPosition.type[0] === 4) {
        if (calculateScreenNum.first) {
          return {
            left: markerPosition.position[0] + 10,
            top: markerPosition.position[1] + 10,
          }
        } else if (calculateScreenNum.second) {
          return {
            left: markerPosition.position[0] - 300,
            top: markerPosition.position[1] + 10,
          }
        } else if (calculateScreenNum.third) {
          return {
            left: markerPosition.position[0] - 300,
            top: markerPosition.position[1] - 320,
          }
        } else if (calculateScreenNum.fourth) {
          return {
            left: markerPosition.position[0] + 10,
            top: markerPosition.position[1] - 330,
          }
        }
      }
      return {
        left: 0,
        top: 0,
      }
    }
  }, [markerPosition, calculateScreenNum])

  const { data } = useGetDetail(openOverlay)
  useEffect(() => {
    if (data) {
      const sortedData = data?.slice().sort((a, b) => {
        if (a?.winAmt !== undefined && b?.winAmt !== undefined) {
          if (a.winAmt > 0 && b.winAmt === 0) {
            return 1
          } else if (a.winAmt === 0 && b.winAmt > 0) {
            return -1
          } else if (a.winAmt > 0 && b.type === 4) {
            return -1
          } else if (a.type !== 4 && b.type === 4) {
            return -1
          }
        }
        return 0
      })
      setClickedInfo(sortedData)
    }
  }, [data, setClickedInfo])
  return (
    <Flex
      css={Overlaytop}
      ref={ref}
      style={{
        left:
          handleCalcLeftTop()?.left !== 0
            ? handleCalcLeftTop()?.left + 'px'
            : '50%',
        top:
          handleCalcLeftTop()?.top !== 0
            ? handleCalcLeftTop()?.top + 'px'
            : '50%',
        transform:
          handleCalcLeftTop()?.top === 0 && handleCalcLeftTop()?.left === 0
            ? 'translate(-50%, -50%)'
            : '',
      }}
    >
      <Top nowIndex={nowIndex} setNowIndex={setNowIndex} />
      <Bottom nowIndex={nowIndex} />
    </Flex>
  )
}

const Overlaytop = css`
  width: 300px;
  height: 326px;
  border-radius: 8px 8px 8px 8px;
  border: 0.5px solid #9d9999;
  z-index: 10;
  position: absolute;
  background: white;
  flex-direction: column;
`
