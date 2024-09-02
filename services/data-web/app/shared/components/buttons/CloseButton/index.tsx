import { ButtonHTMLAttributes, HTMLAttributes } from 'react'

interface CloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void
}
export default function CloseButton({ onClick, ...props }: CloseButtonProps) {
  return (
    <button {...props} onClick={onClick}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4L4 12"
          stroke="#1F2937"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 4L12 12"
          stroke="#1F2937"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
