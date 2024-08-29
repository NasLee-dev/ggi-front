import { useKMFilterStore } from "@/store/dm/useFilterStore";
import { useTabStore } from "@/store/dm/useTabStore";
import CheckBoxFilter from "app/dm/components/filters/CheckBoxFilter";
import DateFilter from "app/dm/components/filters/DateFilter";
import LocalFilter from "app/dm/components/filters/LocalFilter";
import MultipleChoice from "app/dm/components/styled/MultipleChoice";
import Selectbox from "app/dm/components/styled/SelectBox";
import * as B from "app/dm/components/styles/Boxes";
import * as T from "app/dm/components/styles/Typography";
import * as C from "constants/dm/dm";
import { useState } from "react";

export default function CaseFilters() {
  const [dateDisabled, setDateDisabled] = useState<boolean>(true)
  const { tabs } = useTabStore()
  const { filters, setFilters } = useKMFilterStore()

  const handleChecked = (checked: boolean, name: string) => {
    setDateDisabled(checked)
    if (checked) {
      const newFilters = { ...filters }
      const today = new Date()
      const year = today.getFullYear()
      const month = (today.getMonth()+1).toString().padStart(2, '0')
      const day = (today.getDate()+1).toString().padStart(2, '0')
      newFilters.fromBiddingDate = `${year}${month}${day}`
      setFilters(newFilters)
    }
  }
  const handleSelect = (value: string) => {
    console.log(value)
  }
  
  return (
    <>
      <B.FlexSpaceBetweenMb mb={30}>
        <B.FlexColumn>
          <B.FlexSpaceBetweenMb mb={15}>
            <T.InfoGothicBoldText>
              기준일자
            </T.InfoGothicBoldText>
            {tabs.ongoing 
            ? <CheckBoxFilter  
                type='info'
                checked={dateDisabled}
                content='오늘 이후'
                setChecked={handleChecked}
              />
            : null}
          </B.FlexSpaceBetweenMb>
          <B.FlexNowrap>
            {tabs.expected 
              ? <Selectbox 
                  options={C.BASEDATE} 
                  width='200px'
                  marginRight='5px'
                  setOption={handleSelect}
                />
              : null}
            <DateFilter 
              disable={tabs.ongoing 
                ? dateDisabled 
                : false} 
            />
          </B.FlexNowrap>
        </B.FlexColumn>
        <B.FlexColumn>
          <T.InfoGothicBoldMb15>
            검색지역
          </T.InfoGothicBoldMb15>
          <LocalFilter />
        </B.FlexColumn>
      </B.FlexSpaceBetweenMb>
      <B.FlexSpaceBetweenMb mb={30}>
      {tabs.ongoing 
      ? <B.FlexColumn>
          <T.InfoGothicBoldMb15>
            특수조건
          </T.InfoGothicBoldMb15>
          <MultipleChoice 
            values={C.SPECIFIC} 
            extra={4} 
            type='checkIds'
          />
        </B.FlexColumn> 
      : null}
      <B.FlexColumn>
        <T.InfoGothicBoldMb15>
          용도
        </T.InfoGothicBoldMb15>
        <MultipleChoice 
          values={C.USAGE} 
          extra={3}
          type='usageIds'
        />
      </B.FlexColumn>
    </B.FlexSpaceBetweenMb>
  </>
  )
}