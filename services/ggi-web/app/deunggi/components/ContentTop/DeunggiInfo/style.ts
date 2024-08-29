'use client'

import styled from '@emotion/styled'
import { mobile } from 'app/shared/styles/responsive'

export const Title = styled.h2`
  font-family: 'Inter', sans-serif !important;
  font-size: ${({ theme }) => theme.fonts.title};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};

  ${mobile} {
    font-size: ${({ theme }) => theme.fonts.text};
  }
`

export const Description = styled.div`
  min-height: 105px;
  font-family: 'Inter', sans-serif !important;
  font-size: ${({ theme }) => theme.fonts.text};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.45;
  position: relative;

  a {
    font-size: ${({ theme }) => theme.fonts.text};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
    margin-left: 20px;
  }

  ${mobile} {
    font-size: ${({ theme }) => theme.fonts.smallText};

    a {
      font-size: ${({ theme }) => theme.fonts.smallText};
      margin-left: 10px;
    }
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 1250px) {
    width: 100%;
    justify-content: center;
  }
`

export const BrComponent = styled.br`
  @media (max-width: 1500px) {
    display: none;
  }
`
