import axios from "axios"

export const getAuth = async (
  token: string | null,
) => {
  let isOk = false
  try {
    const response = await axios.post(
      `/ggi/api/auth/asp`,
      {},
      {
        headers: {
          'Content-Type': 'Application/json',
          Api_Key: 'iyv0Lk8v.GMiSXcZDDSRLquqAm7M9YHVwTF4aY8zr',
          Authorization: token,
        },
      },
    )
    if (response.data.success) {
      return response
    } else if (!response.data.success && !isOk) {
      isOk = true
      alert('올바른 접근이 아닙니다')
      window.close()
    }
  } catch (error) {
    console.log(error)
  }
}

