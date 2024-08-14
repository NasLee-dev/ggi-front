import { MapItem } from '@/models/map/MapItem'
import { Dispatch, MutableRefObject, SetStateAction } from 'react'
import MarkerRenderer from './MarkerRenderer'

interface MarkerProps {
  item: MapItem
  openOverlay: boolean
  setOpenOverlay: Dispatch<SetStateAction<boolean>>
  markerClickedRef: MutableRefObject<boolean>
  index: number
}

const Marker = ({
  item,
  openOverlay,
  setOpenOverlay,
  markerClickedRef,
  index,
}: MarkerProps) => {
  return (
    <MarkerRenderer
      item={item}
      index={index}
      openOverlay={openOverlay}
      setOpenOverlay={setOpenOverlay}
      markerClickedRef={markerClickedRef}
    />
  )
}

export default Marker
