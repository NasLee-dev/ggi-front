'use client'

import styled from '@emotion/styled'

export const HideCheckbox = styled.input`
  display: none;
`

interface CustomCheckboxProps {
  isCheck: boolean
}

export const CustomCheckbox = styled.label<CustomCheckboxProps>`
  width: 16px;
  height: 16px;
  border: ${({ isCheck, theme }) =>
    isCheck
      ? `1px solid ${theme.colors.primary}`
      : `1px solid ${theme.colors.border}`};
  border-radius: 4px;
  background-color: ${({ isCheck, theme }) =>
    isCheck ? theme.colors.primary : '#fff'};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`
