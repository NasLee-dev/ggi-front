import styled from "@emotion/styled";
import * as B from "../../styles/Boxes";
import { theme } from "../../styles/theme";

export const UsersContainer = styled(B.FlexSpaceBetween)`
  width: 433px;
  height: 182px;
  flex-direction: column;
  border: 1px solid ${theme.palette.graySecondary};
  background-color: ${theme.palette.white};
  padding: 24px;
  border-radius: 12px;
  box-sizing: border-box;
`

export const DownloadContainer = styled(B.FlexSpaceBetween)`
  width: 385px;
  height: 94px;
  flex-direction: column;
  border: 1px solid ${theme.palette.graySecondary};
  margin: 0 auto;
  padding: 16px;
  border-radius: 10px;
  background-color: ${theme.palette.backgroundGray};
  box-sizing: border-box;
`

export const AddBtn = styled.button`
  width: 84px;
  height: 28px;
  border: 1px solid ${theme.palette.graySecondary};
  border-radius: 8px;
  background-color: ${theme.palette.backgroundGray};
  padding: 3px 10px;
  color: ${theme.palette.grayMain};
  font-size: 14px;
  font-family: nanum-gothic;
  font-weight: 700;
  line-height: 20px;
  cursor: pointer;
`