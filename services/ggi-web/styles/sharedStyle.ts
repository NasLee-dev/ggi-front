'use client'

import styled from '@emotion/styled'
import { mobile } from 'app/shared/styles/responsive'

interface FlexColumnProps {
  center?: boolean
  gap?: number
}

export const FlexColumn = styled.div<FlexColumnProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: ${({ center }) => (center ? 'center' : 'flex-start')};
  gap: ${({ gap }) => (gap ? `${gap}px` : '0')};
`

interface FlexBetweenProps {
  mb?: number
  gap?: number
}

export const FlexBetween = styled.div<FlexBetweenProps>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : '0')};
  gap: ${({ gap }) => (gap ? `${gap}px` : '0')};
`

interface FlexProps {
  mb?: number
  gap?: number
  mobileGap?: number
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  align-items: center;
  gap: ${({ gap }) => (gap ? `${gap}px` : '0')};
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : '0')};

  ${mobile} {
    gap: ${({ mobileGap, gap }) => (mobileGap ? `${mobileGap}px` : `${gap}px`)};
  }
`
