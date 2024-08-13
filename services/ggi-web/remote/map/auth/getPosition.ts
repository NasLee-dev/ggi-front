import axios from 'axios'

export const getPosition = async (type: string) => {
  try {
    const response = await axios.get(`/ggi/api/map/position?type=${type}`)
    if (response.data.success) {
      return response.data.data
    }
  } catch (error) {
    console.error(error)
  }
}
