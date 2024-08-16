import { getBidFormInfoMstSeq, getCaseCheck, initBidForm } from "@/remote/bid-form/getBidFormInfo"
import { useMutation } from "@tanstack/react-query"

export const useInfoApi = () => {
  const getInfoMstSeq = async ({ mstSeq }: { mstSeq: string | null }) => {
    const response = await getBidFormInfoMstSeq(mstSeq)
    return response
  }

  const getCase = async ({ infoId, caseNo, mulSeq }: {
    infoId: string
    caseNo: string
    mulSeq: string
  }) => {
    const response = await getCaseCheck({ infoId, caseNo, mulSeq })
    return response
  }

  const getInit = async ({
    infoId,
    caseNo,
    mulSeq,
    biddingDate,
    biddingTime,
  }: {
    infoId: string
    caseNo: string
    mulSeq: string
    biddingDate: string
    biddingTime: string
  }) => {
    const response = await initBidForm({
      infoId,
      caseNo,
      mulSeq,
      biddingDate,
      biddingTime,
    })
    return response
  }

  return {
    getInfoMstSeq: useMutation({
      mutationKey: ['getInfoMstSeq'],
      mutationFn: getInfoMstSeq,
    }),
    getCase: useMutation({
      mutationKey: ['getCase'],
      mutationFn: getCase,
    }),
    getInit: useMutation({
      mutationKey: ['getInit'],
      mutationFn: getInit,
    })
  }
}