'use client'

import { useState } from 'react'

interface ToggleButtonProps {
  isToggled: boolean
  handleToggle: () => void
  buttonTextArrays: string[]
}

export default function ToggleButton({
  isToggled,
  handleToggle,
  buttonTextArrays,
}: ToggleButtonProps) {
  return (
    <div
      className={`w-[96px] h-[50px] flex items-center p-1 justify-center gap-[11px] bg-[#DBEAFE] rounded-[100px] cursor-pointer relative ggi:w-full ggi:h-[42px] ggi:bg-[#F3F4F6] ggi:border ggi:border-[#E5E7EB]`}
      onClick={handleToggle}
    >
      <div
        className={`text-[16px] font-bold transition duration-300 ease-in-out relative z-10 ${
          isToggled
            ? 'text-[#2563EB] ggi:text-[#6B7280]'
            : 'text-[#fff] ggi:text-[#2563EB]'
        } ggi:w-[46%] ggi:text-center ggi:text-[14px]`}
      >
        {buttonTextArrays[0]}
      </div>
      <div
        className={`text-[16px] font-bold transition duration-300 ease-in-out relative z-10 ${
          isToggled
            ? 'text-[#fff] ggi:text-[#2563EB]'
            : 'text-[#2563EB] ggi:text-[#6B7280]'
        } ggi:w-[46%] ggi:text-center ggi:text-[14px]`}
      >
        {buttonTextArrays[1]}
      </div>
      <div
        className={`w-[46px] h-[42px] bg-[#2563EB] rounded-[100px] transition-[0.3s] ease-in-out absolute transform top-1/2 -translate-y-1/2  ${
          isToggled ? 'left-[46.5px] ggi:left-[49%]' : 'left-[3.5px]'
        } ggi:w-1/2 ggi:h-[35px] ggi:bg-[#fff]`}
      ></div>
    </div>
  )
}
