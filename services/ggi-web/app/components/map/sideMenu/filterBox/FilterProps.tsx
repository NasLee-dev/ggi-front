'use client'
import Flex from 'app/components/shared/Flex'
import Text from 'app/components/shared/Text'
import { css } from '@emotion/react'

interface FilterType {
  dataType: boolean
  colorType: string
  bgColorType: string
  onButtonClick: () => void
  textType: string
}

export default function FilterProps({
  dataType,
  colorType,
  bgColorType,
  onButtonClick,
  textType,
}: FilterType) {
  return (
    <Flex
      css={FilterStyle}
      style={{
        backgroundColor: dataType ? bgColorType : 'white',
        border: dataType ? `1px solid ${colorType}` : '1px solid #9D9999',
        borderRadius: '8px',
      }}
      onClick={() => {
        onButtonClick()
      }}
    >
      <Text
        style={{
          color: dataType ? colorType : '#9D9999',
        }}
        typography="t4"
        fontWeight="600"
      >
        {textType}
      </Text>
    </Flex>
  )
}

const FilterStyle = css`
  display: flex;
  font-family: 'suit';
  font-size: 18px;
  font-weight: 600;
  color: #333333;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 47px;
  text-align: center;
  line-height: 21.6px;
  letter-spacing: -1%;
  cursor: pointer;
`
