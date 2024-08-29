import styled from '@emotion/styled'
import { theme } from './theme'
// text
// info component
export const GothicText = styled.div({
  fontFamily: 'nanum-gothic'
})

export const SuitText = styled.div({
  fontFamily: 'SUIT'
})

export const TitleText = styled(SuitText)({
  fontSize: '24px',
  fontWeight: 800,
  color: `${theme.palette.black}`,
  linHeight: '29.95px',
  marginBottom: '10px'
})

export const TextSuitBold20px = styled(SuitText)({
  color: `${theme.palette.black}`,
  fontSize: '20px',
  fontWeight: 800,
  lineHeight: '25px'
})

export const TextGothic18px = styled(GothicText)<{ color?: string }>`
  color: ${({color}) => (color ? color : theme.palette.black)};
  font-size: 18px;
  font-weight: 400;
  line-height: 24.3px;
`

export const TextSuitBold18px = styled(SuitText)<{ color?: string }>`
  color: ${({color}) => (color ? color : theme.palette.black)};
  font-size: 18px;
  font-weight: 800;
  line-height: 24.3px
`

export const TextGothicBold18px = styled(GothicText)<{ color?: string }>`
  color: ${({color}) => (color ? color : theme.palette.black)};
  font-size: 18px;
  font-weight: 700;
  line-height: 17.82px;
`

export const InfoGothicText = styled(GothicText)<{ color?: string, underline?: boolean }>`
  color: ${({color}) => (color ? color : theme.palette.black)};
  font-size: 16px;
  font-weight: 400;
  line-height: 23.2px;
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
`

export const HelpGothicText = styled.span`
  color: ${theme.palette.blueMain};
  font-size: 16px;
  font-family: nanum-gothic;
  font-weight: 400;
  line-height: 23.2px;
  text-decoration: underline;
  margin-left: 5px;
`

export const InfoSuitText = styled.span<{ color?: string, underline?: boolean }>`
  color: ${({color}) => (color ? color : theme.palette.black)};
  font-size: 16px;
  font-weight: 400;
  line-height: 23.2px;
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
  font-family: SUIT;
`

export const InfoGothicBoldText = styled(GothicText)<{ color?: string }>`
  color: ${({color}) => (color ? color : theme.palette.black)};
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  vertical-align: middle;
`

export const InfoSuitBoldText = styled.span<{ color?: string }>`
  color: ${({color}) => (color ? color : theme.palette.black)};
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  font-family: SUIT;
`

export const InfoGothicBoldMb15 = styled(InfoGothicBoldText)<{ color?: string }>`
  color: ${({color}) => (color ? color : theme.palette.black)};
  margin-bottom: 15px;
`

// search component
export const SearchTitle = styled(SuitText)({
  fontSize: '15px',
  color: `${theme.palette.grayMain}`,
  fontWeight: 800
})

export const TextGothic15px = styled(GothicText)<{ color?: string }>`
  font-size: 15px;
  font-weight: 500;
  color: ${({ color }) => (color ? color : theme.palette.grayMain)};
  white-space: pre-wrap;
`

export const TextGothic14px = styled(GothicText)<{ color?: string }>`
  color: ${({color}) => (color ? color : theme.palette.black)};
  font-size: 14px;
  font-weight: 400;
  line-height: 18.9px
`

export const TextSuit14px = styled(SuitText)<{ color?: string }>`
  color: ${({color}) => (color ? color : theme.palette.black)};
  font-size: 14px;
  font-weight: 400;
  line-height: 18.9px
`

export const TextSuitBold14px = styled(TextSuit14px)<{ color?: string }>`
  color: ${({color}) => (color ? color : theme.palette.black)};
  font-weight: 700;
`
