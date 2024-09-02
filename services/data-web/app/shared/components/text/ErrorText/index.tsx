import ErrorIcon from '@/app/shared/components/text/ErrorText/components/ErrorIcon'

interface ErrorTextProps {
  text: string
}

export default function ErrorText({ text }: ErrorTextProps) {
  return (
    <div className="flex items-center gap-1">
      <ErrorIcon />
      <p className="text-[16px] font-normal text-[#EF4444]">{text}</p>
    </div>
  )
}
