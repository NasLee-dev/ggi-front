import styled from "@emotion/styled";
import { theme } from "app/dm/components/styles/theme";

export const StyledTD = styled.td<{ width: string, mine: boolean }>`
  width: ${({ width }) => (`${width}%`)};
  text-align: center;
  border: ${({ mine }) => (mine ? `1px solid ${theme.palette.graySecondary}` : 'none')};
  vertical-align: middle;
  padding: 5px 0;
`