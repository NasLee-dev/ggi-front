import { getCourt1s, getCourt2s, getCourt3s } from "@/remote/dm/search/getCourt";
import { useQuery } from "@tanstack/react-query";

export default function useSearchCourts(code1: string, code2: string) {
  const { data: court1s } = useQuery({
    queryKey: ['court1s'],
    queryFn: () => getCourt1s()
  })
  const { data: court2s } = useQuery({
    queryKey: ['court2s', code1],
    queryFn: () => getCourt2s(code1),
    enabled: !!code1
  })

  let findCourt
  findCourt = court2s?.findIndex((court) => court.court === '전체')
  if (findCourt === -1) court2s?.unshift({ code: '', court: '전체' })

  const { data: court3s } = useQuery({
    queryKey: ['court3s', code2],
    queryFn: () => getCourt3s(code1, code2),
    enabled: !!code1 && !!code2
  })

  findCourt = court3s?.findIndex((court) => court.court === '전체')
  if (findCourt === -1) court3s?.unshift({ code: '', court: '전체' })

  return {
    court1s,
    court2s,
    court3s
  }
}