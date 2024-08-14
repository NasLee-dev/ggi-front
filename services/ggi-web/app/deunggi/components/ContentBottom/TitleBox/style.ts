'use client'

import styled from '@emotion/styled'

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 17px;
`

export const SearchResultTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  padding-left: 10px;
  box-sizing: border-box;
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
    background-color: #6b7280;
    border-radius: 50%;
  }
`
