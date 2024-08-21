import axios from "axios"

export const deleteAgent = async (mstSeq: string) => {
  try {
    const response = await axios.delete(
      `/ggi/api/bid-form/${mstSeq}/agents`,
    )
    if (response.data.success) {
      return response.data
    }
  } catch (error) {
    console.log(error)
  }
}
