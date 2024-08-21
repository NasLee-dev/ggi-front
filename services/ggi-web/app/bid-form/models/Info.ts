export interface TempData {
  infoId: string
  caseNo: string
  mulSeq: string
  biddingDate: string
  courtFullName: string
  reqCourtName: string
  mulNo: string
  caseYear: string
  caseDetail: string
  startYear: string
  startMonth: string
  startDay: string
  caseNoString: string
  usage: string
  biddingDateString: string
  address: string
  etcAddress: string
  roadAddress: string
  carInfo: string
  biddingInfos: [{
    biddingTime: string
    bidDeposit: number
    appraisalAmount: number
    minimumAmount: number
  }]
}