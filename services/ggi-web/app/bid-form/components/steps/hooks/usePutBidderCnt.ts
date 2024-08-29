import { putBidderCount } from "app/bid-form/remote/bidderCount";
import { biddingInfoState } from "@/store/atom/bid-form";
import { useMutation } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

export default function usePutBidderCnt(mstSeq: string, bidderCount: number) {
  const [_, setBiddingForm] = useRecoilState(biddingInfoState)
  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["putBidderCount", mstSeq, bidderCount],
    mutationFn: putBidderCount,
    onSuccess: (data) => {
      setBiddingForm((prev) => ({
        ...prev,
        state: data.state,
      }))
    },
    onError: (error) => {
      console.error(error)
    }
  });
  return { putBidderCount: mutate, isPending, isError };
}