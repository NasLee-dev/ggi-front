import * as I from "@/models/dm/DM";
import * as S from "./style";
import { CheckBox, IconBtn } from "app/dm/components/styles/Button";
import * as B from "app/dm/components/styles/Boxes";
import * as T from "app/dm/components/styles/Typography";
import Image from 'next/image'
import { theme } from "app/dm/components/styles/theme";
import { useState } from "react";
import useMyConditionModal from "@/hooks/dm/useMyConditionModal";
import MyConditionModal from "app/dm/components/modal/MyConditionModal";
import MyDmBadge from "app/dm/components/styled/MyDmBadge";
import Tooltip from "app/dm/components/modal/Tooltip";
import { useTabStore } from "@/store/dm/useTabStore";
import { useKMListStore } from "@/store/dm/useListStore";

export default function TableBody({ headers }: I.ITableListProps) {
  const { tabs } = useTabStore()
  const { list } = useKMListStore()
  const [detailContent, setDetailContent] = useState<any>()
  const [openTooltip, setOpenTooltip] = useState<boolean>(false)
  const {
    openModal,
    setOpenModal,
    openConfirmModal,
    setOpenConfirmModal,
    confirmBtnType,
    handleConfirmBtnType,
    handleClickBefor,
    handleClickConfirm
  } = useMyConditionModal()
  
  const handleClickDetail = (content: any) => () => {
    setDetailContent(content)
    setOpenModal(!openModal)
  }
  return (
    <>
    <tbody>
      {list.contents.map((value, index) => (
        <tr key={`tbody-tr-${value.caseNoString}-${index}`}>
          {Object.keys(headers).map((header, idx) => (
            <S.StyledTD 
              key={`tbody-${header}-${idx}`} 
              width={headers[header].width} 
              mine={tabs.mine ?? false}
            >
              {idx === 0 
                ? <CheckBox 
                    key={`checkbox-${index}`}
                    type="checkbox" 
                    id='chk' 
                  /> 
                : (tabs?.mine && header === 'filters' 
                  ? <B.FlexNowrap key={`filters-${index}`} style={{ padding: '0 10px' }}>
                      {Object.keys(value[header]).slice(0, 3).map((filterKey) => (
                        <MyDmBadge 
                          key={filterKey} 
                          type={filterKey} 
                          content={value[header][filterKey]} 
                        />
                      ))}
                      {Object.keys(value[header]).length > 3 
                        ? <button 
                            key={`filters-button-${index}`} 
                            onClick={handleClickDetail(value[header])}
                          >
                            <T.InfoGothicText color={theme.palette.blueMain}>
                              자세히 보기
                            </T.InfoGothicText>
                          </button> 
                        : null
                      }
                    </B.FlexNowrap> 
                  : (tabs.mine && 
                    header === 'reDownload' 
                    // && value.reDownload 
                    ? <>
                        <IconBtn 
                          key={`reDownload-${index}`} 
                          onMouseEnter={() => setOpenTooltip(true)}
                          onMouseLeave={() => setOpenTooltip(false)}
                        >
                          <Image 
                            src="/dm/images/download.png" 
                            alt="download" 
                            width={12} 
                            height={12} 
                          />
                        </IconBtn>
                      </> 
                    : <T.TextGothic14px key={`text-${idx}`}>
                        {header === 'idx'
                          ? index+1 
                          : value[header] ?? null}
                      </T.TextGothic14px>
              ))}
            </S.StyledTD>
          ))}
        </tr>
      ))}
    </tbody>
    
    <MyConditionModal 
      modalType='detail'
      title={'검색조건 상세'} 
      subTitle={''} 
      contents={detailContent}
      openModal={openModal}
      setOpenModal={setOpenModal}
      openConfirmModal={openConfirmModal}
      setOpenConfirmModal={setOpenConfirmModal}
      setBtnType={handleConfirmBtnType}
      confirmType={confirmBtnType} 
      clickLeftBtn={handleClickBefor} 
      clickRightBtn={handleClickConfirm}
    />

    {openTooltip ? <Tooltip /> : null}
    </>
  )
}