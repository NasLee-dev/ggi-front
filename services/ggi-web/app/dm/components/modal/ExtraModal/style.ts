import styled from "@emotion/styled";
import { theme } from "../../styles/theme";
import * as I from "@/models/dm/DM";
import { FlexSpaceBetweenAlignCenter } from "../../styles/Boxes";

export const ModalContainer = styled.div<{ type: string, tabs: I.ITabStatus }>`
  max-height: 266px;
  border-radius: 16px;
  border: 1px solid ${theme.palette.graySecondary};
  position: absolute;
  top: 800px;
  background-color: ${theme.palette.white};
  width: ${({ type }) => (type === 'usageIds' ? '400px' : '600px')};
  left: ${({ type, tabs }) => (
    tabs.ongoing && type === 'usageIds' 
      ? '1100px' 
      : tabs.expected 
        ? '350px'
        :'450px'
  )};
  box-sizing: border-box;
`

export const ButtonBox = styled(FlexSpaceBetweenAlignCenter)`
  height: 67px;
  border-top: 1px solid ${theme.palette.graySecondary};
  padding: 15px;
  background-color: ${theme.palette.grayThird};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  box-sizing: border-box;
`

export const ExtraModalBtn = styled.button<{ save: boolean }>`
  width: auto;
  height: 35px;
  padding: 5px 15px;
  background-color: ${({ save }) => (save ? theme.palette.blueMain : theme.palette.white)};
  border: ${({ save }) => (save ? 'none' : `1px solid ${theme.palette.graySecondary}`)};
  border-radius: 8px;
  cursor: pointer;
`

export const ModalContentGrid = styled.div<{ styles: any }>`
  ${({ styles }) => (styles)}
`
