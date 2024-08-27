import { isPyeongState } from '@/store/atom/map'
import { css } from '@emotion/react'
import { Dispatch, SetStateAction } from 'react'
import { useRecoilState } from 'recoil'
import Flex from '../shared/Flex'
import InterestBtn from './InterestBtn'
import CadastralBtn from './CadastralBtn'
import RoadviewBtn from './RoadviewBtn'
import CurrentBtn from './CurrentBtn'
import ToolsBtn from './ToolsBtn'
import { Pyeong } from './styled/MeasureStyle'
import { PyeongBtn } from './PyeongBtn'

interface MapTypeProps {
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
  setOpenOverlay: Dispatch<SetStateAction<boolean>>
}

export default function MapFunction({
  clickedMapType,
  setClickedMapType,
  setOpenOverlay,
}: MapTypeProps) {
  const [isPyeong, setIsPyeong] = useRecoilState(isPyeongState)
  const handleTogglePyeong = () => {
    setIsPyeong((prev) => !prev)
    setOpenOverlay(false)
  }
  return (
    <Flex
      css={ContainerStyle}
      onClick={() => {
        setOpenOverlay(false)
      }}
    >
      <InterestBtn
        clickedMapType={clickedMapType}
        setClickedMapType={setClickedMapType}
      />
      <CadastralBtn
        clickedMapType={clickedMapType}
        setClickedMapType={setClickedMapType}
      />
      <RoadviewBtn
        clickedMapType={clickedMapType}
        setClickedMapType={setClickedMapType}
      />
      <CurrentBtn />
      <ToolsBtn
        clickedMapType={clickedMapType}
        setClickedMapType={setClickedMapType}
      />
      <Pyeong onClick={handleTogglePyeong}>
        <PyeongBtn isPyeong={isPyeong} />
      </Pyeong>
    </Flex>
  )
}

const ContainerStyle = css`
  width: 45px;
  height: 330px;
  flex-direction: column;
  position: absolute;
  top: 20%;
  right: 20px;
  gap: 5px;
`
