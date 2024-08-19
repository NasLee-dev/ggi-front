import { ButtonHTMLAttributes, MouseEvent } from 'react'
import { Button } from './style'

export interface DefaultButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string
  mobileWidth?: string
  height?: string
  mobileHeight?: string
  text: string
  fontSize?: string
  color?: string
  radius?: string
  backColor?: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  mobileFontSize?: string
}

export default function DefaultButton({
  width,
  mobileWidth,
  height,
  mobileHeight,
  text,
  fontSize,
  color,
  radius,
  backColor,
  onClick,
  disabled,
  mobileFontSize,
  ...props
}: DefaultButtonProps) {
  return (
    <Button
      width={width}
      height={height}
      mobileWidth={mobileWidth}
      mobileHeight={mobileHeight}
      fontSize={fontSize}
      color={color}
      radius={radius}
      backColor={backColor}
      onClick={onClick}
      disabled={disabled}
      mobileFontSize={mobileFontSize}
      {...props}
    >
      {text}
    </Button>
  )
}
