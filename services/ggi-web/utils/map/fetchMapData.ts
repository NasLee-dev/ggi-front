import { NaverMap } from "app/map/models/map/Map"

export const fetchMapData = async (): Promise<NaverMap> => {
  const response = await fetch('/api/map')
  if (!response.ok) {
    throw new Error('naver map 로드 실패')
  }
  return response.json()
}
