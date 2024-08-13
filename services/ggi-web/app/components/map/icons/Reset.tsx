'use client'
import styled from '@emotion/styled'
import Flex from 'app/components/shared/Flex'
import { useState } from 'react'
import Info from './Info'

export default function Reset() {
  const [isHover, setIsHover] = useState(false)
  return (
    <Flex
      style={{
        position: 'relative',
      }}
    >
      <ContainerStyle
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <TextStyle>전체 초기화</TextStyle>
      </ContainerStyle>
      <Flex
        style={{
          position: 'absolute',
          top: '-30px',
          right: '-150px',
          zIndex: 1000,
        }}
      >
        {isHover && <Info />}
      </Flex>
    </Flex>
  )
}

const ContainerStyle = styled.div`
  display: inline-flex;
  width: 80px;
  height: 28px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 100px;
  border: 0.5px solid #9d9999;
  background: #fcfcfc;
  cursor: pointer;
  &:hover {
    background: #a6a6a6;
  }
`
const TextStyle = styled.span`
  color: #545454;
  text-align: center;
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 135%; /* 18.9px */
  letter-spacing: -0.28px;
  &:hover {
    color: white;
  }
`
