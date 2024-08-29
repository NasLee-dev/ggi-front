import { css } from '@emotion/react'
import Flex from '../shared/Flex'
import Text from '../shared/Text'

export default function TitlePage({ title }: { title: string }) {
  return (
    <Flex>
      <Text css={TitleStyle}>{title}</Text>
    </Flex>
  )
}

const TitleStyle = css`
  color: #000001;
  font-family: SUIT;
  font-size: 21px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: -0.21px;
`
