import { ButtonHTMLAttributes, MouseEvent } from 'react'
import { Button } from './style'

export interface StrokeButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  active?: boolean
  width?: string
  height?: string
  radius?: string
  mobileWidth?: string
  mobileHeight?: string
  mobileRadius?: string
  mobileFontSize?: string
}

export default function StrokeButton({
  text,
  onClick,
  disabled,
  active,
  width,
  height,
  radius,
  mobileWidth,
  mobileHeight,
  mobileRadius,
  mobileFontSize,
  ...props
}: StrokeButtonProps) {
  return (
    <Button
      width={width}
      height={height}
      radius={radius}
      mobileWidth={mobileWidth}
      mobileHeight={mobileHeight}
      mobileRadius={mobileRadius}
      mobileFontSize={mobileFontSize}
      onClick={onClick}
      disabled={disabled}
      active={active}
      {...props}
    >
      {text}
    </Button>
  )
}
