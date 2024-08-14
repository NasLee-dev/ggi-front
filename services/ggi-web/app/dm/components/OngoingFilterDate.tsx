import { FlexNowrap } from "../components/styles/Boxes";
import { theme } from "../components/styles/theme";
import { InfoText } from "../components/styles/Typography";
import React, { useState } from "react";
import { CheckBox } from "../components/styles/Button";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

export default function OngoingFilterDate() {
  const [checked, setChecked] = useState<boolean>(true)
  const [dateValue, setDateValue] = useState<string>('')

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    let result = ''

    if (value.length < 4) result = value
    else if (value.length < 7) {
      result += value.substring(0, 4)
      result += " / "
      result += value.substring(4, 6)
    } else if (value.length < 9) {
      result += value.substring(0, 4)
      result += " / "
      result += value.substring(4, 6)
      result += " / "
      result += value.substring(6, 8)
      result += "   ~   yyyy / mm / dd"
    } else if (value.length < 13) {
      result += value.substring(0, 4)
      result += " / "
      result += value.substring(4, 6)
      result += " / "
      result += value.substring(6, 8)
      result += "   ~   "
      result += value.substring(8, 12)
    } else if (value.length < 15) {
      result += value.substring(0, 4)
      result += " / "
      result += value.substring(4, 6)
      result += " / "
      result += value.substring(6, 8)
      result += "   ~   "
      result += value.substring(8, 12)
      result += " / "
      result += value.substring(12, 14)
    } else if (value.length < 17) {
      result += value.substring(0, 4)
      result += " / "
      result += value.substring(4, 6)
      result += " / "
      result += value.substring(6, 8)
      result += "   ~   "
      result += value.substring(8, 12)
      result += " / "
      result += value.substring(12, 14)
      result += " / "
      result += value.substring(14, 17)
    }
    setDateValue(result)
  }

  return (
    <FlexNowrap>
      {/* <InputGroup style={{ width: '564px' }}>
        <InputLeftElement style={{ margin: '5px'}}>
          CalendarIcon
        </InputLeftElement>
        <Input 
          style={{ 
            width: '524px', 
            height: '50px', 
            borderRadius: '16px',
            border: `1px solid ${theme.palette.grayThird}`,
            backgroundColor: `${theme.palette.backgroundGray}`,
            padding: '5px 135px'
          }} 
          placeholder="yyyy / mm / dd   ~   yyyy / mm / dd"
          isDisabled={checked ? true : false}
          value={dateValue}
          onChange={handleChangeInput}
        />
      </InputGroup> */}
      <CheckBox type="checkbox" id='chk' onChange={() => setChecked(!checked)} value={Number(checked)} defaultChecked />
      <label htmlFor="chk">
        <InfoText color={theme.palette.grayMain}>
          오늘이후
        </InfoText>
      </label>
    </FlexNowrap>
  )
}