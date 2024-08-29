export type InterestInfo = {
  category: string
  starRating: string
  memo: string
}

export interface interest {
  infoId: string
  caseNo: string
  mulSeq: string
  oldInfoId: string
  infoNo: string
  interestInfo: InterestInfo
  caseNoString: string
  count: number
  categories: string[]
  smsNotificationYn: string
  isWait: boolean
  manageNo?: string
  goodsId?: string
}

export interface InterestFormData {
  infoId: string
  goodsId?: string
  caseNo?: string
  manageNo?: string
  mulSeq: string
  oldInfoId: string
  infoNo?: string
  caseNoString: string
  isNewCategory: boolean
  interestInfo: {
    category: string
    memo: string
    starRating: string
  }
  title: string
  importance: string
  categories: string[]
  smsNotificationYn: string
  isWait: boolean
  type: number
}

export interface InterestPostResponse {
  success: boolean
  data: interest
}

export interface UpdatedInterest {
  infoId: string
  caseNo: string
  mulSeq: string
  oldInfoId: string
  infoNo: string
  interestInfo: InterestInfo
  count: number
  categories: string[]
  smsNotificationYn: string
  isWait: boolean
  caseNoString: string
  manageNo?: string
  goodsId?: string
  address: string
  type: number
}
