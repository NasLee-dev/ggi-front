import Image from 'next/image'

export default function ChartLayout({ title, children }) {
  return (
    <div className="w-full h-full bg-[#F8FAFC] rounded-3xl py-[23.5px] px-[20px] flex flex-col justify-between items-center relative gap-5">
      <h3 className="text-[18px] font-bold text-[#1F2937] text-center">
        {title}
      </h3>
      <div className="flex-1">{children}</div>
      <p className="text-[14px] font-medium text-[#9CA3AF] text-center">
        (출처 : 지지옥션)
      </p>
      <div className="absolute top-[23.5px] left-5">
        <Image
          src="/images/mark.png"
          width={84}
          height={28}
          alt="지지옥션 로고"
        />
      </div>
    </div>
  )
}
