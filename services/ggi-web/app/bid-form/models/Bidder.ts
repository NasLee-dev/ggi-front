export interface BiddingInfoType {
  bidderName: string[]
  bidderPhone1: string[]
  bidderPhone2: string[]
  bidderPhone3: string[]
  bidderIdNum1: string[]
  bidderIdNum2: string[]
  bidderAddr: string[]
  bidderAddrDetail: string[]
  bidderCorpNum1: string[]
  bidderCorpNum2: string[]
  bidderCorpNum3: string[]
  bidderCorpRegiNum1: string[]
  bidderCorpRegiNum2: string[]
  bidderCorpYn: string[]
  bidderJob: string[]
}

export interface BiddersProps {
  address: string
  bidderType: string
  companyNo: string
  corporationNo: string
  job: string
  name: string
  peopleSeq: number
  phoneNo: string
  share: any
}
export interface BidderListProps {
  agentYn: string | null
  bidderCount: number
  mstSeq: number
  number: number
  state: number
  bidders: BiddersProps[]
}
