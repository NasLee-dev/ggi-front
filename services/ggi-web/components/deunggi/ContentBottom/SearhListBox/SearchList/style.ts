'use client'

import styled from '@emotion/styled'

export const SearchLi = styled.li`
  width: 100%;
  padding: 12px 0;
  display: flex;

  &:not(:last-child) {
    border-bottom: 1px solid #e5e7eb;
  }
`

interface SearchValueProps {
  width: string
}

export const SearchValue = styled.div<SearchValueProps>`
  width: ${({ width }) => width};
  font-size: 16px;
  font-weight: 400;
  color: #1f2937;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.45;
`
