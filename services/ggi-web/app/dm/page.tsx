'use client'

import emotionStyled from '@emotion/styled'
import { useState } from 'react'

export default function DmPage() {
  const [isOpen, setIsOpen] = useState(false)
  return <Container isOpen={isOpen}>asdkjl</Container>
}

const Container = emotionStyled.div<{ isOpen: boolean }>`
  background-color: #333333;
  height: ${({ isOpen }) => (isOpen ? 'calc(100% - 60px)' : '0px')};
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
`
