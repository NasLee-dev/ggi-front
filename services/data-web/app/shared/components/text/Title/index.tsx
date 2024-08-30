interface TitleProps {
  title: string
}

export default function Title({ title }: TitleProps) {
  return <h1 className="text-[28px] font-[700] text-[#1F2937]">{title}</h1>
}
