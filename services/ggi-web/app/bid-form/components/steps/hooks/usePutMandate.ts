import { useMutation } from "@tanstack/react-query";
import { putMandates } from "../../../remote/putMandates";

type Mandate = {
  peopleSeq: number
  name: string
  mandateYn: string
}

interface MandateProps {
  mstSeq: string
  bidderNum: number
  mandates: Mandate[]
}


export default function usePutMandate({ mstSeq, bidderNum, mandates }: MandateProps) {
  return useMutation({
    mutationKey: ["putMandate", mstSeq, bidderNum, mandates],
    mutationFn: putMandates,
  })
}