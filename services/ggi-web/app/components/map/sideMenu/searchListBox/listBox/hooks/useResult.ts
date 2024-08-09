import { authInfo } from '@/store/atom/auth'
import {
  isOnlySelectedAtom,
  jusoAtom,
  mapListAtom,
  pageAtom,
  selectedItemAtom,
} from '@/store/atom/map'
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  SetterOrUpdater,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'
import { InfiniteData, UseQueryResult, useQuery } from '@tanstack/react-query'
import { NaverMap } from '@/models/Map'
import { queryKey } from 'app/components/map/sections/hooks/useMap'
import { MapListResponse } from '@/models/ListItem'
import { useReverseGeoCode } from './useReverseGeoCode'
import useSearchListQuery from './useSearchListQuery'

const useResult = (
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  dragStateRef: MutableRefObject<boolean>,
) => {
  const { data: map }: UseQueryResult<NaverMap> = useQuery({
    queryKey: queryKey,
    enabled: false
  })
  const [mapListItems, setMapListItems] = useRecoilState(mapListAtom)
  const [showingList, setShowingList] = useState(false)
  const scrollbarRef = useRef<HTMLDivElement | null>(null)
  const setJuso = useSetRecoilState(jusoAtom)
  const auth = useRecoilValue(authInfo)
  const selectedItem = useRecoilValue(selectedItemAtom)
  const isOnlySelected = useRecoilValue(isOnlySelectedAtom)
  const setPage = useSetRecoilState(pageAtom)
  const { performReverseGeocode } = useReverseGeoCode()
  const handleCenterChanged = useCallback(() => {
    if (!map) return
    const mapCenter: naver.maps.Point = map.getCenter()
    const centerCoords = { lat: mapCenter.y, lng: mapCenter.x }
    performReverseGeocode(centerCoords)
  }, [map, setJuso, performReverseGeocode])

  const { data, fetchNextPage, hasNextPage, isLoading } = useSearchListQuery({
    handleCenterChanged,
    dragStateRef,
  })

  const scrollToTop = useCallback(() => {
    if (!scrollbarRef.current) return
    scrollbarRef.current?.scrollTo(0, 0)
  }, [scrollbarRef.current])

  useEffect(() => {
    if (map && map.getZoom()! >= 15) {
      setShowingList(true)
      setPage(1)
    } else if (map && map.getZoom()! < 15) {
      setShowingList(false)
      setIsOpen(true)
    }
  }, [map, map?.getZoom(), setPage, setIsOpen])

  useEffect(() => {
    handleUpdateMapList(data as any, setMapListItems, scrollToTop)
  }, [data, setMapListItems])

  const handleReturnSelectedItems = useCallback(() => {
    if (auth.type === '1') {
      return selectedItem?.kmItem
    } else if (auth.type === '2' || auth.type === '3') {
      return selectedItem?.gmItem
    } else if (auth.type === '4') {
      return selectedItem?.kwItem
    }
  }, [auth.type, selectedItem])

  const handleReturnPageInfo = useCallback(() => {
    let pageInfo = 0
    if (auth.id !== '') {
      if (isOnlySelected) {
        pageInfo = 1
        return pageInfo
      } else {
        pageInfo = mapListItems?.paging?.totalElements + 1
        return pageInfo
      }
    } else {
      pageInfo = mapListItems?.paging?.totalElements
      return pageInfo
    }
  }, [auth.id, isOnlySelected, mapListItems])

  return {
    isShowingList: showingList,
    mapListItems,
    scrollbarRef,
    handleReturnSelectedItems,
    handleReturnPageInfo,
    isLoading,
    fetchNextPage,
    hasNextPage,
    setIsOpen,
    scrollToTop,
    isOnlySelected,
    auth,
  }
}

const handleUpdateMapList = (
  data: InfiniteData<MapListResponse | undefined> | undefined,
  setMapListItems: SetterOrUpdater<MapListResponse>,
  scrollToTop: () => void,
) => {
  if (data?.pageParams[0] === undefined && data?.pages[0] === undefined) return
  if (data.pageParams.length === 1) {
    scrollToTop()
    setMapListItems((prev: any) => ({
      ...prev,
      contents: data.pages[0]?.contents,
      paging: data.pages[0]?.paging,
    }))
  } else if (data.pageParams.length > 1) {
    setMapListItems((prev) => ({
      ...prev,
      contents: [
        ...(prev?.contents ?? []),
        ...((data && data?.pages[data.pages.length - 1]?.contents) ?? []),
      ],
    }))
  }
}

export default useResult
