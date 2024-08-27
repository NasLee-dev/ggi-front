'use client'

import styled from '@emotion/styled'
import { small } from 'app/shared/styles/responsive'

export const HeaderContainer = styled.header`
  width: 100%;
  height: 88px;
  padding: 0 24px;
  background-color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  ${small} {
    height: 60px;
    padding: 0 12px;

    & img {
      width: 100px !important;
      height: 32px !important;
    }
  }
`

export const EndButton = styled.button`
  width: 84px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.coolGray};
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  color: #fff;

  ${small} {
    width: 70px;
    height: 35px;
    font-size: ${({ theme }) => theme.fonts.smallText};
  }
`
