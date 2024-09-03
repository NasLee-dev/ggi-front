import { useState } from "react";
import ModalPortal from "../../modal/ModalPortal";
import ExtraModal from "../../modal/ExtraModal";
import Image from "next/image";
import * as S from "./style";
import { InfoGothicText } from "../../styles/Typography";
import { theme } from "../../styles/theme";
import { FlexNowrap } from "../../styles/Boxes";
import { useTabStore } from "@/store/dm/useTabStore";
import * as C from "constants/dm/dm";
import { useKMFilterStore } from "@/store/dm/useFilterStore";
import * as I from "@/models/dm/DM";

export default function MultipleChoice({
  type,
  values,
  extra
}: I.IMultipleProps) {
  const { tabs } = useTabStore()
  const { filters, setFilters } = useKMFilterStore()
  const [clickExtra, setClickExtra] = useState<boolean>(false)
  const [data, setData] = useState<I.ICheckValues[]>(values)
  const [extraCount, setExtraCount] = useState<number>(0)

  const handleClickBtn = (idx: number) => {
    const newValues = [...data]
    if (type === 'isExceptPrevData') {
      newValues.forEach(v => v.status = !v.status)
    } else {
      newValues[idx].status = !data[idx].status
    }
    setData(newValues)
    
    const newFilters = {...filters}
    
    if (type === 'mySet') {
      const clickedValue = C.SENDTOCODE[newValues[idx].name]
      newFilters[clickedValue] = newValues[idx].status
    } else if (type === 'usageIds' || type === 'checkIds') {
      controllFilters(newValues, newFilters, idx)
    } else if (type === 'isExceptPrevData') {
      newFilters[type] = newValues[1].status
    }
    setFilters(newFilters)
  }

  const controllFilters = (newValues: I.ICheckValues[], newFilters: I.IFilterProps, idx: number) => {
    const clickedValue = type === 'usageIds'
      ? C.USAGECODE[newValues[idx].name]
      : type === 'checkIds'
          ? C.SPECIFICCODE[newValues[idx].name]
          : 0

    const findIdx = newFilters[type].findIndex(v => v === clickedValue)
    if (findIdx === -1) {
      newFilters[type].push(clickedValue)
    } else {
      newFilters[type].splice(findIdx, 1)
    }
    return newFilters
  }

  const handleClickModalSave = () => {
    const newValues = values.slice(extra)
    const filter = newValues.filter(v => v.status)
    setExtraCount(filter.length)
  }
  return (
    <S.MultipleBox expected={tabs.expected && type==='usageIds' ? true : false}>
      {data.length && data.slice(0, extra).map((value, idx) => (
        <S.MultipleButton key={idx} status={value.status} onClick={() => handleClickBtn(idx)}>
          <InfoGothicText color={value.status ? theme.palette.blueMain : theme.palette.grayMain}>
            {value.name}
          </InfoGothicText>
        </S.MultipleButton>
      ))}
      {extra ? (
        <>
        <S.ExtraButton 
          status={clickExtra || extraCount ? true : false} 
          onClick={() => setClickExtra(!clickExtra)}
        >
          <FlexNowrap>
            <Image 
              src='/dm/images/filter-left.png'
              width={16} 
              height={16} 
              color={clickExtra ? theme.palette.blueMain : theme.palette.grayMain}
              alt='filter_left'
            />
            <InfoGothicText 
              color={clickExtra 
                ? theme.palette.blueMain 
                : theme.palette.grayMain}
            >
              그외
              {extraCount 
                ? <S.CountBox>
                    {extraCount}
                  </S.CountBox>
                : null}
            </InfoGothicText>
          </FlexNowrap>
        </S.ExtraButton>
        </>
      ) : null}
      {clickExtra ? (
        <ModalPortal portalId="root-portal">
          <ExtraModal
            type={type} 
            values={data} 
            setValues={setData}
            setOpenModal={() => setClickExtra(!clickExtra)}
            clickSave={handleClickModalSave}
            extra={extra}
          />
        </ModalPortal>
      ) : null}
    </S.MultipleBox>
  )
}