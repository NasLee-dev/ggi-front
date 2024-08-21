import axios from "axios"
import baseApiInstance from "./baseInstance"

interface GetAddressProps {
  page: number
  countPerPage: number
  keyword: string
  hstry: boolean
  firstSort: string
}

export default async function getAddress({
  page,
  countPerPage = 5,
  keyword,
  hstry,
  firstSort = 'none',
}: GetAddressProps) {
  const param = {
    confmKey: process.env.NEXT_PUBLIC_ADDR_API_KEY,
    resultType: 'json',
    currentPage: page,
    countPerPage: countPerPage,
    keyword: keyword,
    hstryYn: hstry ? 'Y' : 'N',
    firstSort: firstSort,
    addInfoYn: 'Y',
  }
  try {
    const result = await baseApiInstance.get('/addrlink/addrLinkApi.do', {
      params: param,
    })
    if (
      result.data.results.common.errorCode === '0' &&
      result.data.results.juso.length > 0
    ) {
      return result.data.results
    }
  } catch (error) {
    console.log(error)
  }
}
