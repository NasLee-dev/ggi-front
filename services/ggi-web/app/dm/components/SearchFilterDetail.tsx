import { conditions, price } from "constants/dm/dm";
import { FlexColumn, FlexSpaceBetweenAlignCenter, FlexSpaceBetweenMb20 } from "./styles/Boxes";
import MultipleChoice from "./styles/MuitipleChoice";
import { theme } from "./styles/theme";
import { InfoText, TextGothicBoldMb10 } from "./styles/Typography";
import StyledSelect from "./styles/StyledSelect";

export default function SearchFilterDetail () {

  return (
    <>
    <FlexSpaceBetweenMb20>
      <FlexColumn>
        <TextGothicBoldMb10 color={theme.palette.black}>
          특수조건
        </TextGothicBoldMb10>
        <MultipleChoice values={conditions} extra={true} />
      </FlexColumn>
      <FlexColumn>
        <TextGothicBoldMb10 color={theme.palette.black}>
          감정가
        </TextGothicBoldMb10>
        <FlexSpaceBetweenAlignCenter>
          <StyledSelect options={price} noMargin={true} wider={true} />
          <InfoText color={theme.palette.grayMain} style={{ padding: '0 5px' }}>
            ~
          </InfoText>
          <StyledSelect options={price} noMargin={true} wider={true} />
        </FlexSpaceBetweenAlignCenter>
      </FlexColumn>
    </FlexSpaceBetweenMb20>  
    <FlexSpaceBetweenMb20>
      <FlexColumn>
        <TextGothicBoldMb10 color={theme.palette.black}>
          현재상태
        </TextGothicBoldMb10>
        <FlexSpaceBetweenAlignCenter>
          <StyledSelect options={price} wider={true} />
          <StyledSelect options={price} noMargin={true} wider={true} />
        </FlexSpaceBetweenAlignCenter>
      </FlexColumn>
      <FlexColumn>
        <TextGothicBoldMb10 color={theme.palette.black}>
          최저가
        </TextGothicBoldMb10>
        <FlexSpaceBetweenAlignCenter>
          <StyledSelect options={price} noMargin={true} wider={true} />
          <InfoText color={theme.palette.grayMain} style={{ padding: '0 5px' }}>
            ~
          </InfoText>
          <StyledSelect options={price} noMargin={true} wider={true} />
        </FlexSpaceBetweenAlignCenter>
      </FlexColumn>
    </FlexSpaceBetweenMb20>
    </>
    
  )
}