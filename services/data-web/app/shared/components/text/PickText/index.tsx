interface PickTextProps {
  text: string
}

export default function PickText({ text }: PickTextProps) {
  return <p className="text-[16px] font-medium text-[#2563EB]">{text}</p>
}
