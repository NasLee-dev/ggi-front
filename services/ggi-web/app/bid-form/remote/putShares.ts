import axios from "axios"

type Shares = {
  peopleSeq: number
  name: string
  share: string
}

interface ShareProps {
  mstSeq: string
  bidderCount: number
  shares: Shares[]
}

export const putShares = async ({ mstSeq, bidderCount, shares }: ShareProps) => {
  try {
    const response = await axios.put(
      `/ggi/api/bid-form/${mstSeq}/bidders/shares`,
      {
        bidderCount: bidderCount,
        shares: shares,
      },
    )
    if (response.data.success) {
      return response.data.data
    }
  } catch (error) {
    console.log(error)
  }
}
