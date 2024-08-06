import { MAP_KEY } from '@/components/map/sections/hooks/useMap'
import { Form } from '@/models/Form'
import { NaverMap } from '@/models/Map'
import { MapCountsResponse } from '@/models/MapItem'
import { Dispatch, SetStateAction } from 'react'
import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query'
import { MapCountsParams } from '@/models/Params'
import { postMapCounts } from '@/remote/map/items/getMapCounts'

export default function useMapCounts(
  formData: Form,
  setMapCount: Dispatch<SetStateAction<MapCountsResponse[]>>,
) {
  const queryKey = [MAP_KEY]
  const { data: map }: UseQueryResult<NaverMap> = useQuery({
    queryKey,
    enabled: false, // Just setting the proper queryKey and options.
  })

  const countParam: MapCountsParams = {
    ids:
      formData.ids?.length === 12 || formData.ids?.length === 0
        ? '0'
        : formData.ids.map((id) => id).join(','),
    km: formData.km,
    kw: formData.kw,
    gm: formData.gm,
    gg: formData.gg,
    x1: formData.x1,
    y1: formData.y1,
    x2: formData.x2,
    y2: formData.y2,
    level: map?.getZoom() ?? 0,
  }
  const { mutate } = useMutation({
    mutationFn: async () => await postMapCounts(countParam),
    onMutate: () => {
      setMapCount([])
    },
    onSuccess: (data) => {
      setMapCount(data.mapCounts)
    },
  })
  return {
    mutate,
  }
}