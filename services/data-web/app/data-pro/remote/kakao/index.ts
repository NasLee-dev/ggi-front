import axios from 'axios'

const baseApiURL = `${process.env.NEXT_PUBLIC_KAKAO_URL}`

const headers = {
  'Content-Type': 'application/json',
}

const baseApiInstance = axios.create({
  baseURL: baseApiURL,
  headers,
})

export default baseApiInstance
