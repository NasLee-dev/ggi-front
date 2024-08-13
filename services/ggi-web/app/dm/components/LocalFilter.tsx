import { useEffect, useState } from "react";
import { FlexSpaceBetweenAlignCenter, SwitchBox } from "../components/styles/Boxes";
import { SwitchBtn } from "../components/styles/Button";
import { TextGothicBold } from "../components/styles/Typography";
import { ILocalFilter } from "@/models/dm/DM";
import { theme } from "../components/styles/theme";
import StyledSelect from "../components/styles/StyledSelect";
import { useQuery } from "@tanstack/react-query";
import getLocalFilter from "@/remote/dm/search/getLocalFilter";

const options = [
  {name: '서울특별시'}
]

export default function LocalFilter() {
  // const { data: sido } = useQuery({
  //   queryKey: ['sido'],
  //   queryFn: () => getLocalFilter()
  // })
  const [localFilter, setLocalFilter] = useState<ILocalFilter>({
    court: false,
    local: true
  })

  const handleClickLocal = () => {
    const newFilter = {
      ...localFilter,
      court: !localFilter.court,
      local: !localFilter.local
    }
    setLocalFilter(newFilter)
  }

  return (
    <FlexSpaceBetweenAlignCenter style={{ width: 'auto', flexWrap: 'nowrap' }}>
      <SwitchBox>
        <SwitchBtn status={localFilter.court} onClick={handleClickLocal}>
          <TextGothicBold 
            color={localFilter.court 
            ? `${theme.palette.white}` 
            : `${theme.palette.blueMain}`}
          >
            법원
          </TextGothicBold>
        </SwitchBtn>
        <SwitchBtn status={localFilter.local} onClick={handleClickLocal}>
          <TextGothicBold color={localFilter.local 
            ? `${theme.palette.white}` 
            : `${theme.palette.blueMain}`}
          >
            지역
          </TextGothicBold>
        </SwitchBtn>
      </SwitchBox>
      <StyledSelect options={options}/>
      <StyledSelect options={options}/>
      <StyledSelect options={options} noMargin={true} />
    </FlexSpaceBetweenAlignCenter>
  )
}