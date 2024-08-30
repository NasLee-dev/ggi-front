import styled from "@emotion/styled"
import * as B from "../../styles/Boxes"
import { theme } from "../../styles/theme"
import { IconBtn } from "../../styles/Button"

export const ModalBox = styled(B.FlexCenter)`
  flex-direction: column;
  width: 451px;
  max-height: 200px;
`

export const ModalScrollBox = styled.div`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 20px;
    height: 144px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${theme.palette.graySecondary};
    border-radius: 10px; 
    border: 7px solid ${theme.palette.white};
  }
`

export const ModalContentBox = styled(B.Flex)`
  width: 451px;
  box-sizing: border-box;
  border: 1px solid ${theme.palette.graySecondary};
  border-radius: 10px;
  padding: 20px;
  margin: 5px auto;
  margin-top: 20px;
`

export const DeleteIconButton = styled(IconBtn)`
  border: 0.5px solid ${theme.palette.graySecondary};
  border-radius: 4px;
  width: 32px;
  height: 32px;
  padding: 0px 5px;
`