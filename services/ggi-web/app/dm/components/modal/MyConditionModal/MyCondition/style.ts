import styled from "@emotion/styled";
import { theme } from "app/dm/components/styles/theme";

export const ModalContainer = styled.div`
  width: 531px;
  max-height: 520px;
  box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.08);
  background-color: ${theme.palette.white};
  border-radius: 16px;
  padding: 30px 40px 40px 40px;
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