import styled from "@emotion/styled";
import { theme } from "../../styles/theme";

export const InputBox = styled.input<({ width: string })>`
  width: ${({ width }) => (width)};
  height: 36px;
  border-radius: 10px;
  border: 1px solid ${theme.palette.blueMain};
  outline: none;
  box-shadow: 0px 0px 0px 4px #3B82F640;
  padding: 0px 10px;

  font-size: 16px;
  font-weight: 700;
  font-family: SUIT;

  &:focus {
    border-color: ${theme.palette.blueMain}
  }
`