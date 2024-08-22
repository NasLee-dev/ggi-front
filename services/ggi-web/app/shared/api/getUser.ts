import { UserType } from 'app/shared/types/auth'
import axios from 'axios'

export const getUser = async (token: string): Promise<UserType | undefined> => {
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
      return res.data.data || null
    }
  } catch (error) {
    console.error(error)
  }

  return undefined
}
