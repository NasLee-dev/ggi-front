'use client'

import styled from '@emotion/styled'

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
`

export const Description = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #1f2937;
  line-height: 1.45;
  position: relative;

  a {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 16px;
    font-weight: 600;
    color: #2563eb;
    text-decoration: underline;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 35px;
`
