import { useCallback, useEffect, useMemo } from 'react'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { NaverMap } from '@/models/Map'
import { queryKey } from '../../sections/hooks/useMap'

interface ClusteringProps {
  item: {
    sd: string
    sgg: string
    umd: string
    count?: number
    x: number
    y: number
  }
}

export default function Clustering({ item }: ClusteringProps) {
  const { data: map }: UseQueryResult<NaverMap> = useQuery({
    queryKey: queryKey,
    enabled: false,
  })

  const placeName = useMemo(() => {
    if (!map) return ''

    const zoomLevel = map?.getZoom()
    if (zoomLevel >= 13) return item.umd
    if (zoomLevel > 10 && zoomLevel < 13) {
      return item.sgg.replace(
        /^((창원시)|(고양시)|(성남시)|(용인시)|(안양시)|(안산시)|(수원시)|(천안시)|(청주시)|(전주시)|(포항시)|(부천시))\s*/,
        '',
      )
    }
    return item.sd
  }, [map, item])

  const addCommas = useCallback((num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }, [])

  const markerContent = useMemo(() => {
    return `
      <div style="display: flex; width: 80px; height: 50px; justify-content: center; align-items: center; flex-direction: column;">
        <div style="display: flex; width: 100%; height: 25px; background: #332EFC; justify-content: center; align-items: center; border-radius: 12px 12px 0px 0px; border-left: 1px solid #332EFC; border-top: 1px solid #332EFC; border-right: 1px solid #332EFC;">
          <span style="font-size: 12px; text-align: center; color: white; font-family: SUIT; font-style: normal; font-weight: 600; line-height: 100%; letter-spacing: -0.24px;">
            ${placeName}
          </span>
        </div>
        <div style="display: flex; width: 100%; height: 50%; background: #fff; justify-content: center; align-items: center; border-radius: 0px 0px 12px 12px; border-left: 1px solid #332EFC; border-bottom: 1px solid #332EFC; border-right: 1px solid #332EFC;">
          <span style="font-size: 16px; color: black; text-align: center; font-family: SUIT; font-style: normal; font-weight: 600; line-height: 100%; letter-spacing: -0.24px;">
            ${addCommas(item.count || 0)}
          </span>
        </div>
      </div>
    `
  }, [placeName, item.count])

  const handleMarkerClick = useCallback(() => {
    if (map) {
      map.setCenter(new naver.maps.LatLng(item.y, item.x))
      map.setZoom(map?.getZoom() + 1, true)
    }
  }, [map, item.x, item.y])

  useEffect(() => {
    if (!map) return

    const marker = new naver.maps.Marker({
      map: map,
      position: new naver.maps.LatLng(item.y, item.x),
      icon: {
        content: markerContent,
        anchor: new naver.maps.Point(12, 12),
      },
    })

    naver.maps.Event.addListener(marker, 'click', handleMarkerClick)
    naver.maps.Event?.addListener(marker, 'mouseover', () => {
      marker.setZIndex(110)
    })
    naver.maps.Event?.addListener(marker, 'mouseout', () => {
      marker.setZIndex(0)
    })
    return () => {
      marker.setMap(null)
    }
  }, [map, item.y, item.x, markerContent, handleMarkerClick])

  return null
}
