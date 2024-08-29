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

export const FlexSpaceBetweenMb = styled(FlexSpaceBetween)<{ mb: number}>`
  margin-bottom: ${({ mb }) => (`${mb}px`)};
`

// nameContainer
export const FlexSpaceBetweenAlignCenter = styled(FlexSpaceBetween)<{ styles?: any }>`
  ${({ styles }) => (styles)},
  align-items: center;
`

export const FilterContainer = styled(FlexColumn)`
  height: auto;
  border: 1px solid ${theme.palette.graySecondary};
  border-top: none;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
  background-color: ${theme.palette.white};
  padding: 20px 35px;
`

export const ModalBtnGrid = styled.div<{ styles: any}>`
  ${({ styles }) => (styles)}
  display: grid;
`

export const ModalContentGrid = styled.div<{ styles: any }>`
  ${({ styles }) => (styles)}
`

// list component
export const DownloadCount = styled.span({
  height: '28px',
  border: `1px solid ${theme.palette.graySecondary}`,
  borderRadius: '999px',
  padding: '3px 6px'
})

export const Table = styled.table`
  width: 1500px;
  border-collapse: collapse;
  border-radius: 16px;
  border-style: hidden;
  box-shadow: 0 0 0 1px ${theme.palette.graySecondary};
  margin-bottom: 40px;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
`

// pagination
export const PaginationBox = styled(FlexCenter)({
  width: '492px',
  height: '78px',
  borderRadius: '8px',
  padding: '10px',
  border: `1px solid ${theme.palette.borderGray}`,
  backgroundColor: `${theme.palette.backgroundGray}`
})