import { MapListItem, PageInfo } from "./ListItem"
import { MapItem } from "./MapItem"

export interface Auth {
  isLogin: boolean
  isAuth: boolean
  token: string
  Api_Key: string
  role: string[]
  address: string
  idCode: string
  type: string
  lng: number
  lat: number
  isInitialized: boolean
  detailLng: number
  detailLat: number
  id: string
  mstSeq: string
}

interface Contents {
  type: number
  id: string
  idCode: string
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
  checkInfo: string
}

interface Paging {
  isFirst: boolean
  pageNumber: number
  isLast: boolean
  totalPages: number
  isEmpty: boolean
  pageSize: number
  totalElements: number
}

export interface TokenResponse {
  success: boolean
  code: number
  message: string
  data: {
    userId: string
    authorities: string[]
    mapItemCount?: number
    mapItems?: MapItem[]
    contents?: {
      contents: Contents[]
      paging: Paging
    }
  }
}

export interface InitialDataResponse {
  userId: string
  authorities: string[]
  mapItemCount: number
  mapItems: MapItem[]
  contents: {
    contents: MapListItem[]
    paging: PageInfo
  }
  isLogin: boolean
  isAuth: boolean
  token: string
  Api_Key: string
  idCode: string
  type: string
  lng: number
  lat: number
  detailLng: number
  detailLat: number
}
