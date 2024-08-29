import styled from "@emotion/styled";
import { theme } from "../../styles/theme";

export const Table = styled.table`
  width: 1500px;
  border-collapse: collapse;
  border-radius: 16px;
  border-style: hidden;
  box-shadow: 0 0 0 1px ${theme.palette.graySecondary};
  margin-bottom: 40px;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
`