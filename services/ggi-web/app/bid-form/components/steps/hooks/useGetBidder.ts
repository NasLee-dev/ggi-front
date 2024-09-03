import { useQuery } from "@tanstack/react-query";
import { getBidder } from "app/bid-form/remote/getBidder";

export default function useGetBidder({ mstSeq, seq }: { mstSeq: string, seq: string }) {
  return useQuery({
    queryKey: ['getBidder', { mstSeq, seq }],
    queryFn: async () => {
      return await getBidder({ mstSeq, seq })
    },
  })
}