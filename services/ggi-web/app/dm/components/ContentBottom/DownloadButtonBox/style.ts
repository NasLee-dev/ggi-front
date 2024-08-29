import styled from "@emotion/styled";
import * as B from "../../styles/Boxes";
import { theme } from "../../styles/theme";

export const ButtonContainer = styled(B.FlexSpaceBetweenAlignCenter)`
  margin: 40px 0 20px 0;
`

export const DownloadBtn = styled.button`
  height: 50px;
  border-radius: 16px;
  border: 1px solid ${theme.palette.graySecondary};
  padding: 10px;
  background-color: ${theme.palette.white};
`

export const DownloadCount = styled.span`
  height: 28px;
  border: 1px solid ${theme.palette.graySecondary};
  border-radius: 999px;
  padding: 3px 6px;
  box-sizing: border-box;
`
