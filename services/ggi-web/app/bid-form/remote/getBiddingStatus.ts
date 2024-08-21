import axios from "axios"

export const getBiddingStatus = async (idCode: string) => {
  try {
    const response = await axios.post(
      `/ggi/api/bid-form/case-status`,
      {
        idCode,
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