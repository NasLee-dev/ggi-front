import { Button } from '@/components/commons/buttons/DefaultButton/style'
import { ButtonHTMLAttributes } from 'react'

export interface DefaultButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string
  height?: string
  text: string
  fontSize?: string
  color?: string
  radius?: string
  backColor?: string
  onClick: () => void
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
