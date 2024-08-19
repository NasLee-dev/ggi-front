import { deleteAgent } from "@/remote/bid-form/deleteAgent";
import { biddingInfoState } from "@/store/atom/bid-form";
import { useMutation } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

export default function useDeleteAgent(mstSeq: string) {
  const setBiddingForm = useSetRecoilState(biddingInfoState)
  return useMutation({
    mutationKey: ["deleteAgent", mstSeq],
    mutationFn: () => deleteAgent(mstSeq),
    onSuccess: () => {
      setBiddingForm((prev) => ({
        ...prev,
        bidder: 'self',
        agentYn: 'N',
        agent: {
          address: '',
          job: '',
          name: '',
          phoneNo: '',
          relationship: '',
          addressDetail: '',
          agentIdNum1: '',
          agentIdNum2: '',
          phoneNo1: '',
          phoneNo2: '',
          phoneNo3: '',
        }
      }))
    }
  })
}