'use client'

import styled from '@emotion/styled'

export const SearchContainer = styled.div`
  width: 95%;
  margin: 0 auto;
  border: ${({ theme }) => `1px solid ${theme.colors.border}`};
  border-radius: 12px;
  overflow: hidden;
`

export const ContainerTitle = styled.div`
  width: 100%;
  padding: 12px 0;
  background-color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.border}`};
  box-sizing: border-box;

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
  box-sizing: border-box;
`

export const SearchInput = styled.input`
  width: 67.6%;
  height: 50px;
  border: ${({ theme }) => `1px solid ${theme.colors.border}`};
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text};
  border-radius: 16px;
  padding: 16px;
  outline: none;
`
