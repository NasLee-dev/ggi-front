'use client'

import styled from '@emotion/styled'
import { mobile } from 'app/shared/styles/responsive'

interface ButtonProps {
  active?: boolean
  width?: string
  height?: string
  radius?: string
  mobileWidth?: string
  mobileHeight?: string
  mobileRadius?: string
  mobileFontSize?: string
}

export const Button = styled.button<ButtonProps>`
  width: ${({ width }) => (width ? width : '160px')};
  height: ${({ height }) => (height ? height : '50px')};
  background-color: ${({ active }) => (active ? '#F3F8FF' : '#fff')};
  border-radius: ${({ radius }) => (radius ? radius : '16px')};
  font-weight: 700;
  color: ${({ active, theme }) => (active ? theme.colors.primary : '#6b7280')};
  font-size: 18px;
  border: ${({ active, theme }) =>
    active
      ? `1px solid ${theme.colors.primary}`
      : `1px solid ${theme.colors.border}`};

  ${mobile} {
    width: ${({ mobileWidth, width }) => (mobileWidth ? mobileWidth : width)};
    height: ${({ mobileHeight, height }) =>
      mobileHeight ? mobileHeight : height};
    border-radius: ${({ mobileRadius, radius }) =>
      mobileRadius ? mobileRadius : radius};
    font-size: ${({ mobileFontSize }) =>
      mobileFontSize ? mobileFontSize : '18px'};
  }
`
