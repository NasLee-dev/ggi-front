'use client'

import styled from '@emotion/styled'

export const Box = styled.div`
  min-width: 540px;
  padding: 25px;
  background-color: #fff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-sizing: border-box;
`

export const ProfileName = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
`

export const CashBox = styled.div`
  width: 100%;
  padding: 20px 16px;
  background-color: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`

export const CashTitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: 16px;
    font-weight: 400;
    color: #4b5563;
  }
`

export const CashValue = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #2563eb;

  span {
    color: #4b5563;
  }
`
