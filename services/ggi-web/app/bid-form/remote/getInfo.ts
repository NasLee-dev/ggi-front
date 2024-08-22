import axios from "axios"

export const getMstSeqInfo = async (mstSeq: string) => {
  try {
    const response = await axios.get(
      `/ggi/api/bid-form/${Number(mstSeq)}`,
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
    console.error(error)
  }
}
