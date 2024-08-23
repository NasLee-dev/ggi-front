import { useMutation } from "@tanstack/react-query";
import { putAgent } from "app/bid-form/remote/putAgent";

interface PutAgentProps {
  mstSeq: string
  name: string
  relationship: string
  phoneNo: string
  address: string
  job: string
}

export default function usePutAgent({ mstSeq, name, relationship, phoneNo, address, job }: PutAgentProps) {
  return useMutation({
    mutationKey: ["putAgent", mstSeq, name, relationship, phoneNo, address, job],
    mutationFn: () => putAgent({ mstSeq, name, relationship, phoneNo, address, job }),
  })
}