import { Auth } from 'app/map/models/map/Auth'
import { NaverMap } from 'app/map/models/map/Map'
import { authInfo } from '@/store/atom/auth'
import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'

const useGeoCode = (address: string, map: NaverMap | null) => {
  const setAuth = useSetRecoilState<Auth>(authInfo)
  const handleGeoCode = useCallback(() => {
    if (!map || !window.naver?.maps.Service?.geocode) {
      return
    }

    window.naver.maps.Service.geocode(
      {
        query: address,
      },
      (status: any, response: any) => {
        if (status !== window.naver.maps.Service.Status.OK) {
          return
        }

        const result = response.v2.addresses[0]
        const { x, y } = result || { point: { x: 0, y: 0 } }
        setAuth((prev: Auth) => ({ ...prev, lat: Number(y), lng: Number(x) }))
        map.setCenter({ lat: Number(y), lng: Number(x) })
      },
    )
  }, [address, map, setAuth])

  return { handleGeoCode }
}

export default useGeoCode
