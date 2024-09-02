import { Dispatch, SetStateAction } from 'react'

type AddressList = {
  address: {
    address_name: string
    b_code: string
    h_code: string
    main_address_no: string
    mountain_yn: string
    region_1depth_name: string
    region_2depth_name: string
    region_3depth_h_name: string
    region_3depth_name: string
    sub_address_no: string
    x: string
    y: string
  }
  address_name: string
  address_type: string
  road_address: string | null
  x: string
  y: string
}

type OptionValue = {
  value: string
  label: string
}

interface AutoKeywordProps {
  addressList: AddressList[]
  setSearchCondition: Dispatch<
    SetStateAction<{
      keyword: string
      address: {
        sido: boolean
        sigungu: boolean
        eupmyeondong: boolean
      }
      usage: {
        main: OptionValue
        compare1: OptionValue
        compare2: OptionValue
      }
    }>
  >
}
export default function AutoKeyword({
  addressList,
  setSearchCondition,
}: AutoKeywordProps) {
  return (
    <div className="flex flex-col w-[1154px] h-[280px] overflow-y-auto pl-[20px] pr-[20px] justify-start items-center self-stretch rounded-b-[36px] border-2 border-t-0 border-b-blue-500 border-r-blue-500 border-l-blue-500 absolute top-[60px] left-[-2px] custom-scrollbar z-10 bg-white">
      {addressList?.map((address, index) => (
        <div
          key={index}
          className="flex flex-row justify-start items-center w-full h-[50px] pl-[20px] pr-[20px] pt-[11px] pb-[11px] gap-[8px] rounded-[16px] bg-white hover:bg-[#F8FAFC] cursor-pointer "
          onClick={() =>
            setSearchCondition((prev) => ({
              ...prev,
              keyword: address.address_name,
            }))
          }
        >
          <div className="flex w-[24px] h-[24px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M20 10C20 16 12 22 12 22C12 22 4 16 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z"
                fill="#E5E7EB"
              />
              <path
                d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="flex w-full h-[50px] justify-start items-center">
            <p className="text-gray-800 text-xl font-medium font-['SUIT'] leading-[27px] hover:text-blue-600">
              {address.address_name}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
