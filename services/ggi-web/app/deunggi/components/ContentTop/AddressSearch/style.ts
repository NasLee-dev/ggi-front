'use client'

import styled from '@emotion/styled'
import { mobile, small, smMedium } from 'app/shared/styles/responsive'

export const SearchContainer = styled.div`
  width: 95%;
  margin: 0 auto;
  border: ${({ theme }) => `1px solid ${theme.colors.border}`};
  border-radius: 12px;
  overflow: hidden;

  @media (max-width: 1250px) {
    width: 100%;
  }
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

  ${mobile} {
    padding: 8px 0;

    h3 {
      font-size: ${({ theme }) => theme.fonts.smallText};
    }
  }
`

export const SearchContent = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 28px;
  padding: 36px;
  box-sizing: border-box;

  ${small} {
    flex-direction: column;
    padding: 20px;
    gap: 15px;

    input {
      width: 100%;
    }

    button {
      width: 100% !important;
    }
  }

  ${mobile} {
    padding: 10px;
    gap: 10px;

    input {
      height: 40px;
      border-radius: 8px;
      padding: 10px;
      font-size: ${({ theme }) => theme.fonts.tinyText};
    }

    button {
      height: 35px;
      font-size: ${({ theme }) => theme.fonts.tinyText};
    }
  }
`

export const SearchInput = styled.input`
  width: 67.6%;
  height: 50px;
  border: ${({ theme }) => `1px solid ${theme.colors.border}`};
  font-size: ${({ theme }) => theme.fonts.text};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text};
  border-radius: 16px;
  padding: 16px;
  outline: none;
`
