interface FilterCheckIconProps {
  active?: boolean
}

export default function FilterCheckIcon({ active }: FilterCheckIconProps) {
  return (
    <div
      className={`w-[15px] h-[15px] rounded-[50%] ${active ? 'bg-[#1E40AF]' : 'bg-[#E5E7EB]'}  flex justify-center items-center`}
    >
      <svg
        width="9"
        height="8"
        viewBox="0 0 9 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.5 1.25L3 6.75L0.5 4.25"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
