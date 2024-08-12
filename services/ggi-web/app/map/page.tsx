'use client'
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import {
  formDataAtom,
  jusoAtom,
  mapItemsAtom,
  mapListAtom,
  selectedItemAtom,
} from '@/store/atom/map'
import { NaverMap } from '@/models/Map'
import { MapItem, MapItems } from '@/models/MapItem'
import { useRouter } from 'next/navigation'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import useSessionStorage from '@/hooks/useSessionSotrage'
import { GetItemResponse, PageInfo } from '@/models/ListItem'
import {
  getGgItem,
  getGmItem,
  getKmItem,
  getKwItem,
} from 'remote/map/selectedItem/getSelectedItem'
import { authInfo } from '@/store/atom/auth'
import { getPosition } from '@/remote/map/auth/getPosition'
import handleToken from '@/remote/map/auth/getAuth'
import MapSection from 'app/map/components/sections/MapSection'
import { fetchMapData } from 'utils/map/fetchMapData'

declare global {
  interface Window {
    naver: naver.maps.Map
  }
}
interface Props {
  searchParams: {
    token: string | null
    type: string | null
    idCode: string | null
  }
}

const fetchQueryString = (searchParams: URLSearchParams) => {
  const token = searchParams.get('token')
  const type = searchParams.get('type')
  const idCode = searchParams.get('idCode')
  return { token, type, idCode }
}

function MapComponent({ searchParams }: Props) {
  const { data: map }: UseQueryResult<NaverMap> = useQuery({
    queryKey: ['/map'],
    queryFn: fetchMapData,
    enabled: false,
  })
  const initialData = fetchQueryString(
    new URLSearchParams(searchParams as Record<string, string>),
  )
  const setAuth = useSetRecoilState(authInfo)
  const setMapList = useSetRecoilState(mapListAtom)
  const setMapItems = useSetRecoilState(mapItemsAtom)
  const setJuso = useSetRecoilState(jusoAtom)
  const setSelectedData = useSetRecoilState(selectedItemAtom)
  const setFormData = useSetRecoilState(formDataAtom)
  const router = useRouter()

  const [tokenValue, setTokenValue] = useSessionStorage({
    key: 'token',
    initialValue: initialData.token as string,
  })
  const [typeCode, setTypeCode] = useSessionStorage({
    key: 'type',
    initialValue: initialData.type as string,
  })
  const [idCodeValue, setIdCodeValue] = useSessionStorage({
    key: 'idCode',
    initialValue: initialData.idCode as string,
  })
  const [refreshValue, setRefreshValue] = useSessionStorage({
    key: 'isRefresh',
    initialValue: 'false',
  })
  const setMapOptions = useCallback((map: NaverMap) => {
    if (!map) return
    map.setOptions({
      scrollWheel: false,
      disableDoubleClickZoom: true,
      draggable: false,
    })
  }, [])

  let ok = false

  const handleGetPosition = useCallback(
    async (type: string) => {
      if (initialData.idCode) return
      try {
        const { x, y } = await getPosition(type)
        if (x && y) {
          setAuth((prev) => ({
            ...prev,
            lat: y,
            lng: x,
          }))
        }
      } catch (error) {
        console.error(error)
      }
    },
    [setAuth],
  )

  const handleItemType = useCallback((type: string) => {
    switch (type) {
      case '1':
        return 'kmItem'
      case '2':
        return 'gmItem'
      case '3':
        return 'gmItem'
      case '4':
        return 'kwItem'
    }
  }, [])

  const handleDataFetching = async (type: string, idCode: string) => {
    try {
      let response: GetItemResponse | null = null
      switch (type) {
        case '1':
          response = (await getKmItem(idCode)) || null
          setFormData((prev) => ({
            ...prev,
            km: true,
          }))
          setAuth((prev) => ({
            ...prev,
            idCode: idCode,
            id: response?.data?.id ? response?.data.id : '',
          }))
          break
        case '2':
          response = (await getGmItem(idCode)) || null
          setFormData((prev) => ({
            ...prev,
            gm: true,
            gg: true,
          }))
          setAuth((prev) => ({
            ...prev,
            idCode: idCode,
            id: response?.data?.goodsId ? response?.data.goodsId : '',
          }))
          break
        case '3':
          response = (await getGgItem(idCode)) || null
          setFormData((prev) => ({
            ...prev,
            gm: true,
            gg: true,
          }))
          setAuth((prev) => ({
            ...prev,
            idCode: idCode,
            id: response?.data?.goodsId ? response?.data.goodsId : '',
          }))
          break
        case '4':
          response = (await getKwItem(idCode)) || null
          setFormData((prev) => ({
            ...prev,
            kw: true,
          }))
          setAuth((prev) => ({
            ...prev,
            idCode: idCode,
            id: response?.data?.id ? response?.data.id : '',
          }))
          break
      }

      if (response && response.success) {
        const { data } = response

        setSelectedData((prev) => ({
          ...prev,
          [`${handleItemType(type)}`]: data,
        }))

        setAuth((prev) => ({
          ...prev,
          lat: data.y,
          lng: data.x,
          detailLat: data.y,
          detailLng: data.x,
          type: type,
        }))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleParameters = useCallback(
    async (token: string, type: string, idCode?: string, map?: NaverMap) => {
      const delayExecution = (callback: () => void, delay: number) => {
        setTimeout(callback, delay)
      }
      const runDelayedConfirm = async () => {
        if (!ok && window) {
          ok = true
          delayExecution(() => {
            alert('지도 검색은 유료서비스 입니다.')
            window.close()
          }, 500)
        }
      }

      try {
        const response = await handleToken(token, type)
        if (response?.success) {
          const handleAuthenticated = async () => {
            setAuth((prev) => ({
              ...prev,
              isLogin: true,
              isAuth: true,
              role: response.data.authorities,
              isInitialized: true,
            }))
            setFormData((prev) => ({
              ...prev,
              km: type === '1',
              kw: type === '4',
              gm: type === '2' || type === '3',
              gg: type === '3' || type === '2',
              role: response.data.authorities[0],
            }))
            if (!idCode) {
              handleGetPosition(type as string)
            } else {
              await handleDataFetching(type, idCode)
            }
          }
          const handleAnonymous = () => {
            setMapOptions(map as NaverMap)
            setAuth((prev) => ({
              ...prev,
              isLogin: false,
              isAuth: true,
              role: response.data.authorities,
            }))
            setFormData((prev) => ({
              ...prev,
              km: type === '1',
              kw: type === '4',
              gm: type === '2' || type === '3',
              gg: type === '3' || type === '2',
            }))
            runDelayedConfirm()
          }
          if (
            response.data.authorities.includes('ROLE_ANONYMOUS') ||
            response.data.authorities.includes('ROLE_FREE')
          ) {
            setJuso((prev) => ({
              ...prev,
              topSido: '서울특별시',
              topGungu: '서초구',
              topDong: '서초동',
            }))
            handleAnonymous()
            setMapItems(response.data.mapItems as MapItem[])
            setMapList({
              contents: response.data.contents?.contents as MapItems[],
              paging: response.data.contents?.paging as PageInfo,
            })
          } else {
            handleAuthenticated()
          }
        }
      } catch (error) {
        console.error(error)
      }
    },
    [setAuth, setFormData, setJuso, setMapItems, setMapList, setMapOptions],
  )

  useEffect(() => {
    const handleRefresh = async () => {
      if (refreshValue === 'false') {
        setRefreshValue('true')
        return
      }
      if (typeCode && !idCodeValue && initialData.idCode) {
        if (typeCode !== initialData.type) {
          setTypeCode(initialData.type as string)
          const url = `/map?token=${tokenValue}&type=${initialData.type}&idCode=${initialData.idCode}`
          router.push(url)
        }
        const url = `/map?token=${tokenValue}&type=${typeCode}&idCode=${initialData.idCode}`
        router.push(url)
      } else if (typeCode && !idCodeValue && !initialData.idCode) {
        if (typeCode !== initialData.type) {
          setTypeCode(initialData.type as string)
          const url = `/map?token=${tokenValue}&type=${initialData.type}`
          router.push(url)
        }
        const url = `/map?token=${tokenValue}&type=${typeCode}`
        router.push(url)
      } else if (typeCode && idCodeValue && initialData.idCode) {
        if (typeCode !== initialData.type) {
          setTypeCode(initialData.type as string)
          const url = `/map?token=${tokenValue}&type=${initialData.type}&idCode=${initialData.idCode}`
          router.push(url)
        }
        const url = `/map?token=${tokenValue}&type=${typeCode}&idCode=${initialData.idCode}`
        router.push(url)
      } else if (typeCode && idCodeValue && !initialData.idCode) {
        if (typeCode !== initialData.type) {
          setTypeCode(initialData.type as string)
          const url = `/map?token=${tokenValue}&type=${initialData.type}`
          router.push(url)
        }
        const url = `/map?token=${tokenValue}&type=${typeCode}`
        router.push(url)
      }
      setTimeout(() => {
        window.history.replaceState({}, '', '/map')
      }, 1000)
    }
    handleRefresh()
  }, [typeCode, idCodeValue, refreshValue])

  useEffect(() => {
    if (!map) return
    handleParameters(
      initialData.token as string,
      initialData.type as string,
      initialData.idCode as string,
      map,
    )
  }, [
    map,
    initialData.token,
    initialData.type,
    initialData.idCode,
    handleParameters,
  ])

  return <MapSection />
}

export default MapComponent
