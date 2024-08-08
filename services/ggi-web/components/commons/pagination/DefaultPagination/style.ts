'use client'

import styled from '@emotion/styled'

export const PaginationContainer = styled.div`
  width: 492px;
  padding: 20px 0;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px auto 0;
  gap: 10px;
`

export const MoveButton = styled.button`
  width: 120px;
  height: 38px;
  background-color: #fff;
  border: 1px solid #e5e7eb;
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
