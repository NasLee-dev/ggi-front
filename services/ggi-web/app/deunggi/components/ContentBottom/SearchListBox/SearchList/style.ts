'use client'

import styled from '@emotion/styled'

export const TableLi = styled.li`
  width: 100%;
  padding: 6px 0;
  min-height: 44px;
  display: flex;
  box-sizing: border-box;

  &:not(:last-child) {
    border-bottom: 1px solid #e5e7eb;
  }
`

interface TableValueProps {
  width: string
}

export const TableValue = styled.div<TableValueProps>`
  width: ${({ width }) => width};
  font-size: 16px;
  font-weight: 400;
  color: #1f2937;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.45;
`
