'use client'

import styled from '@emotion/styled'

export const PaginationContainer = styled.div`
  width: 492px;
  padding: 20px 0;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px auto 0;
  gap: 10px;
  box-sizing: border-box;
`

export const MoveButton = styled.button`
  width: 120px;
  height: 38px;
  background-color: #fff;
  border: ${({ theme }) => `1px solid ${theme.colors.border}`};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-family: 'Inter', sans-serif;

  &:disabled {
    opacity: 0.7;
    cursor: default;
  }

  span {
    font-size: 16px;
    font-weight: 500;
    color: #6b7280;

    &.move-img {
      color: #4b5563;
    }
  }
`

export const ButtonContainer = styled.div`
  display: flex;
`

interface PageButtonProps {
  active: boolean
}
export const PageButton = styled.button<PageButtonProps>`
  width: 38px;
  height: 38px;
  font-size: 16px;
  font-weight: 500;
  color: #6b7280;
  font-family: 'SUIT', sans-serif;
  border-radius: 4px;

  background: ${({ active, theme }) => (active ? theme.colors.border : 'none')};
`
