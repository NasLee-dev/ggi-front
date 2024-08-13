
import { useState } from 'react'
import { FlexCenter, SearchTitleContainer } from '../components/styles/Boxes'
import { SearchTitle, TextGothic18px } from '../components/styles/Typography'
import { FoldBtn, SearchBtn } from '../components/styles/Button'
import { IDmProps } from '@/models/dm/DM'
import SearchFilter from './SearchFilter'
import { theme } from '../components/styles/theme'
import { Divider } from '@chakra-ui/react'

export default function Search({
  tabs
}: IDmProps) {
  const [open, setOpen] = useState<boolean>(true)
  
  // const [filters, setFilters] = useState<FilterProps>({
  //   noDownloaded: true
  // }) ref???

  const handleClickOpen = () => {
    setOpen((prev) => (!prev))
  }

  return (
    <>
    <SearchTitleContainer open={open}>
      <SearchTitle>
        검색하기
      </SearchTitle>
      <div>
        <FoldBtn onClick={handleClickOpen}>
          {open ? <img src='/dm/images/arrow_up.png'/> 
          : <img src='/dm/images/arrow_down.png'/>}
        </FoldBtn>
      </div>
    </SearchTitleContainer>
    
    {/* filter */}
    {open ? <SearchFilter tabs={tabs} /> : null}

    {/* // 버튼 container */}
    <FlexCenter style={{ margin: '20px 0' }}>
      <SearchBtn color={theme.palette.graySecondary}>
        <TextGothic18px color={theme.palette.grayMain}>
          초기화
        </TextGothic18px>
      </SearchBtn>
      <SearchBtn color={theme.palette.graySecondary}>
        <TextGothic18px color={theme.palette.grayMain}>
          ★ 조건저장
        </TextGothic18px>
      </SearchBtn>
      <SearchBtn color={theme.palette.blueMain}>
        <TextGothic18px color={theme.palette.white}>
          검색하기
        </TextGothic18px>
      </SearchBtn>
    </FlexCenter>
    {/* <Divider /> */}
    </>
  )
}