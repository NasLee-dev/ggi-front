import styled from "@emotion/styled"
import { theme } from "app/dm/components/styles/theme"

export const StyledTH = styled.th<{ idx: number, length: number, mine: boolean, width: number }>`
  padding: 15px 0px;
  border-radius: ${({ idx, length }) => (idx === 0
    ? '16px 0 0 0 '
    : idx === length - 1 
      ? '0 16px 0 0' 
      : '0')};
  background-color: ${({ idx }) => (idx < 7 
    ? theme.palette.backgroundGray
    : theme.palette.blueSecondary)};
  border: ${({ mine }) => (mine 
    ? `1px solid ${theme.palette.graySecondary}`
    : 'none')};
  width: ${({ width }) => (`${width}%`)};
`