import { IDmProps } from "@/models/dm/DM";
import ExpectedFilterDate from "./ExpectedFilterDate";
import { FlexColumn, FlexSpaceBetweenMb20 } from "../components/styles/Boxes";
import { theme } from "../components/styles/theme";
import { TextGothicBoldMb10 } from "../components/styles/Typography";
import OngoingFilterDate from "./OngoingFilterDate";
import LocalFilter from "./LocalFilter";
import MultipleChoice from "../components/styles/MuitipleChoice";
import { sendTo, usage } from "constants/dm/dm";
import SearchFilterDetail from "./SearchFilterDetail";

export default function SearchFilterContent({
  tabs,
  openDetail
}: IDmProps) {
  
  return (
    <>
    <FlexSpaceBetweenMb20>
      <FlexColumn>
        <TextGothicBoldMb10 color={theme.palette.black}>
          기준일자
        </TextGothicBoldMb10>
        {tabs.expected ? <ExpectedFilterDate /> : <OngoingFilterDate />}
      </FlexColumn>
      <FlexColumn>
        <TextGothicBoldMb10 color={theme.palette.black}>
          검색지역
        </TextGothicBoldMb10>
        <LocalFilter />
      </FlexColumn>
    </FlexSpaceBetweenMb20>
    <FlexSpaceBetweenMb20>
      <FlexColumn>
        <TextGothicBoldMb10 color={theme.palette.black}>
          수신인
        </TextGothicBoldMb10>
        <MultipleChoice values={sendTo} />
      </FlexColumn>
      <FlexColumn>
        <TextGothicBoldMb10 color={theme.palette.black}>
          용도
        </TextGothicBoldMb10>
        <MultipleChoice values={usage} extra={true} />
      </FlexColumn>
    </FlexSpaceBetweenMb20>

    {/* 상세조건 */}
    {openDetail && <SearchFilterDetail />}
    </>
  )
}