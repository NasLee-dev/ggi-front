'use client'

import styled from '@emotion/styled'
import { small } from 'app/shared/styles/responsive'

export const ListContainer = styled.div`
  width: 100%;
  border: ${({ theme }) => `1px solid ${theme.colors.border}`};
  border-radius: 16px;
  overflow-x: auto;
`

export const ListHead = styled.ul`
  display: flex;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.border}`};
`

interface HeadListProps {
  width: string
  mobileWidth?: string
}
export const HeadList = styled.li<HeadListProps>`
  width: ${({ width }) => width};
  padding: 15px 0;
  font-size: ${({ theme }) => theme.fonts.text};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.coolGray};
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  ${small} {
    width: ${({ width, mobileWidth }) => (mobileWidth ? mobileWidth : width)};
    font-size: ${({ theme }) => theme.fonts.smallText};
  }
`

export const EmptyContent = styled.div`
  width: 100%;
  padding: 180px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fonts.text};
  font-weight: 400;
  color: #000;
  box-sizing: border-box;

  ${small} {
    font-size: ${({ theme }) => theme.fonts.smallText};
  }
`

interface TableContainerProps {
  width: string
}
export const TableContainer = styled.div<TableContainerProps>`
  width: 100%;

  ${small} {
    width: ${({ width }) => width};
  }
`

export const ListContent = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
`
