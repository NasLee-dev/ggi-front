export interface ItemDetail {
  id?: string
  idCode?: string
  caseNo?: string
  goodsID?: string
  type: number
  manageNo?: string
  path?: string
  shortAddress: string
  usage: string
  appraisalAmt?: number
  minAmt?: number
  winAmt?: number
  ratio?: number
  failCount?: number
  buildingArea?: string
  landArea?: string
  checkInfo?: string
  interest?: string
  share?: string
  claimAmt?: number
  startDate?: string
  roadViewInfo?: {
    pan: number
    tilt: number
    zoom: number
    panoId: number
    panoX: number
    panoY: number
  }
}
