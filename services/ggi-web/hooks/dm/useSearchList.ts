import { IFilterProps } from "@/models/dm/DM";
import { getSearchList } from "@/remote/dm/search/getSearchList";
import { useQuery } from "@tanstack/react-query";

export default function useSearchList (page: number, size: number, sort: string[], filters: IFilterProps) {
  const { data: searchList } = useQuery({
    queryKey: ['searchList', page, size, sort],
    queryFn: () => getSearchList(page, size, sort, filters)
  })

  return { searchList }
}