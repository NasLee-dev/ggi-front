import { getSgg, getSido, getUmd } from "@/remote/dm/search/getLocals";
import { useQuery } from "@tanstack/react-query";

export default function useSearchLocals(sido: string, sgg: string) {
  const { data: sidos } = useQuery({
    queryKey: ['sidos'],
    queryFn: () => getSido()
  })
  const { data: sggs } = useQuery({
    queryKey: ['sggs', sido],
    queryFn: () => getSgg(sido),
    enabled: !!sido
  })
  const { data: umds } = useQuery({
    queryKey: ['umds', sido, sgg],
    queryFn: () => getUmd(sido, sgg),
    enabled: !!sido && !!sgg
  })

  return {
    sidos,
    sggs,
    umds
  }
}