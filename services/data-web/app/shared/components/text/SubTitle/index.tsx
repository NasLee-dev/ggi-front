interface SubTitleProps {
  title: string
}

export default function SubTitle({ title }: SubTitleProps) {
  return (
    <h2 className="text-[20px] font-[700] text-[#1F2937] ggi:text-[18px]">
      {title}
    </h2>
  )
}
