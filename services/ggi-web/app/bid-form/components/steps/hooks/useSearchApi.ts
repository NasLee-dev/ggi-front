import { getSearch } from "@/remote/bid-form/getSearch"
import { getSearchResult } from "@/remote/bid-form/getSearchResult"
import { useMutation } from "@tanstack/react-query"

export const useSearchApi = () => {
  const searchCases = async ({
    caseNum,
    auctionNum
  }: {
    caseNum: string,
    auctionNum: string
  }) => {
    const response = await getSearch({ caseNum, auctionNum })
    return response.cases
  }

  const checkCases = async ({ infoId, caseNo, mulSeq }: {
    infoId: string,
    caseNo: string,
    mulSeq: string
  }) => {
    const response = await getSearchResult({ infoId, caseNo, mulSeq })
    return response
  }

  return {
    searchCases: useMutation({
      mutationFn: searchCases,
    }),
    checkCases: useMutation({
      mutationFn: checkCases,
    }),
  }
}