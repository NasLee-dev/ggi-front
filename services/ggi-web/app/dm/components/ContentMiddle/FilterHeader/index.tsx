import { Dispatch, SetStateAction } from "react";
import * as S from "./style";
import { IconBtn } from "app/dm/components/styles/Button";
import { theme } from "app/dm/components/styles/theme";
import Image from 'next/image'

interface IFilterHeaderProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  title: string
}

export default function FilterHeader({ open, setOpen, title }: IFilterHeaderProps) {
  return (
    <S.HeaderContainer 
      open={open}
    >
      <S.FilterTitle>
        {title}
      </S.FilterTitle>
      <IconBtn 
        bc={theme.palette.backgroundGray} 
        onClick={() => setOpen(!open)}
      >
        {open 
        ? <Image 
            src='/dm/images/arrow_up.png' 
            alt='arrow_up' 
            width={16} 
            height={16}
          /> 
        : <Image 
          src='/dm/images/arrow_down.png' 
          alt='arrow_down'
          width={16} 
          height={16} 
        />}
      </IconBtn>
    </S.HeaderContainer>
  )
}