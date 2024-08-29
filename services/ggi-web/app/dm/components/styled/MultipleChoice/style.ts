import styled from "@emotion/styled";
import * as B from "../../styles/Boxes";
import { theme } from "../../styles/theme";

export const MultipleBox = styled(B.FlexNowrap)<{ expected?: boolean }>`
  width: ${({expected}) => (expected ? '1431px' : '680px')};
  height: 50px;
  border: 1px solid ${theme.palette.backgroundGray};
  border-radius: 16px;
  background-color: ${theme.palette.backgroundGray};
  padding: 16px;
  box-sizing: border-box;
`

export const MultipleButton = styled.button<{ status: boolean }>`
  width: auto;
  height: 34px;
  border-radius: 100px;
  color: ${({status}) => (status
    ? theme.palette.blueMain
    : theme.palette.grayMain
  )};
  background-color: ${({status}) => (status 
    ? theme.palette.blueSecondary 
    : theme.palette.graySecondary
  )};
  margin-right: 5px;
  padding: 0 8px;
`

export const ExtraButton = styled.button<{ status: boolean }>`
  width: auto;
  height: 34px;
  border-radius: 100px;
  color: ${theme.palette.blueMain};
  background-color: ${({status}) => (status 
    ? theme.palette.blueSecondary 
    : theme.palette.graySecondary
  )};
  border: ${({status}) => (status 
    ? `1px solid ${theme.palette.blueMain}`
    : 'none'
  )};
  margin-right: 5px;
  padding: 0 8px;
`

export const CountBox = styled.span`
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background-color: ${theme.palette.blueMain};
  color: ${theme.palette.white};
  padding: 0 6px;
  margin-left: 5px;
`