/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
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
  useEffect,
  useRef,
  useState,
} from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import useGeoCode from './hooks/useGeoCode'
import useMapCounts from '../sideMenu/searchListBox/listBox/hooks/useMapCounts'
import postXY from '@/remote/map/auth/postXY'
import getPolypath from '@/remote/map/selected/getPolypath'

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

  //  Refs
  const panoRef = useRef<naver.maps.Panorama | null>(null)
  const mapRef = useRef<NaverMap | null>(null)
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

  const closePanorama = () => {
    setIsPanoVisible(false)
    if (markerRef.current) {
      markerRef.current.setMap(null)
    }
  }

  useEffect(() => {
    if (!mapRef.current) return

    if (!markerRef.current) {
      markerRef.current = new window.naver.maps.Marker({
        icon: {
          url: '/images/roadView/rvicon1.png',
          size: new naver.maps.Size(50, 50),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(25, 35),
        },
        position: new window.naver.maps.LatLng(0, 0),
      })
    }

    if (isPanoVisible) {
      markerRef.current?.setPosition(clickedLatLng)
      const resizeAndCenterMap = () => {
        mapRef.current?.setSize(new window.naver.maps.Size(350, 350))
        markerRef.current?.setMap(mapRef.current)
        setTimeout(() => {
          mapRef.current?.setCenter(clickedLatLng)
          updatePanoPosition()
          updateMarkerIcon()
        }, 100)
      }
      resizeAndCenterMap()

      const updateMarkerIcon = () => {
        const panValue = calculatePanoPan(
          panoRef.current?.getPov().pan as number,
        )
        markerRef.current?.setIcon({
          url: `/images/roadView/rvicon${getMarkerIconNumber(
            panValue,
            16,
          )}.png`,
          size: new naver.maps.Size(50, 50),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(25, 35),
        })
      }

      const updatePanoLocation = () => {
        const latlng = panoRef.current?.getPosition()
        if (!latlng?.equals(mapRef.current?.getCenter() as naver.maps.Coord)) {
          mapRef.current?.setCenter(latlng as naver.maps.LatLng)
          markerRef.current?.setPosition(latlng as naver.maps.LatLng)
        }
      }

      const updatePanoPosition = () => {
        const center = mapRef.current?.getCenter()
        const proj = panoRef.current?.getProjection()
        const lookAtPov = proj?.fromCoordToPov(center as naver.maps.LatLng)
        if (lookAtPov) {
          lookAtPov.tilt = 0
          lookAtPov.fov = 100
          panoRef.current?.setPov(lookAtPov)
        }
      }

      const clickListener = window.naver.maps.Event.addListener(
        mapRef.current,
        'click',
        (e: any) => {
          const latlng = e.coord as naver.maps.Coord
          mapRef.current?.setCenter(latlng)
          panoRef.current?.setPosition(latlng)
        },
      )
      const positionChangedListener = window.naver.maps.Event.addListener(
        panoRef.current,
        'position_changed',
        updatePanoLocation,
      )

      const povChangedListener = window.naver.maps.Event.addListener(
        panoRef.current,
        'pov_changed',
        updateMarkerIcon,
      )

      const panoIdChangedListener = window.naver.maps.Event.addListener(
        panoRef.current,
        'pano_changed',
        () => {
          updatePanoLocation()
          updateMarkerIcon()
        },
      )

      return () => {
        window.naver.maps.Event.removeListener(clickListener)
        window.naver.maps.Event.removeListener(positionChangedListener)
        window.naver.maps.Event.removeListener(povChangedListener)
        window.naver.maps.Event.removeListener(panoIdChangedListener)
      }
    } else {
      markerRef.current?.setMap(null)
      const fullWidth = window.innerWidth
      const fullHeight = window.innerHeight
      mapRef.current?.setSize(new window.naver.maps.Size(fullWidth, fullHeight))
    }
  }, [isPanoVisible, clickedLatLng])
  const handleLastXY = async () => {
    if (!mapRef.current || auth.id !== '') return
    const center = mapRef.current.getCenter()
    await postXY(center.x, center.y)
  }

  useEffect(() => {
    const updateHalfDimensions = () => {
      const exceptFilterBox = window.innerWidth - 370
      setHalfDimensions({
        width: exceptFilterBox / 2 + 370,
        height: window.innerHeight / 2,
      })
    }
    if (typeof window !== 'undefined') {
      updateHalfDimensions()
      window.addEventListener('resize', updateHalfDimensions)
      return () => window.removeEventListener('resize', updateHalfDimensions)
    }
  }, [setHalfDimensions])

  useEffect(() => {
    if (!mapRef.current) return

    if (mapRef.current.getZoom() < 15) {
      getMapCounts()
    }
  }, [
    formData.egg,
    formData.ekm,
    formData.egm,
    formData.gm,
    formData.gg,
    formData.km,
    formData.kw,
    formData.awardedMonths,
    formData.interests,
    formData.fromMinimumAmount,
    formData.fromAppraisalAmount,
    formData.toMinimumAmount,
    formData.toAppraisalAmount,
    formData.ids,
    formData.interests,
  ])

  const useUnload = (func: () => void) => {
    const cb = useRef(func)
    useEffect(() => {
      cb.current = func
    }, [func])
    useEffect(() => {
      const handleBeforeUnload = () => {
        cb.current()
      }

      window.addEventListener('beforeunload', () => {
        handleBeforeUnload()
      })

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload)
      }
    }, [])
  }
  useUnload(() => {
    handleLastXY()
  })
  useEffect(() => {
    return () => {
      mapRef.current?.destroy()
    }
  }, [])

  useEffect(() => {
    if (auth.address && !auth.id) {
      handleGeoCode()
    } else if (!auth.address && auth.id) {
      mapRef.current?.setCenter({ lat: auth.lat, lng: auth.lng })
    }
  }, [auth.address, auth.id, auth.lat, auth.lng, setAuth])

  useEffect(() => {
    if (zoomLevel && zoomLevel >= 15) {
      setMapCount && setMapCount([])
    } else if (mapRef?.current?.getZoom()! < 15) {
      debouncedMapCounts()
      setMapItems([])
    }
  }, [
    getMapCounts,
    setMapCount,
    zoomLevel,
    setMapItems,
    formData.x1,
    formData.y1,
    formData.x2,
    formData.y2,
  ])

  useEffect(() => {
    const updatePolyPath = async () => {
      if (!auth.detailLat || !auth.detailLng || !auth.id || !mapRef.current)
        return
      try {
        const response = await getPolypath(
          auth.detailLat as number,
          auth.detailLng as number,
        )
        if (response.length > 0 && auth.id) {
          const polylineOptions = {
            map: mapRef.current,
            fillColor: '#ff0000',
            fillOpacity: 0.3,
            strokeColor: '#ff0000',
            strokeOpacity: 0.6,
            strokeWeight: 3,
            path: response.map(
              (item: number[][]) =>
                new window.naver.maps.LatLng(item[0][1], item[0][0]),
            ),
          }
          new window.naver.maps.Polyline(polylineOptions)
          mapRef.current.setCenter({
            lat: auth.detailLat,
            lng: auth.detailLng,
          })
          mapRef.current.setZoom(19)
        }
      } catch (error) {
        console.error(error)
      }
    }
    updatePolyPath()
  }, [auth.detailLat, auth.detailLng, auth.id])
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
        onClick={() => {
          if (markerClickedRef.current) {
            setOpenOverlay(false)
            markerClickedRef.current = false
            setClickedItem(null)
          } else if (clickedItem) {
            setOpenOverlay(true)
            markerClickedRef.current = true
          }
          if (openCursor) setOpenCursor(false)
        }}
      />
      <div
        id="pano"
        style={{
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          zIndex: 20,
          top: '0',
          display: isPanoVisible ? 'block' : 'none',
        }}
      />
      {/* {isPanoVisible && (
        <div
          style={{
            position: 'fixed',
            zIndex: 100,
            top: '50px',
            right: '50px',
            display: 'flex',
            cursor: 'pointer',
          }}
          onClick={closePanorama}
        >
          <CloseButton />
        </div>
      )}
      <MapType
        clickedMapType={clickedMapType}
        setClickedMapType={setClickedMapType}
        setOpenOverlay={setOpenOverlay}
      />
      <MapFunction
        clickedMapType={clickedMapType}
        setClickedMapType={setClickedMapType}
        setOpenOverlay={setOpenOverlay}
      /> */}
    </>
  )
}
