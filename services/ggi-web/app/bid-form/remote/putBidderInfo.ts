import axios from "axios"

type Bidder = {
  address: string
  bidderType: string
  job?: string
  name: string
  phoneNo: string
  companyNo?: string
  corporationNo?: string
}

interface PutBidderInfo {
  mstSeq: number
  bidCorpYn: string
  peopleSeq: number
  bidders: Bidder[]
}

export const putBidderInfo = async ({ mstSeq, bidCorpYn, peopleSeq, bidders }: PutBidderInfo) => {
  try {
    if (bidCorpYn === 'I') {
      const response = await axios.put(
        `/ggi/api/bid-form/${mstSeq}/bidders/${peopleSeq}`,
        {
          address: bidders[peopleSeq].address,
          bidderType: bidders[peopleSeq].bidderType,
          job: bidders[peopleSeq].job,
          name: bidders[peopleSeq].name,
          phoneNo: bidders[peopleSeq].phoneNo,
        },
      )
      if (response.data.success) {
        return response.data.data
      }
    } else if (bidCorpYn === 'C') {
      const response = await axios.put(
        `/ggi/api/bid-form/${mstSeq}/bidders/${peopleSeq}`,
        {
          address: bidders[peopleSeq].address,
          bidderType: bidders[peopleSeq].bidderType,
          companyNo: bidders[peopleSeq].companyNo,
          corporationNo: bidders[peopleSeq].corporationNo,
          job: bidders[peopleSeq].job,
          name: bidders[peopleSeq].name,
          phoneNo: bidders[peopleSeq].phoneNo,
        },
      )
      if (response.data.success) {
        return response.data.data
      }
    }
  } catch (error) {
    console.log(error)
  }
}
