import { KakaoSubwayProps } from "app/map/models/map/Kakao"
import { getSubway } from "@/remote/map/kakao/getSubway"

const useSubwayStation = (keyword: string) => {
  const handleSearch = async (): Promise<KakaoSubwayProps[] | undefined>  => {
    try {
      const response = await getSubway(keyword)
      const subwayLists = response.documents
      return subwayLists as KakaoSubwayProps[]
    } catch (error) {
      console.error(error)
    }
    return undefined;
  }
  return { handleSearch }
}

export default useSubwayStation
