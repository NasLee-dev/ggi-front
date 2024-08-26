import { useState } from 'react'
import SearchIcon from '../../icons/statistics/SearchIcon'
import Title from './Title'
import useGetAddress from '../hooks/useGetAddress'

export default function TopComponent() {
  const [keyword, setKeyword] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  const { data } = useGetAddress(keyword)
  return (
    <div className="w-full h-[72px] flex gap-[1%]">
      <div className="flex w-[10%] h-full justify-start items-center">
        <Title />
      </div>
      <div className="flex flex-row relative w-[70%] h-full justify-center items-center">
        <input
          type="text"
          className="w-full h-[72px] pl-[20px] pr-[50px] items-center rounded-[100px] bg-[#F8FAFC] focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="지번을 입력해주세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
        />
        <div className="absolute right-[15px] top-1/2 transform -translate-y-1/2 cursor-pointer">
          <SearchIcon />
        </div>
      </div>
      <div className="flex w-[25%] h-full p-[24px] flex-col justify-center items-center flex-shrink-0 rounded-[12px] border border-[#E5E7EB] bg-white">
        <div className="w-full justify-between flex">
          <p className="text-gray-800 text-lg font-extrabold font-['SUIT'] leading-normal">
            BEST님
          </p>
          <p className="text-gray-500 text-base font-normal font-['SUIT'] leading-snug">
            2020.01.01 ~ 2020.12.31
          </p>
        </div>
      </div>
    </div>
  )
}
