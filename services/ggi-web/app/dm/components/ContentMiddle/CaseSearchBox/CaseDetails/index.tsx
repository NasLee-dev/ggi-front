import * as I from "@/models/dm/DM";
import * as B from "../../../styles/Boxes";
import * as T from "../../../styles/Typography";
import * as C from "constants/dm/dm";
import { theme } from "../../../styles/theme";
import { useEffect, useState } from "react";
import CheckBoxFilter from "app/dm/components/filters/CheckBoxFilter";
import MultipleChoice from "app/dm/components/styled/MultipleChoice";
import Selectbox from "app/dm/components/styled/SelectBox";
import { useTabStore } from "@/store/dm/useTabStore";
import { useFilterStore } from "@/store/dm/useFilterStore";

export default function CaseDetails({ open }: I.ISearchProps) {
  const { tabs } = useTabStore()
  const { filters, setFilters } = useFilterStore()
  const [inputDisabled, setInputDisabled] = useState<boolean>(false)
  
  const handleChecked = (checked: boolean, name: string) => {
    if (!setFilters) return
    const newFilters = {...filters}
    // newFilters.isExceptSelected = checked
    setFilters(newFilters)
  }

  const handleChangeCurrent = (value: string, idx: number) => {
    if (value === '신건') setInputDisabled(true)
    else setInputDisabled(false)

    const newFilters = {
      ...filters,
      statusCode: C.STATUSCODE[value]
    }
    setFilters(newFilters)
  }

  const handleChangeFailCount = (value: string, idx: number) => {
    const newFilters = {
      ...filters,
      failCount: C.FAILCOUNT[value]
    }
    setFilters(newFilters)
  }

  const handleChangePrice = (prop: string) => (value: string, idx: number) => {
    let cal: string = ''
    if (value.includes('천만')) {
      cal = value.replaceAll('천만', '0000000')
    } else if (value.includes('억')) {
      cal = value.replaceAll('억', '00000000')
    }

    const newFilters = {
      ...filters,
      [prop]: Number(cal)
    }
    setFilters(newFilters)
  }

  useEffect(() => {
    if (!tabs.ongoing) return
  }, [tabs.ongoing])

  return (
    open ?
    <>
      <B.FlexSpaceBetweenMb mb={30}>
        <B.FlexColumn>
          <B.FlexSpaceBetweenMb mb={15}>
            <T.InfoGothicBoldText>
              임차조건
            </T.InfoGothicBoldText>
            <CheckBoxFilter  
              type='info'
              checked={true}
              content='체크항목제외검색'
              setChecked={handleChecked}
            />
          </B.FlexSpaceBetweenMb>
          <MultipleChoice 
            values={C.rentConditions} 
            type='rent'
          />
        </B.FlexColumn>
        <B.FlexColumn>
          <T.InfoGothicBoldMb15>
            감정가
          </T.InfoGothicBoldMb15>
          <B.FlexNowrap>
            <Selectbox 
              options={C.MINPRICE} 
              marginRight='0' 
              width='326.5px'
              setOption={handleChangePrice('fromAppraisalAmount')}
            />
            <T.InfoGothicText 
              color={theme.palette.grayMain} 
              style={{ padding: '0 5px' }}
            >
              ~
            </T.InfoGothicText>
            <Selectbox 
              options={C.MAXPRICE} 
              marginRight='0'
              width='326.5px'
              setOption={handleChangePrice('toAppraisalAmount')}
            />
          </B.FlexNowrap>
        </B.FlexColumn>
      </B.FlexSpaceBetweenMb>  
      <B.FlexSpaceBetweenMb mb={30}>
        <B.FlexColumn>
          <T.InfoGothicBoldMb15>
            현재상태
          </T.InfoGothicBoldMb15>
          <B.FlexSpaceBetweenAlignCenter>
            <Selectbox 
              options={Object.keys(C.STATUSCODE)} 
              width='335px'
              marginRight='10px'
              setOption={handleChangeCurrent}
            />
            <Selectbox 
              options={Object.keys(C.FAILCOUNT)} 
              width='335px'
              setOption={handleChangeFailCount}
            />
          </B.FlexSpaceBetweenAlignCenter>
        </B.FlexColumn>
        <B.FlexColumn>
          <T.InfoGothicBoldMb15>
            최저가
          </T.InfoGothicBoldMb15>
          <B.FlexNowrap>
            <Selectbox 
              options={C.MINPRICE} 
              marginRight='0'
              width='326.5px'
              setOption={handleChangePrice('fromMinimumAmount')}
            />
            <T.InfoGothicText 
              color={theme.palette.grayMain} 
              style={{ padding: '0 5px' }}
            >
              ~
            </T.InfoGothicText>
            <Selectbox 
              options={C.MAXPRICE} 
              marginRight='0'
              width='326.5px'
              setOption={handleChangePrice('toMinimumAmount')}
            />
          </B.FlexNowrap>
        </B.FlexColumn>
      </B.FlexSpaceBetweenMb>
    </> : null
  )
}