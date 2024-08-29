import styled from "@emotion/styled"
import * as B from "../../styles/Boxes"
import { theme } from "../../styles/theme"

export const FilterContainer = styled(B.FlexSpaceBetweenAlignCenter)`
  width: 680px;
  flex-wrap: nowrap;
`

export const SwitchBox = styled(B.FlexCenter)`
  width: 96px;
  height: 50px;
  margin-right: 5px;
  border-radius: 100px;
  background-color: ${theme.palette.blueSecondary};
  border: 1px solid ${theme.palette.blueSecondary};
`

export const SwitchBtn = styled.button<{ status : boolean}>`
  width: 46px;
  height: 42px;
  border-radius: 100px;
  border: 1px solid ${({status}) => (status ? theme.palette.blueMain : theme.palette.blueSecondary)};
  background-color: ${({status}) => (status ? theme.palette.blueMain : theme.palette.blueSecondary)};
`