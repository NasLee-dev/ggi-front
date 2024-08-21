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
  bidCorpYn: string
  peopleSeq: number
  bidders: Bidder[]
}

export default function usePostBidders({ mstSeq, bidCorpYn, peopleSeq, bidders }: PostBidderInfo) {
  return useMutation({
    mutationKey: ["postBidders", mstSeq, bidCorpYn, peopleSeq],
    mutationFn: postBidderInfo,
  })
}
