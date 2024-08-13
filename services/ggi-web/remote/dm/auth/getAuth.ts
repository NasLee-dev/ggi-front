import axios from "axios"

export default async function getAuth(token: string) {
  try {
    const res = await axios.post(
      `/ggi/api/auth/asp`,
      {},
      {
        headers: {
          'Content-Type': 'Application/json',
          Api_Key: `iyv0Lk8v.GMiSXcZDDSRLquqAm7M9YHVwTF4aY8zr`,
          Authorization: token,
        },
      },
    )

    if (res.data.success) {
      console.log('r: ', res.data.data)
      return res.data.data 
    }

  } catch (error) {
    console.error(error)
  }
}
