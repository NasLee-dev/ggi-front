import { useQuery } from "@tanstack/react-query";
import { getAgent } from "app/bid-form/remote/getAgent";

export default function useGetAgent({ mstSeq }: { mstSeq: string }) {
  return useQuery({
    queryKey: ["getAgent", mstSeq],
    queryFn: () => getAgent(mstSeq),
  })
}
