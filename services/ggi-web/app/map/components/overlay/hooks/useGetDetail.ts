
import { ItemDetail } from 'app/map/models/map/DetailItem'
import { getGgDetail, getGmDetail, getKmDetail, getKwDetail } from '@/remote/map/detail/getDetail'
import { clickedItemAtom } from '@/store/atom/map'
import { useQuery } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'

type detailFetchersType = {
  [key: number]: (id: string) => Promise<ItemDetail>
}

const detailFetchers: detailFetchersType = {
  1: getKmDetail,
  2: getGmDetail,
  3: getGgDetail,
  4: getKwDetail,
}

const fetchDetails = async (ids: string[], types: number[]) => {
  const data = await Promise.all(
    ids.map((id, index) => {
      const fetcher = detailFetchers[types[index]]
      return fetcher ? fetcher(id) : null
    }),
  )
  return data.filter((item): item is ItemDetail => item !== null)
}

const useGetDetail = (openOverlay: boolean) => {
  const clickedItem = useRecoilValue(clickedItemAtom)
  const ids = clickedItem?.ids ?? []
  const type = clickedItem?.types ?? []
  return useQuery({
    queryKey: ['detail', ids, type],
    queryFn: () => (openOverlay ? fetchDetails(ids, type) : []),
  })
}

export default useGetDetail
