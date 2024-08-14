/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useRef, useState } from 'react'
import { NaverMap } from '@/models/map/Map'
import useMap from './hooks/useMap'
import useMapUtils from './hooks/useMapUtils'
import GGIMap from './GGIMap'
import BoxGuard from '../sideMenu/BoxGuard'
import SearchBox from '../sideMenu/searchListBox'
import ListBox from '../sideMenu/searchListBox/listBox'
import Flex from 'app/map/components/shared/Flex'
import TopBar from '../top'
import AddressContainer from '../top/AddressContainer'
import BottomAddress from '../top/BottomAddress'
import Markers from '../sideMenu/markers/Markers'
import Clusterings from '../sideMenu/markers/Clusterings'
import Overlay from '../overlay'

const isHalfWindow = () => window.innerWidth < 768

export default function MapSection() {
  const [openCursor, setOpenCursor] = useState<boolean>(false)
  const markerClickedRef = useRef<boolean>(false)
  const [halfDimensions, setHalfDimensions] = useState({
    width: 0,
    height: 0,
  })
  const [range, setRange] = useState<number>(0)
  const dragStateRef = useRef(false)
  const {
    mapCount,
    setMapCount,
    openOverlay,
    setOpenOverlay,
    isOpen,
    setIsOpen,
    clickedMapType,
    setClickedMapType,
  } = useMapUtils()

  const { initMap } = useMap()

  const onLoadMap = (map: NaverMap) => {
    initMap(map)
  }
  console.log(openOverlay)
  return (
    <div>
      <GGIMap
        onLoad={onLoadMap}
        zoom={16}
        clickedMapType={clickedMapType}
        setMapCount={setMapCount}
        markerClickedRef={markerClickedRef}
        setOpenOverlay={setOpenOverlay}
        setClickedMapType={setClickedMapType}
        setHalfDimensions={setHalfDimensions}
        dragStateRef={dragStateRef}
        openCursor={openCursor}
        setOpenCursor={setOpenCursor}
      />
      <BoxGuard isOpen={isOpen}>
        <SearchBox setOpenOverlay={setOpenOverlay} />
        <ListBox
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          dragStateRef={dragStateRef}
          setOpenOverlay={setOpenOverlay}
        />
      </BoxGuard>
      <Flex
        direction="column"
        style={{
          display: isHalfWindow() ? 'none' : 'flex',
        }}
      >
        <TopBar openCursor={openCursor}>
          <AddressContainer
            openCursor={openCursor}
            setOpenCursor={setOpenCursor}
            range={range}
            setRange={setRange}
            setOpenOverlay={setOpenOverlay}
          />
        </TopBar>
        {openCursor && (
          <BottomAddress
            range={range}
            setRange={setRange}
            setOpenCursor={setOpenCursor}
          />
        )}
      </Flex>
      <Markers
        openOverlay={openOverlay}
        setOpenOverlay={setOpenOverlay}
        markerClickedRef={markerClickedRef}
      />
      <Clusterings item={mapCount} />
      {openOverlay && (
        <Overlay halfDimensions={halfDimensions} openOverlay={openOverlay} />
      )}
    </div>
  )
}
