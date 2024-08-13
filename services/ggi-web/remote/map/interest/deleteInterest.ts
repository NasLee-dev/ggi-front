import axios from 'axios'

export const deleteKmInterest = async (id: string) => {
  try {
    const response = await axios.delete(`ggi/api/interest/map/km/${id}`)
    if (response.data.success) {
      return response.data.data
    }
  } catch (error) {
    console.error(error)
  }
}

export const deleteGmInterest = async (id: string) => {
  try {
    const response = await axios.delete(`ggi/api/interest/map/gm/${id}`)
    if (response.data.success) {
      return response.data.data
    }
  } catch (error) {
    console.error(error)
  }
}

export const deleteKwInterest = async (id: string) => {
  try {
    const response = await axios.delete(`ggi/api/interest/map/kw/${id}`)
    if (response.data.success) {
      return response.data.data
    }
  } catch (error) {
    console.error(error)
  }
}
