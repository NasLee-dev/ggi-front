import { css } from '@emotion/react'
import { Dispatch, SetStateAction } from 'react'
import Carousel from './Carousel'
import Flex from '../shared/Flex'

interface TopProps {
  nowIndex: number
  setNowIndex: Dispatch<SetStateAction<number>>
}

export default function Top({ nowIndex, setNowIndex }: TopProps) {
  return (
    <Flex css={ContainerStyle}>
      <Carousel nowIndex={nowIndex} setNowIndex={setNowIndex} />
    </Flex>
  )
}

const ContainerStyle = css`
  width: 300px;
  height: 180px;
  border-radius: 8px 8px 0px 0px;
`
