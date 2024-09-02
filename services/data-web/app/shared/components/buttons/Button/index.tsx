import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  width?: string
  height?: string
  onClick?: () => void
  className?: string
  styleType: 'colored' | 'plain'
}

const Button = ({
  children,
  width = 'w-[166px]',
  height = 'h-[50px]',
  onClick,
  className = '',
  styleType,
  ...props
}: ButtonProps) => {
  const backgroundColor =
    styleType === 'colored'
      ? 'bg-[#2563EB]'
      : styleType === 'plain'
        ? 'bg-[#F3F4F6]'
        : ''

  const textColor =
    styleType === 'colored'
      ? 'text-[#fff]'
      : styleType === 'plain'
        ? 'text-[#6B7280]'
        : ''

  const borderColor =
    styleType === 'colored'
      ? 'border-[#2563EB]'
      : styleType === 'plain'
        ? 'border-[#E5E7EB]'
        : ''

  return (
    <button
      onClick={onClick}
      className={`${width} ${height} ${backgroundColor} ${textColor} font-bold rounded-lg border ${borderColor} ${className} cursor-pointer`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
