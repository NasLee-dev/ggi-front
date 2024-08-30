interface UseItemComponent {
  active?: boolean
  text: string
}

export default function UseItemComponent({ active, text }: UseItemComponent) {
  return (
    <button
      className={`py-[6px] px-2 text-[16px] font-normal ${active ? `text-[#1E40AF]` : 'text-[#6B7280]'}  ${active ? `bg-[#DBEAFE] ` : 'bg-[#F3F4F6] '}rounded-2xl`}
    >
      {text}
    </button>
  )
}
