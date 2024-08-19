import { postAgent } from "@/remote/bid-form/postAgent";
import { biddingInfoState } from "@/store/atom/bid-form";
import { useMutation } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

interface AgentForm {
  name: string
  relationship: string
  phoneNo: string
  address: string
  job: string
}

export default function usePostAgent(mstSeq: string, formData: AgentForm) {
  const setBiddingForm = useSetRecoilState(biddingInfoState)
  return useMutation({
    mutationKey: ['postAgent', mstSeq],
    mutationFn: () => postAgent(mstSeq, formData),
    onSuccess: () => {
      setBiddingForm((prev) => ({
        ...prev,
        agent: {
          ...prev.agent,
          address: prev.agent.address + ' ' + prev.agent.addressDetail,
        }
      }))
    }
  })
}