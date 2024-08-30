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
      className={`w-[96px] h-[50px] flex items-center p-1 justify-center gap-[11px] bg-[#DBEAFE] rounded-[100px] cursor-pointer relative`}
      onClick={handleToggle}
    >
      <div
        className={`text-[16px] font-bold transition duration-300 ease-in-out relative z-10 ${
          isToggled ? 'text-[#2563EB]' : 'text-[#fff]'
        }`}
      >
        {buttonTextArrays[0]}
      </div>
      <div
        className={`text-[16px] font-bold transition duration-300 ease-in-out relative z-10 ${
          isToggled ? 'text-[#fff]' : 'text-[#2563EB]'
        }`}
      >
        {buttonTextArrays[1]}
      </div>
      <div
        className={`w-[46px] h-[42px] bg-[#2563EB] rounded-[100px] transition-[0.3s] ease-in-out absolute transform top-1/2 -translate-y-1/2  ${
          isToggled ? 'left-[46.5px]' : 'left-[3.5px]'
        }`}
      ></div>
    </div>
  )
}
