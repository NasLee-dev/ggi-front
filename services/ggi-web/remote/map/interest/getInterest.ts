import axios from 'axios'

export const getKmInterest = async (id: string) => {
  try {
    const response = await axios.get(`/ggi/api/interest/map/km/${id}`)
    if (response.data.success) {
      return response.data
    }
  } catch (error) {
    console.error(error)
  }
}

export const getKwInterest = async (id: string) => {
  try {
    const response = await axios.get(`/ggi/api/interest/map/kw/${id}`)
    if (response.data.success) {
      return response.data
    }
  } catch (error) {
    console.error(error)
  }
}

export const getGmInterest = async (id: string) => {
  try {
    const response = await axios.get(`/ggi/api/interest/map/gm/${id}`)
    if (response.data.success) {
      return response.data
    }
  } catch (error) {
    console.error(error)
  }
}
