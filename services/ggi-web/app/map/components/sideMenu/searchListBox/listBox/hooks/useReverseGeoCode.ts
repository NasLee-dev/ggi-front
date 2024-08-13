
import { jusoProps } from '@/models/Address'
import { jusoAtom } from '@/store/atom/map'
import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'

type AreaType = {
  name: string
  coords: {
    center: {
      crs: string
      x: string
      y: string
    }
  },
  alias?: string
}
interface ReverseGeoCodeResult {
  area0: AreaType
  area1: AreaType
  area2: AreaType
  area3: AreaType
  area4: AreaType
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
          resolve(response?.v2?.results[0]?.region)
        }
      },
    )
  })
}

export const useReverseGeoCode = () => {
  const setJuso = useSetRecoilState<jusoProps>(jusoAtom);

  const performReverseGeocode = useCallback(
    async ({ lat, lng }: ReverseGeoCodeOptions) => {
      if (!window.naver || !window.naver.maps?.Service?.reverseGeocode) {
        console.warn("Naver Maps API is not available.");
        return;
      }

      try {
        const result = await reverseGeocode(lat, lng);
        setJuso((prev) => ({
          ...prev,
          topSido: result.area1.name,
          topGungu: result.area1.name.includes('세종특별자치시')
            ? result.area3.name.endsWith('동')
              ? result.area1.name
              : result.area3.name
            : result.area2.name,
          topDong: result.area1.name.includes('세종특별자치시')
            ? result.area3.name.endsWith('동')
              ? result.area3.name
              : result.area4.name
            : result.area3.name,
        }));
      } catch (error) {
        console.error("Error during reverse geocoding:", error);
      }
    },
    [setJuso],
  );

  return { performReverseGeocode };
};
