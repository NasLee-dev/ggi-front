import { DownloadContainer, Flex, FlexSpaceBetween, FlexSpaceBetweenAlignCenter, TitleContainer, UsersContainer } from '../components/styles/Boxes'
import { theme } from '../components/styles/theme'
import { IDmProps, ITabStatus } from '@/models/dm/DM'
import { HelpText, InfoText, TextGothicBold, TextSuit18px, TitleText } from '../components/styles/Typography'
import { TabBtn } from '../components/styles/Button'
import { infoContents } from 'constants/dm/dm'

export default function Info({
  tabs,
  setTabs
}: IDmProps) {
  
  const handleClickTabs = (prop: keyof ITabStatus) => {
    if (!setTabs) return
    const newTabs = {...tabs}
    for (const key in newTabs) {
      const k: keyof ITabStatus = key as keyof ITabStatus
      newTabs[k] = false
    }
    newTabs[prop] = true
    setTabs(newTabs)
  }

  return (
    <>
      <FlexSpaceBetween>
        <TitleContainer>
          <TitleText>
            이지DM
          </TitleText>
          <InfoText color={theme.palette.black}>
            {infoContents}
            <HelpText color={theme.palette.blueMain}>이용방법 알아보기</HelpText>
          </InfoText>
        </TitleContainer>
        <UsersContainer>
          <FlexSpaceBetweenAlignCenter>
            <TextSuit18px color={theme.palette.black}>user name</TextSuit18px>
            <InfoText color={theme.palette.grayMain}>user membership</InfoText>
          </FlexSpaceBetweenAlignCenter>
          <DownloadContainer>
            <FlexSpaceBetween style={{ height: '22px' }}>
              <TextGothicBold color={theme.palette.grayMain}>다운로드</TextGothicBold>
              <TextGothicBold color={theme.palette.blueMain}>일 잔여 00개</TextGothicBold>
            </FlexSpaceBetween>
            <FlexSpaceBetween style={{ height: '22px' }}>
              <div></div>
              <TextGothicBold color={theme.palette.grayMain}>월 잔여 00개</TextGothicBold>
            </FlexSpaceBetween>
          </DownloadContainer>
        </UsersContainer>
      </FlexSpaceBetween>

      {/* ------- tab button ---------- */}
      <Flex style={{ margin: '20px 0' }}>
        <TabBtn status={tabs.expected} onClick={() => handleClickTabs('expected')}>
          예정 물건
        </TabBtn>
        <TabBtn status={tabs.ongoing} onClick={() => handleClickTabs('ongoing')}>
          진행 물건
        </TabBtn>
        <TabBtn status={tabs.mine} onClick={() => handleClickTabs('mine')}>
          나의DM
        </TabBtn>
      </Flex>
    </>
  )
}