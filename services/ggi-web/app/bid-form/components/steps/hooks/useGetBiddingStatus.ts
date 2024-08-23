import { getBiddingStatus } from "app/bid-form/remote/getBiddingStatus";
import { biddingInfoState } from "@/store/atom/bid-form";
import { useMutation } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

export default function useGetBiddingStatus(idCode: string) {
  const [biddingForm, setBiddingForm] = useRecoilState(biddingInfoState)
  return useMutation({
    mutationKey: ['getBiddingStatus'],
    mutationFn: () => getBiddingStatus(idCode),
    onSuccess: (data) => {
      setBiddingForm((prev) => ({
        ...prev,
        ...data,
      }))
      if (!data.isBiddingStatus) {
        alert('사건 정보를 다시 확인해주세요')
        window.close()
      }
    }
  })
}