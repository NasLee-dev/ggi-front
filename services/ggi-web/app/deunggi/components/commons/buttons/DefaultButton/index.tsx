import { ButtonHTMLAttributes, MouseEvent } from 'react'
import { Button } from './style'

export interface DefaultButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string
  height?: string
  text: string
  fontSize?: string
  color?: string
  radius?: string
  backColor?: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}

export default function DefaultButton({
  width,
  height,
  text,
  fontSize,
  color,
  radius,
  backColor,
  onClick,
  disabled,
  ...props
}: DefaultButtonProps) {
  return (
    <Button
      width={width}
      height={height}
      fontSize={fontSize}
      color={color}
      radius={radius}
      backColor={backColor}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {text}
    </Button>
  )
}
