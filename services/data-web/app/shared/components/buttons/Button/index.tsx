import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  width?: string
  height?: string
  onClick?: () => void
  className?: string
  styleType: 'colored' | 'plain'
}

const Button = ({
  text,
  width,
  height,
  onClick,
  className = '',
  styleType,
  ...props
}: ButtonProps) => {
  const backgroundColor =
    styleType === 'colored' ? 'bg-[#2563EB]' : 'bg-[#F3F4F6]'

  const textColor = styleType === 'colored' ? 'text-[#fff]' : 'text-[#6B7280]'

  const borderColor =
    styleType === 'colored' ? 'border-[#2563EB]' : 'border-[#E5E7EB]'

  return (
    <button
      onClick={onClick}
      className={`${backgroundColor} ${textColor} font-bold rounded-lg border ${borderColor} ${className} ggi:rounded-2xl`}
      style={{
        width: width || '166px',
        height: height || '50px',
      }}
      {...props}
    >
      {text}
    </button>
  )
}

export default Button
