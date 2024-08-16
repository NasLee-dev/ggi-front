import axios from "axios"

export const getIdcodeCheck = async (idcode: string) => {
  try {
    const response = await axios.post(
      `/ggi/api/bid-form/checks`,
      {
        idCode: idcode,
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