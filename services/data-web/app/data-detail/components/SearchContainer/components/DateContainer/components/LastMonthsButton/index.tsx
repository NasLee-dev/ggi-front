interface LastMonthButtonProps {
  text: string
  onClick: () => void
  active?: boolean
}

export default function LastMonthButton({
  text,
  onClick,
  active,
}: LastMonthButtonProps) {
  return (
    <button
      className={`w-[260px] h-[50px] border ${active ? 'border-[#2563EB]' : 'border-[#E5E7EB]'} rounded-2xl text-[16px] font-bold text-[#6B7280] ggi:w-[32.5%] ggi:h-[42px] ggi:text-[14px]`}
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  )
}
