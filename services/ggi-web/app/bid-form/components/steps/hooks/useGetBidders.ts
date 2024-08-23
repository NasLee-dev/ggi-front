import { useQuery } from "@tanstack/react-query";
import { getBidders } from "app/bid-form/remote/getBidders";

export default function useGetBidders(mstSeq: string) {
  return useQuery({
    queryKey: ['bidders', mstSeq],
    queryFn: () => getBidders(mstSeq),
  })
}