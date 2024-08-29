import styled from "@emotion/styled";
import { theme } from "../../styles/theme";

export const ModalContainer = styled.div`
  width: 220px;
  height: 42px;
  padding: 0 5px;
  box-shadow: 0px 2px 4px 0px #00000026;
  border: 0.5px solid ${theme.palette.graySecondary};
  background-color: ${theme.palette.tooltip};
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`