'use client'

import styled from '@emotion/styled'
import { mobile, small } from 'app/shared/styles/responsive'

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 17px;

  ${small} {
    align-items: center;
    margin-bottom: 10px;
  }
`

export const SearchResultTitle = styled.h3`
  font-size: ${({ theme }) => theme.fonts.subTitle};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  padding-left: 10px;
  box-sizing: border-box;

  ${mobile} {
    font-size: ${({ theme }) => theme.fonts.text};
    padding-left: 0;
  }
`

export const ModalSpan = styled.span`
  position: relative;

  &::before {
    display: block;
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -12px;
    width: 4px;
    height: 4px;
    background-color: ${({ theme }) => theme.colors.coolGray};
    border-radius: 50%;
  }
`
