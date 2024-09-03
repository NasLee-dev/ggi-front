import axios from "axios"

export const getBidder = async ({ mstSeq, seq }: { mstSeq: string, seq: string }) => {
  try {
    const response = await axios.get(`/ggi/api/bid-form/${mstSeq}/bidders/${seq}`)
    if (response.data.success) {
      return response.data.data
    }
  } catch (error) {
    console.error(error)
  }
}