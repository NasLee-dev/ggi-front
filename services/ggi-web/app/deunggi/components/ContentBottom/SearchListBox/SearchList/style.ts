'use client'

import styled from '@emotion/styled'
import { small } from 'app/shared/styles/responsive'

export const TableLi = styled.li`
  width: 100%;
  padding: 6px 0;
  min-height: 44px;
  display: flex;
  box-sizing: border-box;

  &:not(:last-child) {
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.border}`};
  }
`

interface TableValueProps {
  width: string
  mobileWidth?: string
}

export const TableValue = styled.div<TableValueProps>`
  width: ${({ width }) => width};
  font-size: ${({ theme }) => theme.fonts.text};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.45;

  ${small} {
    width: ${({ width, mobileWidth }) => (mobileWidth ? mobileWidth : width)};
    font-size: ${({ theme }) => theme.fonts.smallText};
  }
`
