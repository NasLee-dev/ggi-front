
import { jusoProps } from '@/models/Address'
import { jusoAtom } from '@/store/atom/map'
import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'

interface ReverseGeoCodeResult {
  sido: string
  sigugun: string
  dongmyun: string
}

interface ReverseGeoCodeOptions {
  lat: number
  lng: number
}

const reverseGeocode = async (
  lat: number,
  lng: number,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    window.naver.maps.Service.reverseGeocode(
      {
        coords: new window.naver.maps.LatLng(lat, lng),
      },
      (status: any, response: any) => {
        if (status !== window.naver.maps.Service.Status.OK) {
          reject(new Error('주소를 찾을 수 없습니다.'))
        } else {
          resolve(response?.v2?.results[0].region)
        }
      },
    )
  })
}

const processResult = (result: any) => {
  const sidoParts = result.area1.name
  const sigugunParts = result.area2.name
  let getGungu = ''
  let topGungu = ''
  if (sigugunParts.length === 1 && sigugunParts.match(/시$/)) {
    // 첫 번째 파트가 '시'로 끝나는 경우
    getGungu = sigugunParts
  } else if (sigugunParts[1] && sigugunParts[1].match(/구$/)) {
    // 두 번째 파트가 '구'로 끝나는 경우
    getGungu = sigugunParts[1]
    topGungu = `${sigugunParts[0]} ${sigugunParts[1]}`
  }

  return {
    topSido:result.area1.name,
    topGungu,
    topDong: result.area3.name,
    getGungu,
  }
}

export const useReverseGeoCode = () => {
  const setJuso = useSetRecoilState<jusoProps>(jusoAtom)

  const performReverseGeocode = useCallback(
    async ({ lat, lng }: ReverseGeoCodeOptions) => {
      if (!window.naver.maps?.Service?.reverseGeocode) {
        return
      }
      try {
        const result = await reverseGeocode(lat, lng)
        console.log('result', result)
        const processedResult = processResult(result)

        setJuso((prev) => ({
          ...prev,
          topSido: processedResult.topSido,
          topGungu: processedResult.topGungu,
          topDong: processedResult.topDong,
        }))

        return processedResult
      } catch (error) {
        return
      }
    },
    [],
  )
  return { performReverseGeocode }
}
