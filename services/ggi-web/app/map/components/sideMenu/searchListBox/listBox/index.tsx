'use client'
import Flex from 'app/map/components/shared/Flex'
import { css } from '@emotion/react'
import { useRecoilValue } from 'recoil'
import { formDataAtom, mapListAtom } from '@/store/atom/map'
import { authInfo } from '@/store/atom/auth'
import { useCallback } from 'react'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { NaverMap } from '@/models/map/Map'
import { queryKey } from 'app/map/components/sections/hooks/useMap'
import Result from './Result'

interface ListBoxProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  dragStateRef: React.MutableRefObject<boolean>
  setOpenOverlay: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ListBox({
  isOpen,
  setIsOpen,
  dragStateRef,
  setOpenOverlay,
}: ListBoxProps) {
  const formData = useRecoilValue(formDataAtom)
  const mapListItems = useRecoilValue(mapListAtom)
  const auth = useRecoilValue(authInfo)
  const { data: map }: UseQueryResult<NaverMap> = useQuery({
    queryKey: queryKey,
    enabled: false,
  })

  const handleCalcHeight = useCallback(() => {
    if (isOpen) {
      if (formData.lastFilter === 1 && formData.isSubFilterBoxOpen) {
        return 'calc(100vh - 390px)'
      }

      if (formData.lastFilter === 2 && formData.isSubFilterBoxOpen) {
        if (map && map.getZoom() >= 15) {
          return 'calc(100vh - 440px)'
        }
        if (map && map.getZoom() < 15) {
          return '150px'
        }
      }

      if (formData.lastFilter === 3 && formData.isSubFilterBoxOpen) {
        return 'calc(100vh - 380px)'
      }

      if (formData.lastFilter === 4 && formData.isSubFilterBoxOpen) {
        return 'calc(100vh - 380px)'
      }

      if (
        map &&
        map.getZoom() >= 15 &&
        (mapListItems?.contents?.length as number) > 0
      ) {
        return 'calc(100vh - 160px)'
      }

      if (auth?.id !== '' && map && map.getZoom() >= 15) {
        if ((mapListItems?.contents?.length as number) > 0) {
          return 'calc(100vh - 160px)'
        }
        return 'calc(100vh - 160px)'
      }
      return '160px'
    }
    return '59px'
  }, [
    auth.id,
    formData.isSubFilterBoxOpen,
    formData.lastFilter,
    isOpen,
    map,
    mapListItems,
  ])
  return (
    <Flex
      css={ContainerStyle}
      direction="column"
      style={{
        height: handleCalcHeight(),
      }}
      onClick={() => {
        setOpenOverlay(false)
      }}
    >
      <Result
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dragStateRef={dragStateRef}
      />
    </Flex>
  )
}

const ContainerStyle = css`
  width: 375px;
  z-index: 10;
  border-radius: 16px;
  border: 1px solid #e0e0e0;
  background-color: white;
  position: relative;
  top: 1%;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  z-index: 100;
`
