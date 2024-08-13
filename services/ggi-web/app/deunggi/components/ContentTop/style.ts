'use client'

import styled from '@emotion/styled'

export const ContentHead = styled.div`
  width: 100%;
  padding-bottom: 15px;
  border-bottom: 3px solid #e5e7eb;
  margin-bottom: 105px;
`

export const HeadTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 70px;
  margin-bottom: 30px;

  @media (max-width: 1250px) {
    flex-direction: column-reverse;
    gap: 20px;
  }
`
