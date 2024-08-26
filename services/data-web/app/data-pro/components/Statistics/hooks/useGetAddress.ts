import { getAddress } from "@/app/data-pro/remote/kakao/getAddress";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function useGetAddress(address: string) {
  // return useMutation({
  //   mutationKey: ["getAddress", address],
  //   mutationFn: async () => {
  //     await getAddress(address);
  //   }
  // })
  return useQuery({
    queryKey: ["getAddress", address],
    queryFn: async () => {
      await getAddress(address);
    }
  })
}