import { useMutation } from "@tanstack/react-query";
import { postBidderInfo } from "app/bid-form/remote/postBidderInfo";

type Bidder = {
  address: string
  bidderType: string
  job?: string
  name: string
  phoneNo: string
  companyNo?: string
  corporationNo?: string
}

interface PostBidderInfo {
  mstSeq: number
  bidderType: string
  peopleSeq: number
  bidders: Bidder[]
}

export default function usePostBidders({ mstSeq, bidderType, peopleSeq, bidders }: PostBidderInfo) {
  return useMutation({
    mutationKey: ["postBidders", mstSeq, bidderType, peopleSeq, bidders],
    mutationFn: postBidderInfo,
  })
}
