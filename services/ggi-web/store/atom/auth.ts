import { Auth } from '@/models/map/Auth'
import { atom } from 'recoil'

export const authInfo = atom<Auth>({
  key: `auth`,
  default: {
    isLogin: false,
    isAuth: false,
    token: '',
    Api_Key: 'iyv0Lk8v.GMiSXcZDDSRLquqAm7M9YHVwTF4aY8zr',
    role: [''],
    address: '',
    idCode: '',
    type: '',
    id: '',
    isInitialized: false,
    lng: 127.0030847,
    lat: 37.4909565,
    detailLng: 0,
    detailLat: 0,
  },
})
