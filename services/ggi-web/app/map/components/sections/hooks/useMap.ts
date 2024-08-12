/* eslint-disable @typescript-eslint/no-unused-vars */
import { Coordinates, NaverMap } from '@/models/Map'
import { useCallback } from 'react'
import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { fetchMapData } from 'utils/map/fetchMapData'

export const INITIAL_CENTER: Coordinates = [37.497013, 127.0114263]
export const INITIAL_ZOOM = 16

const MAP_KEY = '/map'
export const queryKey = [MAP_KEY]

const useMap = () => {
  const { data: map }: UseQueryResult<NaverMap> = useQuery({
    queryKey: queryKey,
    queryFn: fetchMapData,
    enabled: false,
  })
  const queryClient = useQueryClient()
  const initMap = useCallback((map: NaverMap) => {
    return queryClient.setQueryData<NaverMap>(queryKey, map)
  }, [])

  const resetMapOptions = useCallback(() => {
    map?.morph(new naver.maps.LatLng(...INITIAL_CENTER), INITIAL_ZOOM)
  }, [map])

  return {
    resetMapOptions,
    initMap,
  }
}

export default useMap
