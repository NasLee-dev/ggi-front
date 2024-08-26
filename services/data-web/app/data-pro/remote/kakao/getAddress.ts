import baseApiInstance from "."

export const getAddress = async (address: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_KAKAO_URL}/v2/local/search/address.json?query=${address}&page=1&size=15`, {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
      },
    })
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}
