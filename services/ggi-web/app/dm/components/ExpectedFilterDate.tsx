import { FlexSpaceBetweenAlignCenter } from "../components/styles/Boxes";
import { theme } from "../components/styles/theme";
import { InfoText, TextGothic14px } from "../components/styles/Typography";
import StyledSelect from "../components/styles/StyledSelect";

const options01 = [
  {value: '1', name: '신건등록일'}
]
const options02 = [
  {value: '1', name: '1달전'}
]

export default function ExpectedFilterDate() {
  return (
    <FlexSpaceBetweenAlignCenter style={{ flexWrap: 'nowrap' }}>
      <StyledSelect options={options01}></StyledSelect>
      <InfoText color={theme.palette.grayMain} 
        style={{ marginRight: '5px'}}
      >
        이 오늘로부터
      </InfoText>
      <StyledSelect options={options02}></StyledSelect>
      <TextGothic14px color={theme.palette.grayMain} style={{ marginRight: '5px'}}>2024.08.30 ~ </TextGothic14px>
      <TextGothic14px color={theme.palette.grayMain}>2024.09.30</TextGothic14px>
    </FlexSpaceBetweenAlignCenter>
  )
}