import { TokenResponse } from '@/models/map/Auth'
import axios from 'axios'
export default async function handleToken(token: string, type: string) {
  try {
    const response = await axios.post(
      `/ggi/api/auth/map?type=${type}`,
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
      return response.data as TokenResponse
    }
  } catch (error) {
    console.error(error)
  }
}
