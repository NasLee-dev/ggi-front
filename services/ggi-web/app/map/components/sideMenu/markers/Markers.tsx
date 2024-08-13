import { Dispatch, MutableRefObject, SetStateAction, useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import {
  isOnlySelectedAtom,
  mapItemsAtom,
  selectedItemAtom,
} from '@/store/atom/map'
import { MapItem } from '@/models/map/MapItem'
import { authInfo } from '@/store/atom/auth'
import Marker from './Marker'

interface MarkersProps {
  openOverlay: boolean
  setOpenOverlay: Dispatch<SetStateAction<boolean>>
  markerClickedRef: MutableRefObject<boolean> | null
}

export default function Markers({
  openOverlay,
  setOpenOverlay,
  markerClickedRef,
}: MarkersProps) {
  const mapItems = useRecoilValue(mapItemsAtom)
  const auth = useRecoilValue(authInfo)
  const selectedItem = useRecoilValue(selectedItemAtom)
  const isOnlySelected = useRecoilValue(isOnlySelectedAtom)
  const handleOnlySelected = useCallback(() => {
    if (isOnlySelected) {
      const idToFilter =
        auth.type === '1'
          ? selectedItem?.kmItem?.id
          : auth.type === '2' || auth.type === '3'
            ? selectedItem?.gmItem?.goodsId
            : selectedItem?.kwItem?.id
      if (idToFilter) {
        const filteredItems: MapItem[] = mapItems.filter((item: MapItem) =>
          item.ids.includes(idToFilter),
        )
        if (filteredItems.length > 0) {
          return filteredItems.map((item) => ({
            ...item,
            count: item.ids.includes(idToFilter) ? 1 : item.count,
          }))
        }
        return filteredItems
      }
      return []
    } else {
      return mapItems
    }
  }, [isOnlySelected, mapItems, selectedItem, auth.type])
  return (
    <>
      {handleOnlySelected()?.map((item, index) => {
        return (
          <Marker
            key={index}
            item={item}
            openOverlay={openOverlay}
            setOpenOverlay={setOpenOverlay}
            markerClickedRef={markerClickedRef as MutableRefObject<boolean>}
            index={index}
          />
        )
      })}
    </>
  )
}
