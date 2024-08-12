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
}

export default function StrokeButton({
  text,
  onClick,
  disabled,
  active,
  width,
  height,
  radius,
  ...props
}: StrokeButtonProps) {
  return (
    <Button
      width={width}
      height={height}
      radius={radius}
      onClick={onClick}
      disabled={disabled}
      active={active}
      {...props}
    >
      {text}
    </Button>
  )
}
