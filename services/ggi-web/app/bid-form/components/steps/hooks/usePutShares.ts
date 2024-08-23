import { useMutation } from "@tanstack/react-query";
import { putShares } from "app/bid-form/remote/putShares";

type Shares = {
  peopleSeq: number
  name: string
  share: string
}

export default function usePutShares(mstSeq: string, bidderCount: number, shares: Shares[]) {
  return useMutation({
    mutationKey: ["putShares", mstSeq, bidderCount, shares],
    mutationFn: putShares,
  })
}
