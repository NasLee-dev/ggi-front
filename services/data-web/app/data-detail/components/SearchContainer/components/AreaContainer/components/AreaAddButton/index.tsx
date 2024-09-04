import { ButtonHTMLAttributes } from 'react'

interface AreaAddButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void
  disabled?: boolean
}

export default function AreaAddButton({
  onClick,
  disabled,
  ...props
}: AreaAddButtonProps) {
  return (
    <button
      className="w-[50px] h-[50px] border border-[#E5E7EB] rounded-2xl flex justify-center items-center ggi:w-full ggi:h-[42px] hover-btn"
      disabled={disabled}
      {...props}
      onClick={onClick}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 12H19"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 5V19"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
