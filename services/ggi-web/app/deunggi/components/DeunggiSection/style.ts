'use client'

import styled from '@emotion/styled'
import { smMedium } from 'app/shared/styles/responsive'

export const Wrap = styled.div`
  width: 100%;
  padding: 55px 0 100px;
  box-sizing: border-box;

  ${smMedium} {
    padding: 30px 0 50px;
  }
`

export const Container = styled.div`
  width: 1500px;
  margin: 0 auto;

  @media (max-width: 1500px) {
    width: 90%;
  }
`
