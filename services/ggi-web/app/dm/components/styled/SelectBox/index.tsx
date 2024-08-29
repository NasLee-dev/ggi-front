import { theme } from "../../styles/theme"
import { InfoGothicText } from "../../styles/Typography"
import { useEffect, useState } from "react"
import Image from "next/image"
import * as S from "./style"

interface ISelectProps {
  options: any[]
  width: string,
  marginRight?: string,
  court?: boolean
  setOption?: (value: string, idx?: number) => void
}

export default function Selectbox({
  options,
  width,
  marginRight,
  setOption,
  court
}: ISelectProps) {
  const [openOptions, setOpenOptions] = useState<boolean>(false)
  const [currentValue, setCurrentValue] = useState<string>('')

  const handleClickValue = (value: string, idx: number) => (e: any) => {
    if (court) {
      setCurrentValue(options[idx]['court'])
    } else {
      setCurrentValue(value)
    }

    if (!setOption) return
    setOption(value, idx)
  }

  useEffect(() => {
    if (court) {
      if (!options[0]?.court) return
      setCurrentValue(options[0].court)
    } else {
      setCurrentValue(options[0])
    }
  }, [])
  return (
    <>
    <S.SelectBox 
      width={width} 
      open={openOptions}
      onClick={() => setOpenOptions(!openOptions)} 
      style={{ marginRight: `${marginRight}`}}
    >
      <InfoGothicText>
        {currentValue}
      </InfoGothicText>
      <Image 
        src='/dm/images/up_down.png' 
        alt='upDown' 
        width={16} 
        height={16} 
      />
      <S.SelectOptions open={openOptions}>
        {options?.length && options?.map((option, idx) => (
          <S.Option key={idx} onClick={handleClickValue(option?.code ?? option, idx)}>
            <InfoGothicText color={theme.palette.grayMain} css={S.textStyles}>
              {court ? option.court : option}
            </InfoGothicText>
          </S.Option>
        ))}
      </S.SelectOptions>
    </S.SelectBox>
    </>
  )
}

