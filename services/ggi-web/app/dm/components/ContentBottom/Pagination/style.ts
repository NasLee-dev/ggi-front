import styled from "@emotion/styled";
import * as B from "../../styles/Boxes";
import { theme } from "../../styles/theme";

export const PaginationBox = styled(B.FlexCenter)`
  width: 492px;
  height: 78px;
  border-radius: 8px;
  padding: 10px;
  border: 1px solid ${theme.palette.borderGray};
  background-color: ${theme.palette.backgroundGray};
  box-sizing: border-box;
`

export const ArrowButton = styled.button`
  width: auto;
  border-radius: 8px;
  height: 38px;
  border: 1px solid ${theme.palette.graySecondary};
  background-color: ${theme.palette.white};
  padding: 5px 10px; 
  cursor: pointer;
`

export const PageButton = styled.button<{ clicked: boolean }>`
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background-color: ${({clicked}) => (clicked ? theme.palette.graySecondary : 'none')};

  &:hover {
    background-color: ${theme.palette.graySecondary};
  }
  cursor: pointer;
`
