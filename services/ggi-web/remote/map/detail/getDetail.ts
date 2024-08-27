import axios from 'axios'

export async function getKmDetail(id: string) {
  const response = await axios.get(`/ggi/api/map/km-info/${id}`)
  return response.data.data
}

export async function getKwDetail(id: string) {
  const response = await axios.get(`/ggi/api/map/kw-info/${id}`)
  return response.data.data
}

export async function getGmDetail(id: string) {
  const response = await axios.get(`/ggi/api/map/gm-info/${id}`)
  return response.data.data
}

export async function getGgDetail(id: string) {
  const response = await axios.get(`/ggi/api/map/gg-info/${id}`)
  return response.data.data
}
