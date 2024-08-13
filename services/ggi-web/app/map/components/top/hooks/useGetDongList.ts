import { DongProps } from '@/models/Address'
import { jusoAtom } from '@/store/atom/map'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRecoilValue } from 'recoil'

const fetchDongList = async (si: string, gu: string) => {
  try {
    const { data } = await axios.get(`/ggi/api/location/${si}/${gu}/umds`)
    if (data.success) {
      const addArray =
        data.data.umds.length % 3 === 0
          ? null
          : Array(3 - (data.data.umds.length % 3)).fill({
              umd: ' ',
              x: 0,
              y: 0,
            })
      return [...data.data.umds, ...(addArray === null ? [] : addArray)]
    }
  } catch (error) {
    throw new Error('동 리스트를 가져오는데 실패했습니다.')
  }
  return []
}

export default function useGetDongList() {
  const juso = useRecoilValue(jusoAtom)
  return useQuery<DongProps[], Error>({
    queryKey: ['dongList', juso.bottomSido, juso.bottomGungu],
    queryFn: () => fetchDongList(juso.bottomSido, juso.bottomGungu),
    enabled: juso.bottomGungu !== '',
  })
}
