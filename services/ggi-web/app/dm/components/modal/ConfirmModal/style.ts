import styled from "@emotion/styled";
import { theme } from "../../styles/theme";
import { FlexColumn } from "../../styles/Boxes";

export const ModalContainer = styled.div`
  width: 400px;
  max-height: 520px;
  box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.08);
  background-color: ${theme.palette.white};
  border-radius: 16px;
  padding: 40px;
  position: fixed;
  top: 40%;
  left: 37%;
  z-index: 9999;
  box-sizing: border-box;
`

export const TitleBox = styled(FlexColumn)`
  align-items: center;
`