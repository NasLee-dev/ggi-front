import styled from "@emotion/styled";
import { theme } from "../../styles/theme";

export const HeaderContainer = styled.header`
  width: 100%;
  height: 88px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  background-color: #333;
  box-sizing: border-box;
`

export const EndButton = styled.button`
  width: 84px;
  height: 48px;
  background-color: ${theme.palette.grayMain};
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  color: ${theme.palette.white};
`
