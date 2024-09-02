import styled from "@emotion/styled";
import * as B from "../../styles/Boxes";
import { theme } from "../../styles/theme";

export const Container = styled(B.Flex)`
  margin-top: 20px;
`

export const TabBtn = styled.button<{ status : boolean}>`
  width: 160px;
  height: 50px;
  border: 1px solid ${({status}) => (status ? theme.palette.blueMain : theme.palette.graySecondary)};
  font-size: 18px;
  font-weight: 700;
  line-height: 20px;
  margin-right: 10px;
  border-radius: 16px;
  color: ${({status}) => (status ? theme.palette.blueMain : theme.palette.grayMain)};
  background-color: ${({status}) => (status ? theme.palette.blueSecondary : theme.palette.btnBackground)};
  cursor: pointer;
`
