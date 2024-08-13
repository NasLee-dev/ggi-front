
import { GetItemResponse } from '@/models/ListItem'
import axios from 'axios'

export const getKmItem = async (idCode: string) => {
  try {
    const response = await axios.get(`/ggi/api/map/km-item/${idCode}`)
    if (response.data.success === true) {
      return response.data as GetItemResponse
    } else {
      return
    }
  } catch (error) {
    console.error(error)
  }
}

export const getGmItem = async (goodsId: string) => {
  try {
    const response = await axios.get(`/ggi/api/map/gm-item/${goodsId}`)
    if (response.data.success === true) {
      return response.data as GetItemResponse
    } else {
      return
    }
  } catch (error) {
    console.error(error)
  }
}

export const getGgItem = async (goodsId: string) => {
  try {
    const response = await axios.get(`/ggi/api/map/gg-item/${goodsId}`)
    if (response.data.success === true) {
      return response.data as GetItemResponse
    } else {
      return
    }
  } catch (error) {
    console.error(error)
  }
}

export const getKwItem = async (idCode: string) => {
  try {
    const response = await axios.get(`/ggi/api/map/kw-item/${idCode}`)
    if (response.data.success === true) {
      return response.data as GetItemResponse
    } else {
      return
    }
  } catch (error) {
    console.error(error)
  }
}
