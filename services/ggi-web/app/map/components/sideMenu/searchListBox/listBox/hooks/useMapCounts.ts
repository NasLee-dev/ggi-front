import { queryKey } from 'app/map/components/sections/hooks/useMap'
import { Form } from 'app/map/models/map/Form'
import { NaverMap } from 'app/map/models/map/Map'
import { MapCountsResponse } from 'app/map/models/map/MapItem'
import { Dispatch, SetStateAction } from 'react'
import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query'
import { MapCountsParams } from 'app/map/models/map/Params'
import postMapCounts from '@/remote/map/items/getMapCounts'

export default function useMapCounts(
  formData: Form,
  setMapCount: Dispatch<SetStateAction<MapCountsResponse[]>>,
) {
  const { data: map }: UseQueryResult<NaverMap> = useQuery({
    queryKey: queryKey,
    enabled: false,
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