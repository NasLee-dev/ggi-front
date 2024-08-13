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
  border: ${({ isCheck }) =>
    isCheck ? '1px solid #2563eb' : '1px solid #e5e7eb'};
  border-radius: 4px;
  background-color: ${({ isCheck }) => (isCheck ? '#2563eb' : '#fff')};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`
