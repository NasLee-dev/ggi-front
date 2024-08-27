import axios from "axios"

export const getAddress = async (address: string) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_KAKAO_URL}v2/local/search/address.json?query=${address}&page=1&size=15`, {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
      },
    })
    return response
  } catch (error) {
    throw new Error('주소를 가져오는데 실패했습니다.')
  }
}
