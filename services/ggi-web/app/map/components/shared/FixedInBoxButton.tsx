'use client'
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import Button from './Button'
import { colors } from 'app/styles/colorPallette'

interface FixedBottomButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

export default function FixedInBoxButton({
  label,
  onClick,
  disabled,
}: FixedBottomButtonProps) {
  const $portalRoot = document.getElementById('root-portal')

  if ($portalRoot == null) {
    return null
  }
  return (
    <Container>
      <Button
        size="medium"
        disabled={disabled}
        full={true}
        onClick={onClick}
        css={buttonStyles}
      >
        {label}
      </Button>
    </Container>
  )
}

const slideup = keyframes`
  to {
    transform: translateY(0);
  }
`

const Container = styled.div`
  position: absolute;
  left: 10;
  right: 10;
  bottom: 10px;
  width: 335px;
  justify-content: center;
  akign-items: center;
  background-color: ${colors.white};
  transform: translateY(100%);
  animation: ${slideup} 0.5s ease-in-out forwards;
`

const buttonStyles = css`
  border-radius: 8px;
  background-color: #332efc;
  color: #fff;
  text-align: center;
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 135%;
  letter-spacing: -0.16px;
`
