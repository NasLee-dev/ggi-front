import styled from "@emotion/styled";
import * as B from "app/dm/components/styles/Boxes";
import { theme } from "app/dm/components/styles/theme";
import * as T from "app/dm/components/styles/Typography";

export const HeaderContainer = styled(B.FlexSpaceBetween)<{ open : boolean }>`
  align-items: center;
  border: 1px solid ${theme.palette.graySecondary};
  background-color: ${theme.palette.backgroundGray};
  padding: 15px 35px;
  margin-top: 20px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom-left-radius: ${({open}) => (open ? '0' : '16px')};
  border-bottom-right-radius: ${({open}) => (open ? '0' : '16px')};
`

export const FilterTitle = styled(T.SuitText)`
  font-size: 15px;
  color: ${theme.palette.grayMain};
  font-weight: 800;
`