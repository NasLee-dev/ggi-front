import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { colors } from 'app/styles/colorPallette'


const opacity = keyframes`
0% {
  opacity: 1;
}

50% {
  opacity: 0.4;
}

100% {
  opacity: 1;
}
`

const Skeleton = styled.div<{
  width: string | number
  height: string | number
}>(({ width, height }) => ({
  width,
  height,
  backgroundColor: colors.gray100,
  animation: `${opacity} 1s ease-in-out 0.5s infinite`,
}))

export default Skeleton
