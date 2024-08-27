import { GunguProps } from 'app/map/models/map/Address'
import { jusoAtom } from '@/store/atom/map'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRecoilValue } from 'recoil'

const fetchGunguList = async (sido: string): Promise<GunguProps[]> => {
  try {
    const { data } = await axios.get(`/ggi/api/location/${sido}/sggs`)
    if (data.success) {
      const addArray =
        data.data.sggs.length % 3 === 0
          ? null
          : Array(3 - (data.data.sggs.length % 3)).fill({
              sgg: ' ',
              x: 0,
              y: 0,
            })
      return [...data.data.sggs, ...(addArray === null ? [] : addArray)]
    }
  } catch (error) {
    throw new Error('군/구 리스트를 가져오는데 실패했습니다.')
  }
  return []
}

export default function useGetGunguList() {
  const juso = useRecoilValue(jusoAtom)
  return useQuery<GunguProps[], Error>({
    queryKey: ['gunguList', juso.bottomSido],
    queryFn: () => fetchGunguList(juso.bottomSido),
    enabled: juso.bottomSido !== '',
  })
}
