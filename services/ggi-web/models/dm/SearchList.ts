
export interface ISearchContent {
  id: string
  courtName: string
  caseNoString: string
  status: string
  usage: string
  checkInfo: string
  stakeholder: string
  address: string
  zipNo: string
  biddingDate: string
}

export interface ISearchPaging {
  isFirst: boolean
  pageNumber: number
  isLast: boolean
  totalPages: number
  isEmpty: boolean
  pageSize: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  totalElements: number
}

export interface ISearchRes {
  contents: ISearchContent[]
  paging: ISearchPaging
}
