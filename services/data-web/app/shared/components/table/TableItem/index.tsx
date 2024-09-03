interface TableItemProps {
  width: string
  text: string
}

export default function TableItem({ width, text }: TableItemProps) {
  return (
    <li
      style={{ width: width }}
      className="py-3 text-[16px] font-normal text-[#1F2937] flex justify-center items-center group-last:font-bold"
    >
      {text}
    </li>
  )
}
