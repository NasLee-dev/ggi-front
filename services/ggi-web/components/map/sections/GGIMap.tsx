/* eslint-disable @typescript-eslint/no-unused-vars */
import useDebounce from '@/hooks/useDebounce'
import { NaverMap } from '@/models/Map'
import { MapCountsResponse } from '@/models/MapItem'
import { authInfo } from '@/store/atom/auth'
import {
  clickedItemAtom,
  formDataAtom,
  isPanoramaVisibleAtom,
  listOverItemAtom,
  mapItemsAtom,
} from '@/store/atom/map'
import Script from 'next/script'
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import useGeoCode from './hooks/useGeoCode'
import useMapCounts from '../sideMenu/searchListBox/listBox/hooks/useMapCounts'

type MapType = {
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

interface GGIMapProps {
  onLoad: (map: NaverMap) => void
  zoom: number
  clickedMapType: MapType
  setMapCount: Dispatch<SetStateAction<MapCountsResponse[]>>
  markerClickedRef: MutableRefObject<boolean>
  setOpenOverlay: Dispatch<SetStateAction<boolean>>
  setClickedMapType: Dispatch<SetStateAction<MapType>>
  setHalfDimensions: Dispatch<SetStateAction<{ width: number; height: number }>>
  dragStateRef: MutableRefObject<boolean>
  openCursor: boolean
  setOpenCursor: Dispatch<SetStateAction<boolean>>
  mapId?: string
}

export default function GGIMap({
  onLoad,
  zoom,
  clickedMapType,
  setMapCount,
  markerClickedRef,
  setOpenOverlay,
  setClickedMapType,
  setHalfDimensions,
  dragStateRef,
  openCursor,
  setOpenCursor,
  mapId = 'map',
}: GGIMapProps) {
  const [auth, setAuth] = useRecoilState(authInfo)
  const mapRef = useRef<NaverMap | null>(null)
  const [formData, setFormData] = useRecoilState(formDataAtom)
  const [isPanoVisible, setIsPanoVisible] = useRecoilState(
    isPanoramaVisibleAtom,
  )
  const [clickedMarker, setClickedMarker] = useState<naver.maps.Marker | null>(
    null,
  )
  const [clickedLatLng, setClickedLatLng] = useState({
    lat: 0,
    lng: 0,
  })
  const [clickedItem, setClickedItem] = useRecoilState(clickedItemAtom)
  const panoRef = useRef<naver.maps.Panorama | null>(null)
  const markerRef = useRef<naver.maps.Marker | null>(null)
  //  Custom hooks
  const { mutate: getMapCounts } = useMapCounts(
    formData,
    setMapCount as Dispatch<SetStateAction<MapCountsResponse[]>>,
  )
  const { handleGeoCode } = useGeoCode(auth.address, mapRef.current)
  const debouncedMapCounts = useDebounce(getMapCounts, 250)
  const setMapItems = useSetRecoilState(mapItemsAtom)
  const setListOver = useSetRecoilState(listOverItemAtom)

  //  Utility Functions
  const calculatePanoPan = (angle: number) => ((angle % 360) + 360) % 360
  const getMarkerIconNumber = (radius: number, divider: number) => {
    const delta = 360 / (divider || 1)
    return (Math.round(radius / delta) % divider) + 1
  }
  const zoomLevel = mapRef.current?.getZoom() ?? null

  const updateFormDataBounds = useCallback(() => {
    if (
      !mapRef.current ||
      auth.role.includes('ROLE_ANONYMOUS') ||
      auth.role.includes('ROLE_FREE')
    )
      return
    const bounds =
      mapRef.current.getBounds() as unknown as naver.maps.LatLngBounds
    const sw = bounds.getSW()
    const ne = bounds.getNE()
    setFormData((prev) => ({
      ...prev,
      x1: sw.lng(),
      y1: sw.lat(),
      x2: ne.lng(),
      y2: ne.lat(),
    }))
  }, [setFormData])

  const initializeMap: () => void = useCallback(() => {
    if (!window.naver?.maps) return
    const mapOptions = {
      center: { lat: auth.lat, lng: auth.lng },
      zoom: zoom ?? 17,
      minZoom: 9,
      draggable: true,
      maxBounds: new window.naver.maps.LatLngBounds(
        new window.naver.maps.LatLng(33.1, 126.16),
        new window.naver.maps.LatLng(38.614, 130.873),
      ),
      scaleControl: true,
      logoControl: true,
    }

    const map = new window.naver.maps.Map(mapId, mapOptions)
    mapRef.current = map

    map.setCenter({
      lat: auth.lat,
      lng: auth.lng,
    })

    const listeners = [
      window.naver.maps.Event?.addListener(
        map,
        'zoom_changed',
        updateFormDataBounds,
      ),
      window.naver.maps.Event?.addListener(map, 'init', updateFormDataBounds),
      window.naver.maps.Event?.addListener(map, 'idle', updateFormDataBounds),
      window.naver.maps.Event?.addListener(map, 'dragstart', () => {
        setOpenOverlay(false)
        dragStateRef.current = true
      }),
      window.naver.maps.Event?.addListener(map, 'dragend', () => {
        dragStateRef.current = false
        setListOver((prev) => ({
          ...prev,
          isOver: false,
        }))
        updateFormDataBounds()
      }),
      window.naver.maps.Event?.addListener(map, 'click', (e: any) => {
        const latlng = e.coord
        if ((map as any).streetLayer) {
          setClickedLatLng({
            lat: latlng._lat,
            lng: latlng._lng,
          })
          if (clickedMarker) {
            clickedMarker.setMap(null)
          }
          setIsPanoVisible(true)
          panoRef.current = new window.naver.maps.Panorama('pano', {
            position: new window.naver.maps.LatLng(latlng._lat, latlng._lng),
            pov: {
              pan: 0,
              tilt: 0,
              fov: 100,
            },
          })
        }
      }),
    ]
    if (onLoad) onLoad(map)
    return () => {
      listeners.forEach((listener) =>
        window.naver.maps.Event.removeListener(listener),
      )
    }
  }, [
    zoom,
    mapId,
    onLoad,
    updateFormDataBounds,
    dragStateRef,
    clickedMarker,
    setIsPanoVisible,
    setOpenOverlay,
    isPanoVisible,
  ])
  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_API}&submodules=geocoder,panorama`}
        onReady={initializeMap}
      />
      <div
        id="map"
        style={{
          width: '100vw',
          height: '100vh',
          position: isPanoVisible ? 'fixed' : 'absolute',
          zIndex: isPanoVisible ? 1000 : 0,
          right: isPanoVisible ? '0' : '0',
          bottom: isPanoVisible ? '0' : '0',
        }}
      />
    </>
  )
}
