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
  bidderType: string
  peopleSeq: number
  bidders: Bidder[]
}

export const postBidderInfo = async ({ mstSeq, bidderType, peopleSeq, bidders }: PostBidderInfo) => {
  try {
    if (bidderType === 'I') {
      const response = await axios.post(
        `/ggi/api/bid-form/${mstSeq}/bidders`,
        {
          bidderType: bidderType,
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
    } else if (bidderType === 'C') {
      console.log(bidders)
      const response = await axios.post(
        `/ggi/api/bid-form/${mstSeq}/bidders`,
        {
          bidderType: bidderType,
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
