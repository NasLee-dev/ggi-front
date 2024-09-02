import { IFilterProps } from "@/models/dm/DM";
import { getKMSearchList } from "@/remote/dm/search/getKMSearchList";
import { useQuery } from "@tanstack/react-query";

export default function useSearchList (page: number, size: number, sort: string[], filters: IFilterProps) {
  const { data: kmSearchList } = useQuery({
    queryKey: ['searchList', page, size, sort],
    queryFn: () => getKMSearchList(page, size, sort, filters)
  })

  return { kmSearchList }
}