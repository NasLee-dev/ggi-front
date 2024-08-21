import axios from "axios"

export const getBidders = async (mstSeq: string) => {
  try {
    const response = await axios.get(
      `/ggi/api/bid-form/${mstSeq}/bidders`,
    )
    if (response.data.success) {
      return response.data.data
    }
  } catch (error) {
    console.log(error)
  }
}
