'use client'

import styled from '@emotion/styled'

interface ButtonProps {
  width?: string
  height?: string
  fontSize?: string
  color?: string
  radius?: string
  backColor?: string
}

export const Button = styled.button<ButtonProps>`
  width: ${({ width }) => (width ? width : '136px')};
  height: ${({ height }) => (height ? height : '50px')};
  background-color: ${({ backColor }) => (backColor ? backColor : '#2563eb')};
  border-radius: ${({ radius }) => (radius ? radius : '8px')};
  font-weight: 700;
  color: ${({ color }) => (color ? color : '#fff')};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '18px')};
`
