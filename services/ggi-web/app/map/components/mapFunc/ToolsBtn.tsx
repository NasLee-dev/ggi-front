import { Dispatch, SetStateAction } from 'react'
import { NaverMap } from 'app/map/models/map/Map'
import { Measure } from './Measure'

declare global {
  interface Window {
    naver: NaverMap
  }
}

interface ToolsBtnProps {
  clickedMapType: {
    basic: boolean
    terrain: boolean
    satellite: boolean
    cadastral: boolean
    interest: boolean
    roadView: boolean
    current: boolean
    distance: boolean
    area: boolean
  }
  setClickedMapType: Dispatch<
    SetStateAction<{
      basic: boolean
      terrain: boolean
      satellite: boolean
      cadastral: boolean
      interest: boolean
      roadView: boolean
      current: boolean
      distance: boolean
      area: boolean
    }>
  >
}

export default function ToolsBtn({
  clickedMapType,
  setClickedMapType,
}: ToolsBtnProps) {
  return (
    <Measure
      clickedMapType={clickedMapType}
      setClickedMapType={setClickedMapType}
    />
  )
}
