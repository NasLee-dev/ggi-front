import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 6px solid #f3f3f3; /* 바깥 테두리 */
  border-top: 6px solid #3498db; /* 위쪽 테두리만 색을 지정하여 회전 효과 */
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`
export default function Loading() {
  return (
    <div>
      <Spinner />
    </div>
  )
}
