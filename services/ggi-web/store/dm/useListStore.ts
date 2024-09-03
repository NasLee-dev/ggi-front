import { ISearchRes } from "@/models/dm/SearchList";
import { create } from "zustand";

interface IListState {
  list: ISearchRes
  setList: (list: ISearchRes) => void
}

export const useKMListStore = create<IListState>((set) => ({
  list: {
    contents: [],
    paging: {
      isFirst: true,
      pageNumber: 1,
      isLast: false,
      totalPages: 1,
      isEmpty: false,
      pageSize: 20,
      sort: {
        empty: false,
        sorted: true,
        unsorted: false
      },
      totalElements: 0
    }
  },
  setList: (newList) => set(() => {
    return {
      list: newList
    }
  })
}))
