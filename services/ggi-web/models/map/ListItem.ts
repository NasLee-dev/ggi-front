export interface MapListItem {
  type: number
  id: string
  idCode: string
  goodsId?: string
  caseNo: string
  appraisalAmt: number
  minAmt: number
  winAmt: number
  ratio: number
  buildingArea: string
  landArea: string
  path: string
  status: string
  startDate: string
  dividendDate: string
  claim: number
  interest: string
  x: number
  y: number
  checkInfo?: string
  manageNo?: string
}

export interface PageInfo {
  isFirst: boolean
  isLast: boolean
  pageNumber: number
  totalPages: number
  isEmpty: boolean
  pageSize: number
  totalElements: number
}

export interface MapListResponse {
  contents: MapListItem[]
  paging: PageInfo
}

export interface GetItemResponse {
  success: boolean
  code: number
  message: string
  data: MapListItem
}