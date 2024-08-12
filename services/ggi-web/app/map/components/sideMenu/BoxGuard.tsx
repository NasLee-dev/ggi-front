import Flex from '../shared/Flex'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { NaverMap } from '@/models/Map'
import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { mapListAtom } from '@/store/atom/map'
import { queryKey } from '../sections/hooks/useMap'

export default function BoxGuard({
  children,
  isOpen,
}: {
  children: React.ReactNode
  isOpen: boolean
}) {
  const { data: map }: UseQueryResult<NaverMap> = useQuery({
    queryKey: queryKey,
    enabled: false,
  })
  const mapListItems = useRecoilValue(mapListAtom)
  const handleCalcHeight = useCallback(() => {
    if (isOpen) {
      if (map && map.getZoom() >= 15) {
        if (mapListItems?.contents?.length === 0) {
          return ''
        }
        return '98%'
      }
      if (map && map.getZoom() < 15) {
        return ''
      }
    }
    return ''
  }, [isOpen, map, mapListItems])

  return (
    <Flex
      style={{
        top: '1%',
        left: '1%',
        zIndex: 10,
        backgroundColor: 'none',
        position: 'fixed',
        justifyContent: 'start',
        alignItems: 'center',
        flexDirection: 'column',
        height: handleCalcHeight(),
        gap:
          (map && map.getZoom() < 15) ||
          mapListItems?.contents?.length === 0 ||
          !isOpen
            ? '19px'
            : '10px',
      }}
    >
      {children}
    </Flex>
  )
}
