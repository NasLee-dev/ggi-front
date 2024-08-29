import { Form } from '@/models/map/Form'
import { MapListResponse } from '@/models/map/ListItem'
import { MapListParam } from '@/models/map/MapItemParam'
import { getMapListItems } from '@/remote/map/items/getMapListItems'
import { authInfo } from '@/store/atom/auth'
import { mapListAtom } from '@/store/atom/map'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'

interface PostListItemsArgs {
  pageParam: number
  pageSize: number
}

function useGetMapListItems({ formData }: { formData: Form }) {
  const setMapList = useSetRecoilState(mapListAtom)
  const auth = useRecoilValue(authInfo)
  const param: MapListParam = {
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

  const mutationOptions: UseMutationOptions<MapListResponse, Error, PostListItemsArgs, unknown> = {
    mutationFn: async ({
      pageParam,
      pageSize,
    }: PostListItemsArgs) => await getMapListItems(param, pageParam, pageSize),
    onSuccess: (data) => {
      if (data) {
        return data
      }
    },
    onError: (error) => {
      console.error(error)
    },
  }
  return useMutation(mutationOptions)
}

export default useGetMapListItems
