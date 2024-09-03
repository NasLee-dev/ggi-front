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
  if (!sggs?.includes('전체')) sggs?.unshift('전체')

  const { data: umds } = useQuery({
    queryKey: ['umds', sido, sgg],
    queryFn: () => getUmd(sido, sgg),
    enabled: !!sido && !!sgg
  })
  if (!umds?.includes('전체')) umds?.unshift('전체')

  return {
    sidos,
    sggs,
    umds
  }
}