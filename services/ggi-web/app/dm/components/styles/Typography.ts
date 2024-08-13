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

export const InfoText = styled(GothicText)<{ color: string }>`
  color: ${({color}) => (color)};
  font-size: 16px;
  font-weight: 400;
  line-height: 23.2px
`

export const HelpText = styled.span<{ color: string }>`
  font-family: 'nanum-gothic';
  color: ${({color}) => (color)};
  font-size: '16px';
  font-weight: 400;
  line-height: '23.2px';
  margin-left: '5px';
  text-decoration: 'underline';
`

export const TextSuit18px = styled(SuitText)<{ color: string }>`
  color: ${({color}) => (color)};
  font-size: 18px;
  font-weight: 800;
  line-height: 24.3px
`

export const TextGothic18px = styled(GothicText)<{ color: string }>`
  font-size: 18px;
  font-weight: 700;
  line-height: 17.82px;
  color: ${({color}) => color}
`

export const TextGothicBold = styled(GothicText)<{ color: string }>`
  color: ${({color}) => (color)};
  font-size: 16px;
  font-weight: 700;
  line-height: 20px
`

export const TextGothicBoldMb10 = styled(TextGothicBold)<{ color: string }>`
  color: ${({color}) => (color)};
  margin-bottom: 10px;
`

// search component
export const SearchTitle = styled(SuitText)({
  fontSize: '15px',
  color: `${theme.palette.grayMain}`,
  fontWeight: 800
})

export const TextGothic15px = styled(GothicText)({
  fontSize: '15px',
  fontWeight: 500,
  color: `${theme.palette.grayMain}`,
  whiteSpace: 'pre-wrap'
})

export const TextGothic14px = styled(GothicText)<{ color: string }>`
  color: ${({color}) => (color)};
  font-size: 14px;
  font-weight: 400;
  line-height: 18.9px
`

export const TextSuit20px = styled(SuitText)({
  color: `${theme.palette.black}`,
  fontSize: '20px',
  fontWeight: 800,
  lineHeight: '25px'
})
