import { useState } from "react";
import * as T from "../../styles/Typography";
import { theme } from "../../styles/theme";
import * as S from "./style";
import SelectLocalBox from "./SelectLocalBox";
import { useFilterStore } from "@/store/dm/useFilterStore";
import SelectCourtBox from "./SelectCourtBox";

export default function LocalFilter() {
  const { filters, setFilters } = useFilterStore()
  const [isAddress, setIsAddress] = useState<boolean>(filters.isAddress)

  const handleClickLocal = () => {
    const newFilters = {
      ...filters,
      isAddress: !isAddress
    }
    setFilters(newFilters)
    setIsAddress(!isAddress)
  }

  return (
    <S.FilterContainer>
      <S.SwitchBox>
        <S.SwitchBtn status={!isAddress} onClick={handleClickLocal}>
          <T.InfoGothicBoldText 
            color={!isAddress 
            ? `${theme.palette.white}` 
            : `${theme.palette.blueMain}`}
          >
            법원
          </T.InfoGothicBoldText>
        </S.SwitchBtn>
        <S.SwitchBtn status={isAddress} onClick={handleClickLocal}>
          <T.InfoGothicBoldText 
            color={isAddress 
            ? `${theme.palette.white}` 
            : `${theme.palette.blueMain}`}
          >
            지역
          </T.InfoGothicBoldText>
        </S.SwitchBtn>
      </S.SwitchBox>
      {isAddress
        ? <SelectLocalBox />
        : <SelectCourtBox 
            court={!isAddress}
          />
      }
    </S.FilterContainer>
  )
}