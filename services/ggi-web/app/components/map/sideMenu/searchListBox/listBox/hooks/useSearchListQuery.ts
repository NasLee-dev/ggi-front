import { MapItems } from '@/models/MapItem'
import { MutableRefObject, useCallback, useMemo, useRef } from 'react'
import { UseQueryResult, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'
import { formDataAtom } from '@/store/atom/map'
import { authInfo } from '@/store/atom/auth'
import { NaverMap } from '@/models/Map'
import { queryKey } from 'app/components/map/sections/hooks/useMap'
import { MapListResponse } from '@/models/ListItem'
import useGetMapItems from 'app/components/map/hooks/useGetMapItems'
import useGetMapListItems from 'app/components/map/hooks/useGetMapListItems'

interface SearchListQueryProps {
  handleCenterChanged: () => void
  dragStateRef: MutableRefObject<boolean>
}

const QUERY_KEY = 'searchList'
const PAGE_SIZE = 10

export default function useSearchListQuery({
  handleCenterChanged,
  dragStateRef,
}: SearchListQueryProps) {
  const isFirstMount = useRef(false)
  const auth = useRecoilValue(authInfo)
  const formData = useRecoilValue(formDataAtom)
  const { data: map }: UseQueryResult<NaverMap> = useQuery({
    queryKey: queryKey,
    enabled: false,
  })
  const { mutate: getMapItems } = useGetMapItems(
    formData,
    dragStateRef.current,
  )
  const { mutateAsync: getMapListItems } = useGetMapListItems({ formData })
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  const fetchSearchList = useCallback(
    async ({ pageParam }: { pageParam: number }): Promise<MapListResponse | void> => {
      if (
        !map ||
        (formData.x1 === 1 &&
          formData.x2 === 1 &&
          formData.y1 === 1 &&
          formData.y2 === 1)
      )
        return
      await delay(250)
      try {
        if (map.getZoom() < 15) {
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
          listItems = await getMapListItems({ pageParam, pageSize: PAGE_SIZE }) as unknown as MapListResponse
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
    },
    [
      auth.id,
      formData.x1,
      formData.x2,
      formData.y1,
      formData.y2,
      formData.interests,
      formData.awardedMonths,
      formData.km,
      formData.kw,
      formData.gg,
      formData.gm,
      formData.ekm,
      formData.egm,
      formData.egg,
      formData.fromAppraisalAmount,
      formData.toAppraisalAmount,
      formData.fromMinimumAmount,
      formData.toMinimumAmount,
      formData.ids,
      getMapItems,
      getMapListItems,
      handleCenterChanged,
      map,
    ],
  )
  
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } = useInfiniteQuery({
    queryKey: [
      QUERY_KEY,
      formData.x1,
      formData.x2,
      formData.y1,
      formData.y2,
      formData.interests,
      formData.awardedMonths,
      formData.km,
      formData.kw,
      formData.gg,
      formData.gm,
      formData.ekm,
      formData.egm,
      formData.egg,
      formData.fromAppraisalAmount,
      formData.toAppraisalAmount,
      formData.fromMinimumAmount,
      formData.toMinimumAmount,
      formData.ids,
    ],
    queryFn: ({ pageParam = 1 }) => fetchSearchList({ pageParam }) as Promise<MapListResponse>,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage?.paging?.isLast ? undefined : (lastPage?.paging?.pageNumber ?? 0) + 1
      return nextPage
    },
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
