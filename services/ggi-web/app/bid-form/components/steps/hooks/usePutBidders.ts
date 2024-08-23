import { useMutation } from "@tanstack/react-query";
import { putBidderInfo } from "app/bid-form/remote/putBidderInfo";

type Bidder = {
  address: string
  bidderType: string
  job?: string
  name: string
  phoneNo: string
  companyNo?: string
  corporationNo?: string
}

interface PutBiddersParams {
  mstSeq: number
  bidderType: string
  peopleSeq: number
  bidders: Bidder[]
}

export default function usePutBidders({ mstSeq, bidderType, peopleSeq, bidders }: PutBiddersParams) {
  return useMutation({
    mutationKey: ["putBidders", mstSeq, bidderType, peopleSeq, bidders],
    mutationFn: putBidderInfo,
  })
}