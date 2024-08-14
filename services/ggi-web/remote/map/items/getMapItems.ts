import { MapItem, MapItemResponse } from '@/models/map/MapItem'
import { MapItemParam } from '@/models/map/MapItemParam'
import axios from 'axios'

export default async function getMapItems(params: MapItemParam): Promise<MapItemResponse> {
  const errorCode400Regex = /^400\d{2}$/
  let ok = false
  try {
    const response = await axios.post('/ggi/api/map/map-items', params)
    if (response.data.success) {
      return response.data.data as MapItemResponse
    } else if (errorCode400Regex.test(response.data.code.toString()) && !ok) {
      ok = true
      setTimeout(() => {
        // alert('지도 검색은 유료서비스 입니다. 로그인 후 이용해주세요.')
        // window.close()
      }, 500)
    }
  } catch (error) {
    console.log(error)
  }
  return {
    count: 0,
    mapItems: [],
  }
}
