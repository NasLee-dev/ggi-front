import styled from '@emotion/styled'
import { theme } from './theme'

export const Flex = styled.div({
  display: 'flex'
})

export const FlexColumn = styled(Flex)({
  flexDirection: 'column',
})

export const FlexCenter = styled(Flex)({
  justifyContent: 'center',
  alignItems: 'center'
})

export const FlexNowrap = styled(Flex)({
  flexWrap: 'nowrap',
  alignItems: 'center'
})

export const DmContainer = styled(FlexColumn)({
  justifyContent: 'center',
  alignItems: 'center',
  margin: '50px 100px'
})

export const Container =  styled(FlexColumn)({
  width: '1500px'
})

export const FlexSpaceBetween =  styled(Flex)({
  justifyContent: 'space-between'
})

export const FlexSpaceBetweenMb20 = styled(FlexSpaceBetween)({
  marginBottom: '20px'
})

// info component
export const TitleContainer = styled(FlexColumn)({
  width: '960px',
  height: '109px'
})

export const UsersContainer = styled(FlexSpaceBetween)({
  width: '433px',
  height: '174px',
  flexDirection: 'column',
  border: `1px solid ${theme.palette.graySecondary}`,
  backgroundColor: `${theme.palette.white}`,
  padding: '24px',
  borderRadius: '12px'
})

// nameContainer
export const FlexSpaceBetweenAlignCenter = styled(FlexSpaceBetween)({
  alignItems: 'center'
})

export const DownloadContainer = styled(FlexSpaceBetween)({
  width: '385px',
  height: '86px',
  flexDirection: 'column',
  border: `1px solid ${theme.palette.graySecondary}`,
  margin: '0 auto',
  padding: '16px',
  borderRadius: '10px',
  backgroundColor: `${theme.palette.backgroundGray}`
})

// search component
export const SearchContainer = styled(Container)({
  height: '364px',
})

export const SearchTitleContainer = styled(FlexSpaceBetweenAlignCenter)<{ open : boolean }>`
  height: 50px;
  border: 1px solid ${theme.palette.graySecondary};
  background-color: ${theme.palette.backgroundGray};
  padding: 0 35px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom-left-radius: ${({open}) => (open ? '0' : '16px')};
  border-bottom-right-radius: ${({open}) => (open ? '0' : '16px')};
`

export const FilterContainer = styled(FlexColumn)({
  height: 'auto',
  border: `1px solid ${theme.palette.graySecondary}`,
  borderTop: 'none',
  borderBottomRightRadius: '16px',
  borderBottomLeftRadius: '16px',
  backgroundColor: `${theme.palette.white}`,
  padding: '20px 35px'
})

export const SelectBox = styled.select({
  width: '200px',
  height: '50px',
  border: `1px solid ${theme.palette.graySecondary}`,
  borderRadius: '16px',
  padding: '14px',
  marginRight: '10px'
})

export const SwitchBox = styled(FlexCenter)({
  width: '96px',
  height: '50px',
  marginRight: '5px',
  borderRadius: '100px',
  backgroundColor: `${theme.palette.blueSecondary}`,
  border: `1px solid ${theme.palette.blueSecondary}`
})

export const MultipleBox = styled(FlexNowrap)({
  width: '680px',
  height: '50px',
  border: `1px solid ${theme.palette.backgroundGray}`,
  borderRadius: '16px',
  backgroundColor: `${theme.palette.backgroundGray}`,
  padding: '16px'
})

export const CountBox = styled.span({
  width: '22px',
  height: '22px',
  borderRadius: '999px',
  backgroundColor: `${theme.palette.blueMain}`,
  color: `${theme.palette.white}`,
  padding: '0 6px'
})
