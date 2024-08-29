import styled from "@emotion/styled";
import { theme } from "app/dm/components/styles/theme";

export const StyledTD = styled.td<{ width: string, mine: boolean }>`
  height: 44px;
  width: ${({ width }) => (`${width}%`)};
  text-align: center;
  border: ${({ mine }) => (mine ? `1px solid ${theme.palette.graySecondary}` : 'none')};
  vertical-align: middle;
`