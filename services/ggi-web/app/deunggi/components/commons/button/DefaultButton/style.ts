'use client'

import styled from '@emotion/styled'
import { mobile } from 'app/shared/styles/responsive'

interface ButtonProps {
  width?: string
  mobileWidth?: string
  height?: string
  mobileHeight?: string
  fontSize?: string
  color?: string
  radius?: string
  backColor?: string
  mobileFontSize?: string
}

export const Button = styled.button<ButtonProps>`
  width: ${({ width }) => (width ? width : '136px')};
  height: ${({ height }) => (height ? height : '50px')};
  background-color: ${({ backColor, theme }) =>
    backColor ? backColor : theme.colors.primary};
  border-radius: ${({ radius }) => (radius ? radius : '8px')};
  font-weight: 700;
  color: ${({ color }) => (color ? color : '#fff')};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '18px')};

  ${mobile} {
    width: ${({ mobileWidth, width }) => (mobileWidth ? mobileWidth : width)};
    height: ${({ mobileHeight, height }) =>
      mobileHeight ? mobileHeight : height};
    font-size: ${({ mobileFontSize, fontSize }) =>
      mobileFontSize ? mobileFontSize : fontSize};
  }
`
