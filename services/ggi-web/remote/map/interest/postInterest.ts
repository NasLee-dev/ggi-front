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

export const postKmInterest = async (data: InterestKmFormData) => {
  try {
    const response = await axios.post(`ggi/api/interest/map/km`, data)
    if (response.data.success) {
      return response.data.data
    }
  } catch (error) {
    console.error(error)
  }
}

export const postKwInterest = async (data: InterestKwFormData) => {
  try {
    const response = await axios.post(`ggi/api/interest/map/kw`, data)
    if (response.data.success) {
      return response.data.data
    } else {
      if (response.data.code === 20001) {
        alert('해당 그룹명이 이미 존재합니다')
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export const postGmInterest = async (data: InterestGmFormData) => {
  try {
    const response = await axios.post(`ggi/api/interest/map/gm`, data)
    if (response.data.success) {
      return response.data.data
    }
  } catch (error) {
    console.error(error)
  }
}
