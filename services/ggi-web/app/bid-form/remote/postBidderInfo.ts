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

interface PostBidderInfo {
  mstSeq: number
  bidCorpYn: string
  peopleSeq: number
  bidders: Bidder[]
}

export const postBidderInfo = async ({ mstSeq, bidCorpYn, peopleSeq, bidders }: PostBidderInfo) => {
  try {
    if (bidCorpYn[peopleSeq] === 'I') {
      const response = await axios.post(
        `/ggi/api/bid-form/${mstSeq}/bidders`,
        {
          bidderType: bidders[peopleSeq].bidderType,
          name: bidders[peopleSeq].name,
          phoneNo: bidders[peopleSeq].phoneNo,
          address: bidders[peopleSeq].address,
          job: bidders[peopleSeq].job ?? '',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      if (response.data.success) {
        return response.data.data
      }
    } else if (bidCorpYn[peopleSeq] === 'C') {
      const response = await axios.post(
        `/ggi/api/bid-form/${mstSeq}/bidders`,
        {
          bidderType: bidders[peopleSeq].bidderType,
          name: bidders[peopleSeq].name,
          phoneNo: bidders[peopleSeq].phoneNo,
          address: bidders[peopleSeq].address,
          job: bidders[peopleSeq].job ?? '',
          companyNo: bidders[peopleSeq].companyNo,
          corporationNo: bidders[peopleSeq].corporationNo,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
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
