import { KakaoAddrProps } from "@/models/Address"
import { getAddr } from "@/remote/map/kakao/getAddr"

const useSearchAddr = (keyword: string) => {
  const searchAddr = async () => {
    const response = await getAddr(keyword)
    if (response.length > 0) {
      return response as KakaoAddrProps[]
    }
  }
  return { searchAddr }
}

export default useSearchAddr
