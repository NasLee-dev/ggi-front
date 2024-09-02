interface TableItemProps {
  width: string
  text: string
}

export default function TableItem({ width, text }: TableItemProps) {
  return (
    <li
      style={{ width: width }}
      className="py-3 text-[16px] font-normal text-[#1F2937] flex justify-center items-center group-hover:font-bold transition-[0.3s]"
    >
      {text}
    </li>
  )
}
