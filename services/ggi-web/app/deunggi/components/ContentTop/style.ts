'use client'

import styled from '@emotion/styled'
import { medium, mobile, smMedium } from 'app/shared/styles/responsive'

export const ContentHead = styled.div`
  width: 100%;
  padding-bottom: 15px;
  border-bottom: ${({ theme }) => `3px solid ${theme.colors.border}`};
  margin-bottom: 105px;
  box-sizing: border-box;

  ${smMedium} {
    margin-bottom: 50px;
  }

  ${mobile} {
    margin-bottom: 30px;
  }
`

export const HeadTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 70px;
  margin-bottom: 30px;

  ${medium} {
    flex-direction: column-reverse;
    gap: 20px;
  }
`
