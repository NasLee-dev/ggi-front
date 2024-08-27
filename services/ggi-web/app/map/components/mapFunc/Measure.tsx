import {
  useEffect,
  useCallback,
  useState,
  SetStateAction,
  Dispatch,
} from 'react'
import { css } from '@emotion/react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { NaverMap } from 'app/map/models/map/Map'
import { queryKey } from '../sections/hooks/useMap'
import { isCurrentStateAtom, isPyeongState } from '@/store/atom/map'
import { fromSquareMetersToText } from 'utils/map/MeterToText'
import useMapListeners from './hooks/useMapListener'
import Flex from '../shared/Flex'
import { Area, Distance } from './styled/MeasureStyle'
import { DistanceBtn } from './DistanceBtn'
import { AreaBtn } from './AreaBtn'
import Ruler from '../../public/images/Ruler.png'
import area_cursor from '../../public/images/area_cursor.png'

interface ToolsBtnProps {
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

interface Coord {
  lat: number
  lng: number
}

const createMarkerContent = (
  mode: string,
  text: string | number,
  isMoving: boolean = false,
  pyeong?: number | string,
  isDistance?: boolean,
) => `
  <div style="display: flex; flex-direction: column; min-width: 160px; padding: 11px 8px; align-items: flex-start; align-content: flex-start; gap: 14px 2px; flex-wrap: wrap; border-radius: 8px; border: 1px solid #9D9999; background: #FFF;">
  <div style="width: 100%;">
    <div style="display: flex; width: 100%; justify-content: space-between; padding: 5.5px 0;">
      <div>
        <span style="color: #000; font-family: SUIT; font-size: 15px; font-style: normal; font-weight: 700; line-height: 100%; letter-spacing: -0.15px;">${
          isMoving
            ? mode === 'distance'
              ? '거리'
              : '총 면적'
            : mode === 'distance'
              ? '총 거리'
              : '총 면적'
        }</span>
      </div>
      <div>
        <span style="color: #0038FF; text-align: right; font-family: SUIT; font-size: 15px; font-style: normal; font-weight: 700; line-height: 100%; letter-spacing: -0.15px;">${text}</span>
      </div>
    </div>
    ${
      mode === 'area' && pyeong
        ? `<div style="width: 100%; margin-top: 1px; font-family: SUIT; font-size: 15px; font-style: normal; font-weight: 700; color: #545454; display: flex; justify-content: flex-end;">(${pyeong})</div>`
        : ''
    }
  </div>
  ${
    isMoving && mode === 'distance'
      ? ''
      : `<div style="width: 144px; height: 30px; margin: 0 auto; flex-shrink: 0; border-radius: 100px; border: 1px solid #9D9999; background: #FFF; display: flex; justify-content: center; align-items: center;">
      <span style="color: #545454; font-family: SUIT; font-size: 13px; font-style: normal; font-weight: 500; line-height: 100%; letter-spacing: -0.13px;">${
        isMoving || isDistance ? '마우스 오른쪽 버튼 종료' : '지우기'
      }</span>
    </div>`
  }
    
  </div>
`

export const Measure = ({
  clickedMapType,
  setClickedMapType,
}: ToolsBtnProps) => {
  const { data: map }: UseQueryResult<NaverMap | any> = useQuery({
    queryKey: queryKey,
    enabled: false,
  })
  const [mode, setMode] = useState('')
  const [polyline, setPolyline] = useState<naver.maps.Polyline | null>(null)
  const [guideline, setGuideline] = useState<naver.maps.Polyline | null>(null)
  const [markers, setMarkers] = useState<naver.maps.Marker[]>([])
  const [polygon, setPolygon] = useState<naver.maps.Polygon | null>(null)
  const [startPoint, setStartPoint] = useState<naver.maps.LatLng | null>(null)
  const [distanceCircleMarkers, setDistanceCircleMarkers] = useState<
    naver.maps.Marker[]
  >([])
  const [areaCircleMarkers, setAreaCircleMarkers] = useState<
    naver.maps.Marker[]
  >([])
  const isPyeong = useRecoilValue(isPyeongState)
  const [isCurrentState, setIsCurrentState] = useRecoilState(isCurrentStateAtom)

  const fromMetersToText = useCallback((meters: number) => {
    meters = meters || 0
    const km = 1000
    let text: string

    const formatNumber = (num: number) => {
      return num.toLocaleString()
    }

    if (meters >= km) {
      const kmValue = meters / km
      text = `${formatNumber(
        parseFloat(kmValue.toFixed(1)),
      )}<span style="color: #000001"> km</span>`
    } else {
      text = `${formatNumber(
        parseFloat(meters.toFixed(1)),
      )}<span style="color: #000001"> m</span>`
    }

    return text
  }, [])

  const handleDelete = useCallback(() => {
    if (mode === 'distance') {
      if (polyline) polyline.setMap(null)
      if (guideline) guideline.setMap(null)
      distanceCircleMarkers.forEach((marker) => marker.setMap(null))
      setDistanceCircleMarkers([])
      setPolyline(null)
      setGuideline(null)
    } else if (mode === 'area') {
      if (polygon) polygon.setMap(null)
      areaCircleMarkers.forEach((marker) => marker.setMap(null))
      setAreaCircleMarkers([])
      setPolygon(null)
    }

    markers.forEach((marker) => marker.setMap(null))
    setMarkers([])

    setClickedMapType((prev) => ({
      ...prev,
      distance: false,
      area: false,
    }))
    setMode('')
  }, [
    mode,
    polyline,
    guideline,
    polygon,
    distanceCircleMarkers,
    areaCircleMarkers,
    markers,
    setClickedMapType,
  ])

  const addBlueCircleMarkers = (
    path: naver.maps.LatLng[],
    map: naver.maps.Map,
    type: 'distance' | 'area',
  ) => {
    const marker = new naver.maps.Marker({
      position: path[path.length - 1],
      map: map,
      icon: {
        content: `<div style="width: 11px; height: 11px; background-color: #fff; border-radius: 50%; border: 2px solid #0038FF;"></div>`,
        anchor: new naver.maps.Point(6, 6),
      },
      clickable: false,
    })

    if (mode === 'distance') {
      setDistanceCircleMarkers((prev) => [...prev, marker])
    } else if (mode === 'area') {
      setAreaCircleMarkers((prev) => [...prev, marker])
    }
  }

  const addMileStoneMarker = useCallback(
    (
      coord: Coord,
      text: string | number,
      isMoving: boolean = false,
      isFinal: boolean = false,
      isDistance?: boolean,
      pyeong?: number | string,
    ) => {
      const marker = new naver.maps.Marker({
        position: coord,
        map: map,
        icon: {
          content: createMarkerContent(
            mode,
            text,
            isMoving,
            pyeong,
            isDistance,
          ),
          anchor: new naver.maps.Point(-5, -5),
        },
      })

      if (isFinal) {
        marker.addListener('click', () => {
          marker.setMap(null)
          handleDelete()
        })
      }

      marker.setZIndex(101)

      setMarkers((prev) => {
        return [...(prev ?? []), marker]
      })
    },
    [map, handleDelete, mode],
  )

  // 거리재기 클릭 이벤트
  const onClickDistance = useCallback(
    (e: { coord: naver.maps.Point }) => {
      if (!map) return
      if (clickedMapType.distance === false) {
        handleDelete()
        return
      }
      const coord = new naver.maps.LatLng(e.coord.y, e.coord.x)
      setStartPoint(coord)
      if (!polyline) {
        const newGuideline = new naver.maps.Polyline({
          strokeColor: '#0038FF',
          strokeWeight: 2,
          strokeStyle: 'shortdash',
          strokeOpacity: 0.65,
          path: [coord],
          map: map,
          strokeLineCap: 'round',
        })
        setGuideline(newGuideline)
        const newPolyline = new naver.maps.Polyline({
          strokeColor: '#0038FF',
          strokeWeight: 2,
          strokeOpacity: 0.8,
          path: [coord],
          map: map,
        })
        setPolyline(newPolyline)
        addBlueCircleMarkers([coord], map, 'distance')
      } else {
        addBlueCircleMarkers([coord], map, 'distance')
        guideline?.setPath([coord])
        polyline?.getPath()?.push(coord)
        const distance = polyline.getDistance()
        addMileStoneMarker(
          { lat: coord.lat(), lng: coord.lng() },
          fromMetersToText(distance),
          false,
          false,
          true,
        )
      }
    },
    [
      guideline,
      polyline,
      map,
      clickedMapType.distance,
      addMileStoneMarker,
      fromMetersToText,
    ],
  )

  // 거리재기 종료 이벤트
  const finishDistance = useCallback(() => {
    if (guideline) {
      guideline.setMap(null)
      setGuideline(null)
    }
    if (polyline) {
      const path = polyline.getPath() as any
      if (path && path.length <= 1) {
        distanceCircleMarkers?.forEach((marker) => marker.setMap(null))
        setDistanceCircleMarkers([])
      }
      if (path && path.length > 0) {
        const lastCoord = path._array[path.length - 1]
        const distance = polyline.getDistance()
        setPolyline(null)
        if (lastCoord) {
          const coord: Coord = {
            lat: lastCoord.y,
            lng: lastCoord.x,
          }

          if (path.length > 1) {
            addMileStoneMarker(coord, fromMetersToText(distance), false, true)
          }
        }
      }
    }
    markers.forEach((marker) => {
      marker.setMap(null)
    })

    setMarkers([])
    setMode('')
    map?.setOptions({
      draggable: true,
    })
    map?.setOptions({ cursor: 'auto' })
    setClickedMapType((prev) => ({
      ...prev,
      distance: false,
    }))
  }, [
    guideline,
    polyline,
    map,
    fromMetersToText,
    addMileStoneMarker,
    setClickedMapType,
    markers,
  ])

  // 면적재기 클릭 이벤트
  const onClickArea = useCallback(
    (e: any) => {
      if (!map) return
      if (clickedMapType.area === false) {
        handleDelete()
        return
      }
      const coord = e.coord

      if (!polygon) {
        const newPolygon = new naver.maps.Polygon({
          strokeColor: '#00f',
          strokeOpacity: 0.6,
          strokeWeight: 2,
          fillColor: '#00f',
          fillOpacity: 0.2,
          paths: [coord],
          map: map,
        })
        setPolygon(newPolygon)
        addBlueCircleMarkers([coord], map, 'area')
      } else {
        addBlueCircleMarkers([coord], map, 'area')
        polygon.getPath().push(coord)
      }
    },
    [map, clickedMapType.area, polygon],
  )

  // 면적재기 종료 이벤트
  const finishArea = useCallback(() => {
    if (polygon) {
      const path = polygon.getPath() as any
      path.pop()

      const squareMeter = polygon.getAreaSize()
      const lastCoord = path._array[path.length - 1]
      const area = fromSquareMetersToText(squareMeter)[0]
      const pyeong = fromSquareMetersToText(squareMeter)[1]
      if (lastCoord && path.length > 2) {
        addMileStoneMarker(lastCoord, area, false, true, false, pyeong)
      } else {
        areaCircleMarkers?.forEach((marker) => marker.setMap(null))
        setAreaCircleMarkers([])
        polygon.setMap(null)
        setPolygon(null)
      }
    }

    markers.forEach((marker) => {
      marker.setMap(null)
    })
    setMarkers([])
    setPolygon(null)
    setMode('')
    map?.setOptions({
      draggable: true,
    })
    map?.setOptions({ cursor: 'auto' })
    setClickedMapType((prev) => ({
      ...prev,
      area: false,
    }))
  }, [
    polygon,
    addMileStoneMarker,
    fromSquareMetersToText,
    map,
    setClickedMapType,
    markers,
  ])

  // 무빙 마커 생성
  const createMovingMarker = useCallback(
    (coord: naver.maps.Point, content: string) => {
      return new naver.maps.Marker({
        position: coord,
        map: map,
        icon: {
          content,
          anchor: new naver.maps.Point(-5, -5),
        },
        zIndex: 100,
      })
    },
    [map],
  )

  // 거리, 면적 마우스 무빙 이벤트
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!map) return

      const proj = map.getProjection() as any
      const coord = proj.fromPageXYToCoord(
        new naver.maps.Point(e.pageX, e.pageY),
      ) as naver.maps.Point

      if (mode === 'distance' && guideline) {
        const path = guideline.getPath() as naver.maps.Point[]
        if (path.length === 2) path.pop()
        path.push(coord)
        guideline.setPath(path)

        const ps = (map as any)
          .getPrimitiveProjection()
          .getDistance(startPoint, coord)
        const content = createMarkerContent(
          'distance',
          fromMetersToText(ps),
          true,
        )
        const divMarker = createMovingMarker(coord, content)

        setMarkers((prev) => {
          prev?.forEach((marker) => marker.setMap(null))
          return [divMarker]
        })
      } else if (mode === 'area' && polygon) {
        const path = polygon.getPath() as naver.maps.Point[]

        if (path.length >= 2) {
          path.pop()
        }
        path.push(coord)
        const area = polygon.getAreaSize()
        const [text, pyeong] = fromSquareMetersToText(area)
        const content = createMarkerContent('area', text, true, pyeong)
        if (path.length >= 3) {
          const divMarker = createMovingMarker(coord, content)
          setMarkers((prev) => {
            prev?.forEach((marker) => marker.setMap(null))
            return [divMarker]
          })
        }
      }
    },
    [
      map,
      mode,
      guideline,
      polyline,
      polygon,
      startPoint,
      fromMetersToText,
      fromSquareMetersToText,
    ],
  )

  const handleButtonClick = useCallback(
    (value: 'distance' | 'area') => {
      setClickedMapType((prev) => {
        const isCurrentMode = value === mode
        return {
          ...prev,
          distance: isCurrentMode ? false : value === 'distance',
          area: isCurrentMode ? false : value === 'area',
        }
      })

      if (value === 'distance') {
        polyline?.setMap(null)
        guideline?.setMap(null)
        setPolyline(null)
        setGuideline(null)
        setDistanceCircleMarkers([])
      } else if (value === 'area') {
        polygon?.setMap(null)
        setPolygon(null)
        setAreaCircleMarkers([])
      }

      if (mode === 'distance') {
        distanceCircleMarkers?.forEach((marker) => marker.setMap(null))
      } else if (mode === 'area') {
        areaCircleMarkers?.forEach((marker) => marker.setMap(null))
      }

      markers?.forEach((marker) => marker.setMap(null))
      setMarkers([])

      setMode((prevMode) => (prevMode === value ? '' : value))
    },
    [
      mode,
      polyline,
      guideline,
      polygon,
      markers,
      distanceCircleMarkers,
      areaCircleMarkers,
    ],
  )

  useEffect(() => {
    if (!map) return

    const isDistanceMode = mode === 'distance' && clickedMapType.distance
    const isAreaMode = mode === 'area' && clickedMapType.area

    if (isDistanceMode || isAreaMode) {
      ;(map as any).setCursor(
        `url(/images/${isDistanceMode ? 'Ruler' : 'area_cursor'}.png), auto`,
      )
      document.addEventListener('mousemove', onMouseMove)
      return () => document.removeEventListener('mousemove', onMouseMove)
    } else {
      ;(map as any).setCursor('auto')
    }
  }, [map, mode, clickedMapType.distance, clickedMapType.area, onMouseMove])

  useEffect(() => {
    markers?.forEach((marker) => marker.setMap(null))
    polygon?.setMap(null)
    polyline?.setMap(null)
    guideline?.setMap(null)

    setPolyline(null)
    setGuideline(null)
    setPolygon(null)
    setMarkers([])
    if (mode === 'distance') {
      distanceCircleMarkers?.forEach((marker) => marker.setMap(null))
      setDistanceCircleMarkers([])
    } else if (mode === 'area') {
      areaCircleMarkers?.forEach((marker) => marker.setMap(null))
      setAreaCircleMarkers([])
    }
  }, [mode, clickedMapType, map, isPyeong, isCurrentState])

  const mapClickEvent =
    mode === 'distance'
      ? onClickDistance
      : mode === 'area'
        ? onClickArea
        : () => {}

  const mapFinishEvent =
    mode === 'distance'
      ? finishDistance
      : mode === 'area'
        ? finishArea
        : () => {}

  useMapListeners(map, mapClickEvent, onMouseMove, mapFinishEvent)

  return (
    <Flex css={ContainerStyle}>
      <Distance
        id="distance"
        mode={mode === 'distance' && clickedMapType.distance ? 'distance' : ''}
        onClick={() => handleButtonClick('distance')}
      >
        <DistanceBtn mode={mode} clickedMapType={clickedMapType} />
      </Distance>
      <Area
        area={mode === 'area' && clickedMapType.area}
        id="area"
        onClick={() => handleButtonClick('area')}
      >
        <AreaBtn mode={mode} clickedMapType={clickedMapType} />
      </Area>
    </Flex>
  )
}
const ContainerStyle = css`
  display: flex;
  width: 44px;
  height: 89px;
  flex-direction: column;
  align-items: center;
  border-radius: 4px 4px 4px 4px;
  border: 0.5px solid #000001;
  background: #fbfbfb;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
`
