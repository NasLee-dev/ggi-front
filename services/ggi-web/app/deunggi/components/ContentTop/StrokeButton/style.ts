'use client'

import styled from '@emotion/styled'

interface ButtonProps {
  active?: boolean
  width?: string
  height?: string
  radius?: string
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
`
