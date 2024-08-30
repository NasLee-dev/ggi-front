interface LastMonthButtonProps {
  text: string
  onClick: () => void
}

export default function LastMonthButton({
  text,
  onClick,
}: LastMonthButtonProps) {
  return (
    <button
      className="w-[260px] h-[50px] border border-[#E5E7EB] rounded-2xl text-[16px] font-bold text-[#6B7280]"
      onClick={onClick}
    >
      {text}
    </button>
  )
}
