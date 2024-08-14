'use client'

import styled from '@emotion/styled'

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`

export const Description = styled.div`
  min-height: 105px;
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.45;
  position: relative;

  a {
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
    margin-left: 20px;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
