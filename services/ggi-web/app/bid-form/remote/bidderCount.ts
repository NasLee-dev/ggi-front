import axios from "axios"

export const putBidderCount = async ({ mstSeq, bidderCount }: { mstSeq: string, bidderCount: number }) => {
  try {
    const response = await axios.put(
      `/ggi/api/bid-form/${mstSeq}/bidder-count`,
      {
        bidderCount: bidderCount,
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
  } catch (error) {
    console.log(error)
  }
}