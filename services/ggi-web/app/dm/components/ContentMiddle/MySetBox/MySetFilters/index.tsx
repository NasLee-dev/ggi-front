import * as I from "@/models/dm/DM";
import { useTabStore } from "@/store/dm/useTabStore";
import CheckBoxFilter from "app/dm/components/filters/CheckBoxFilter";
import HelpModal from "app/dm/components/modal/HelpModal";
import ModalPortal from "app/dm/components/modal/ModalPortal";
import MultipleChoice from "app/dm/components/styled/MultipleChoice";
import * as B from "app/dm/components/styles/Boxes";
import { IconBtn } from "app/dm/components/styles/Button";
import * as T from "app/dm/components/styles/Typography";
import * as C from "constants/dm/dm";
import Image from 'next/image'
import { useState } from "react";


const inCludeDownloaded = [
  {status : false, name: '포함'},
  {status : true, name: '제외'}
]

export default function MySetFilters({ open }: I.ISearchProps) {
  const { tabs } = useTabStore()
  const [openHelpModal, setOpenHelpModal] = useState<boolean>(false)
  const handleChecked = () => {
    
  }

  return (
    open ?
    <>
      <B.FilterContainer>
        <B.FlexSpaceBetween>
          <B.FlexColumn>
            <B.FlexSpaceBetweenMb mb={15}>
              <B.FlexSpaceBetween>
                <T.InfoGothicBoldText>
                  수신인
                </T.InfoGothicBoldText>
                <IconBtn onClick={() => setOpenHelpModal(!openHelpModal)}>
                  <Image src={"/dm/images/help.png"} alt={"help"} width={16} height={16}/>
                </IconBtn>
              </B.FlexSpaceBetween>
              <CheckBoxFilter  
                type="info"
                checked={true}
                content={"항상 유지하기"} 
                setChecked={handleChecked}
              />
            </B.FlexSpaceBetweenMb>
            <MultipleChoice values={C.SENDTO} type="mySet" />
          </B.FlexColumn>
          <B.FlexColumn>
          <B.FlexSpaceBetweenMb mb={15}>
            <T.InfoGothicBoldText>
              이전 다운로드 사건 검색
            </T.InfoGothicBoldText>
            <CheckBoxFilter  
              type="info"
              checked={true}
              content={"항상 유지하기"} 
              setChecked={handleChecked}
            />
          </B.FlexSpaceBetweenMb>
          <MultipleChoice values={inCludeDownloaded} type="isExceptPrevData" />
        </B.FlexColumn>
        </B.FlexSpaceBetween>
      </B.FilterContainer>
      
      {openHelpModal ? (
        <ModalPortal portalId="root-portal">
          <HelpModal setOpenModal={setOpenHelpModal} />
        </ModalPortal>
      ) : null}
    </>
    : null
  )
}