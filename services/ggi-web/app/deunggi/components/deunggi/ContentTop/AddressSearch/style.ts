'use client'

import styled from '@emotion/styled'

export const SearchContainer = styled.div`
  width: 95%;
  margin: 0 auto;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
`

export const ContainerTitle = styled.div`
  width: 100%;
  padding: 12px 0;
  background-color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;

  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #6b7280;
  }
`

export const SearchContent = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 28px;
  padding: 36px;
`

export const SearchInput = styled.input`
  width: 67.6%;
  height: 50px;
  border: 1px solid #e5e7eb;
  font-size: 16px;
  font-weight: 400;
  color: #1f2937;
  border-radius: 16px;
  padding: 16px;
  outline: none;
`
