import { Button } from '@/components/deunggi/ContentTop/DeunggiInfo/StrokeButton/style'
import { ButtonHTMLAttributes } from 'react'

export interface StrokeButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  onClick: () => void
  active?: boolean
}

export default function StrokeButton({
  text,
  onClick,
  disabled,
  active,
  ...props
}: StrokeButtonProps) {
  return (
    <Button onClick={onClick} disabled={disabled} active={active} {...props}>
      {text}
    </Button>
  )
}
 