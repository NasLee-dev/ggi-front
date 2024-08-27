export interface SelectedItem {
  kmItem?: {
    id: string
    idCode: string
    caseNo: string
    type: number
    status: string
    appraisalAmt: number
    minAmt: number
    winAmt: number
    ratio: number
    buildingArea: string
    landArea: string
    path: string
    interest: string
    x: number
    y: number
    checkInfo: string
  }
  kwItem?: {
    id: string
    idCode: string
    caseNo: string
    type: number
    status: string
    startDate: string
    dividendDate: string
    claim: number
    interest: string
    x: number
    y: number
    winAmt: number
  }
  gmItem?: {
    goodsId: string
    type: number
    status: string
    manageNo: string
    appraisalAmt: number
    minAmt: number
    winAmt: number
    ratio: number
    buildingArea: string
    landArea: string
    path: string
    interest: string
    x: number
    y: number
    checkInfo: string
  }
}
