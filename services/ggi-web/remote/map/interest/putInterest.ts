import axios from 'axios'

interface InterestKmFormData {
  infoId: string
  caseNo: string
  mulSeq: string
  oldInfoId: string
  infoNo: string
  isNewCategory: boolean
  interestInfo: {
    category: string
    memo: string
    starRating: string
  }
  smsNotificationYn: string
  isWait: boolean
}

interface InterestKwFormData {
  infoId: string
  caseNo: string
  oldInfoId: string
  isNewCategory: boolean
  interestInfo: {
    category: string
    memo: string
    starRating: string
  }
}

interface InterestGmFormData {
  goodsId: string
  manageNo: string
  isNewCategory: boolean
  interestInfo: {
    category: string
    memo: string
    starRating: string
  }
}

export const putKmInterest = async (data: InterestKmFormData) => {
  try {
    const response = await axios.put(`ggi/api/interest/map/km`, data)
    if (response.data.success) {
      return response.data.data
    }
  } catch (error) {
    console.error(error)
  }
}

export const putKwInterest = async (data: InterestKwFormData) => {
  try {
    const response = await axios.put(`ggi/api/interest/map/kw`, data)
    if (response.data.success) {
      return response.data.data
    }
  } catch (error) {
    console.error(error)
  }
}

export const putGmInterest = async (data: InterestGmFormData) => {
  try {
    const response = await axios.put(`ggi/api/interest/map/gm`, data)
    if (response.data.success) {
      return response.data.data
    }
  } catch (error) {
    console.error(error)
  }
}
