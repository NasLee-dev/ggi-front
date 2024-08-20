
import getAddress from "@/remote/bid-form/address/getAddress";
import { useMutation } from "@tanstack/react-query";

interface GetAddressProps {
  page: number
  countPerPage: number
  keyword: string
  hstry: boolean
  firstSort: string
}

export default function useGetAddress({ page, countPerPage = 5, keyword, hstry, firstSort = 'none'}: GetAddressProps) {
  return useMutation({
    mutationKey: ["getAddress"],
    mutationFn: () => getAddress({ page, countPerPage, keyword, hstry, firstSort }),
  })
}
