import styled from "@emotion/styled";
import * as B from "../../styles/Boxes";
import { theme } from "../../styles/theme";

export const BtnContainer = styled(B.FlexCenter)`
  padding: 20px;
  border-bottom: 1px solid ${theme.palette.graySecondary};
`

export const SearchBtn = styled.button<{ color: string }>`
  border: 1px solid ${({color}) => (color)};
  background-color: ${({color}) => (color)};
  border-radius: 12px;
  margin: 0 5px; 
  padding: 15px 20px;
`
