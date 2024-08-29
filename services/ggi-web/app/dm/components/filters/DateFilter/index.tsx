import React, { useState } from "react";
import { theme } from "../../styles/theme";
import * as S from "./style";
import Image from "next/image";
import * as T from "../../styles/Typography";
import { useTabStore } from "@/store/dm/useTabStore";
import { useKMFilterStore } from "@/store/dm/useFilterStore";

interface IDateFilterProps {
  disable: boolean
}

export default function DateFilter ({
  disable
}: IDateFilterProps) {
  const { tabs } = useTabStore()
  const { filters, setFilters } = useKMFilterStore()
  const [firstInput, setFirstInput] = useState<string>('')
  const [secondInput, setSecondInput] = useState<string>('')

  const handleChangeInput = (prop: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (prop === 'fromBiddingDate') {
      setFirstInput(e.target.value)
    } else setSecondInput(e.target.value)

    const value = e.target.value.replaceAll('-', '')
    const newFilters = {
      ...filters,
      [prop]: value
    }
    setFilters(newFilters)
  } 

  return (
    <S.InputContainer  
      disable={disable}
      tabs={tabs}
    >
      <Image 
        src='/dm/images/calendar.png'
        alt='caledar'
        width={16} 
        height={16} 
        style={{ 
          marginRight: '100px' 
        }}
        color={disable 
          ? `${theme.palette.disabledGray}` 
          : `${theme.palette.grayMain}`}
      />
      <S.DateInputBox
        type='date'
        tabs={tabs}
        disable={disable}
        disabled={disable ? true : false}
        data-placeholder='yyyy / mm / dd'
        value={firstInput}
        onChange={handleChangeInput('fromBiddingDate')}
        required
      />
      <T.InfoGothicText 
        color={disable 
          ? theme.palette.disabledGray 
          : theme.palette.black} 
        style={{ margin: '0 20px' }}
      >
        ~
      </T.InfoGothicText>
      <S.DateInputBox
        tabs={tabs}
        type='date'
        disable={disable}
        disabled={disable ? true : false}
        data-placeholder='yyyy / mm / dd'
        value={secondInput}
        onChange={handleChangeInput('toBiddingDate')}
        required
      />
    </S.InputContainer>
  )
}