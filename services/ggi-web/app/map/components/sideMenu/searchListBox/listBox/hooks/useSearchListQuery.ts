import { MapItems } from '@/models/map/MapItem'
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  UseQueryResult,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'
import { formDataAtom } from '@/store/atom/map'
import { authInfo } from '@/store/atom/auth'
import { NaverMap } from '@/models/map/Map'
import { queryKey } from 'app/map/components/sections/hooks/useMap'
import { MapListResponse } from '@/models/map/ListItem'
import useGetMapItems from 'app/map/components/hooks/useGetMapItems'
import useGetMapListItems from 'app/map/components/hooks/useGetMapListItems'

interface SearchListQueryProps {
  handleCenterChanged: () => void
  dragStateRef: MutableRefObject<boolean>
}
const PAGE_SIZE = 10

export default function useSearchListQuery({
  handleCenterChanged,
  dragStateRef,
}: SearchListQueryProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(0)
  const auth = useRecoilValue(authInfo)
  const formData = useRecoilValue(formDataAtom)
  const { data: map }: UseQueryResult<NaverMap> = useQuery({
    queryKey: queryKey,
    enabled: false,
  })
  const { mutate: getMapItems } = useGetMapItems(formData, dragStateRef.current)
  const { mutateAsync: getMapListItems } = useGetMapListItems({ formData })
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))
  useEffect(() => {
    if (map) {
      const zoomLevelChangeHandler = () => {
        setZoomLevel(map.getZoom())
      }
      map.addListener('zoom_changed', zoomLevelChangeHandler)

      // 초기 줌 레벨 설정
      setZoomLevel(map.getZoom())

      return () => {
        map.removeListener(
          zoomLevelChangeHandler as unknown as naver.maps.MapEventListener,
        )
      }
    }
  }, [map, setZoomLevel])

  const fetchSearchList = async ({
    pageParam,
  }: {
    pageParam: number
  }): Promise<MapListResponse | void> => {
    if (
      !map ||
      (formData.x1 === 1 &&
        formData.x2 === 1 &&
        formData.y1 === 1 &&
        formData.y2 === 1)
    )
      return
    try {
      if (zoomLevel < 15) {
        await handleCenterChanged()
        return
      }
      let listItems: MapListResponse | null = null
      if (pageParam === 1) {
        const [mapListItems] = await Promise.all([
          getMapListItems({ pageParam, pageSize: PAGE_SIZE }),
        ])
        listItems = mapListItems as unknown as MapListResponse
        const promises = []
        promises.push(getMapItems())
        promises.push(handleCenterChanged())
        await Promise.all(promises)
      } else {
        listItems = (await getMapListItems({
          pageParam,
          pageSize: PAGE_SIZE,
        })) as unknown as MapListResponse
        return listItems
      }
      if (
        listItems?.contents.some((item: MapItems) => item.idCode === auth.id)
      ) {
        listItems.contents = listItems.contents.filter(
          (item: MapItems) => item.idCode !== auth.id,
        )
        return { ...listItems } as MapListResponse
      }
      return listItems as unknown as MapListResponse
    } catch (error) {
      console.error('fetchSearchList error:', error)
      throw error
    }
  }

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: [formData, zoomLevel],
      queryFn: ({ pageParam = 1 }) =>
        fetchSearchList({ pageParam }) as Promise<MapListResponse>,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage?.paging?.isLast
          ? undefined
          : (lastPage?.paging?.pageNumber ?? 0) + 1
        return nextPage
      },
      enabled: !!map || !!auth.isInitialized,
    })

  const listProducts = useMemo(() => {
    if (!data) return []
    return data?.pages.flatMap((page) => page?.contents)
  }, [data])

  return {
    data,
    fetchNextPage,
    hasNextPage,
    listProducts,
    isFetching,
    isLoading,
  }
}
