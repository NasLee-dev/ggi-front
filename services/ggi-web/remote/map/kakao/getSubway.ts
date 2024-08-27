import { GetSubwayResponse } from "app/map/models/map/Kakao"

export const getSubway = async (keyword: string): Promise<GetSubwayResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_KAKAO_URL}/v2/local/search/keyword.json?query=${keyword}&page=1&size=15`, {
    headers: {
      Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
    },
  })
  return await response.json()
}