import styled from "@emotion/styled";
import { theme } from "../../styles/theme";
import { FlexColumn } from "../../styles/Boxes";

export const ModalContainer = styled.div`
  width: 531px;
  height: 340px;
  border-radius: 16px;
  background-color: ${theme.palette.white};
  box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.08);
  padding: 40px;
  position: fixed;
  top: 35%;
  left: 35%;
  z-index: 9999;
  box-sizing: border-box;
`

export const IconButtonBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
`

export const ContentBox = styled(FlexColumn)`
  width: 451px;
`