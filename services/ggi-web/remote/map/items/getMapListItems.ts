import { MapListResponse } from "app/map/models/map/ListItem";
import { MapListParam } from "app/map/models/map/MapItemParam";
import axios from "axios";


export const getMapListItems = async (formData: MapListParam, pageNum: number, pageSize: number): Promise<MapListResponse> => {
  const errorCode400Regex = /^400\d{2}$/
  let ok = false
  try {
    const response = await axios.post(
      `/ggi/api/map/items?pageNumber=${pageNum}&pageSize=${pageSize}`,
      formData,
    )
    if (response.data.success) {
      return response.data.data as MapListResponse
    } else if (errorCode400Regex.test(response.data.code.toString()) && !ok) {
      ok = true
      setTimeout(() => {
        // alert('지도 검색은 유료서비스 입니다. 로그인 후 이용해주세요.')
        // window.close()
      }, 500)
    }
  } catch (error) {
    console.error(error)
  }
  return {} as MapListResponse
}