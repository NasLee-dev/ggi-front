import axios from "axios"

export default async function getLocalFilter() {
  try {
    const res = await axios.get(`/ggi/api/location/area/sds`)
    
    if (res.data.success) {
      return res.data.data 
    }
  } catch (error) {
    console.error(error)
  }
}