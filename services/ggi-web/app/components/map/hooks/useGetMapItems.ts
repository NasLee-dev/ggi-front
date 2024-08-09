import { Form } from '@/models/Form'
import { MapItem, MapItemResponse } from '@/models/MapItem'
import getMapItems from '@/remote/map/items/getMapItems'

import { authInfo } from '@/store/atom/auth'
import { mapItemsAtom } from '@/store/atom/map'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export default function useGetMapItems(formData: Form, dragState: boolean) {
  const setMapItems = useSetRecoilState(mapItemsAtom)
  const auth = useRecoilValue(authInfo)
  const param = {
    ids:
      formData.ids.length === 12 || formData.ids.length === 0
        ? '0'
        : formData.ids.join(','),
    fromAppraisalAmount: formData.fromAppraisalAmount,
    toAppraisalAmount:
      formData.toAppraisalAmount === 3000000001
        ? 0
        : formData.toAppraisalAmount,
    fromMinimumAmount: formData.fromMinimumAmount,
    toMinimumAmount:
      formData.toMinimumAmount === 3000000001 ? 0 : formData.toMinimumAmount,
    interests: formData.interests,
    x1: formData.x1,
    y1: formData.y1,
    x2: formData.x2,
    y2: formData.y2,
    awardedMonths: formData.awardedMonths,
    km: formData.km,
    kw: formData.kw,
    gg: formData.gg,
    gm: formData.gm,
    ekm: formData.ekm,
    egm: formData.egm,
    egg: formData.egg,
    selectedId: auth.id !== '' ? auth.id : null,
    selectedType: auth.type !== '' ? parseInt(auth.type) : null,
  }
  const mutationOptions: UseMutationOptions<MapItemResponse, Error, void, unknown> = {
    mutationFn: async () => await getMapItems(param) as unknown as MapItemResponse,
    onSuccess: (data: MapItemResponse) => {
      if (data) {
        setMapItems([]) //  강제 렌더링을 위한 초기화
        setMapItems(data.mapItems as MapItem[])
      } else {
        return 
      }
      dragState = false
    },
    onError: (error) => {
      console.error(error)
      setMapItems((prev) => {
        return prev
      })
    },
  }
  const { mutate } = useMutation(mutationOptions)
  return { mutate }
}
