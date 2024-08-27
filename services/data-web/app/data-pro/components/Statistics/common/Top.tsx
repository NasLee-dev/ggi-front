import { useState } from 'react'
import SearchIcon from '../../icons/statistics/SearchIcon'
import Title from './Title'
import useGetAddress from '../hooks/useGetAddress'
import AutoKeyword from './AutoKeyword'

export default function TopComponent() {
  const [keyword, setKeyword] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  const { data: addressList } = useGetAddress(keyword)
  return (
    <div className="w-[1690px] h-[72px] flex gap-[70px] z-10">
      <div className="flex w-[100px] h-full justify-start items-center">
        <Title />
      </div>
      <div className="flex flex-col gap-0 w-[1080px] h-full relative">
        <div className="flex flex-row relative w-full h-full  justify-center items-center">
          <input
            type="text"
            className={`w-[1076px] ${open ? 'h-[50px] rounded-t-[36px] bg-white' : 'h-[72px] rounded-[100px] bg-[#F8FAFC]'} pl-[20px] pr-[50px] items-center  transition-all duration-200 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 text-xl font-medium font-['SUIT'] leading-[27px]`}
            placeholder="지번을 입력해주세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onFocus={() => setOpen(true)}
            onBlur={() => {
              setTimeout(() => {
                setOpen(false)
              }, 100)
            }}
          />
          <div className="absolute right-[15px] top-1/2 transform -translate-y-1/2 cursor-pointer">
            <SearchIcon />
          </div>
        </div>
        {open && (
          <AutoKeyword addressList={addressList} setKeyword={setKeyword} />
        )}
      </div>
      <div className="flex w-[370px] h-full p-[24px] flex-col justify-center items-center flex-shrink-0 rounded-[12px] border border-[#E5E7EB] bg-white">
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
