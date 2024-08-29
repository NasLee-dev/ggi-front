interface ProfileBoxProps {
  userName: string
  date: string
}

export default function ProfileBox({ userName, date }: ProfileBoxProps) {
  return (
    <div className="w-[433px] flex justify-between items-center p-6 border border-[#E5E7EB] rounded-xl">
      <p className="text-[18px] font-[800] text-[#1F2937]">{userName}</p>
      <p className="text-[16px] font-[400] text-[#6B7280]">{date}</p>
    </div>
  )
}
