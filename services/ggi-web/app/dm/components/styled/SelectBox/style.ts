import styled from "@emotion/styled";
import * as B from "../../styles/Boxes";
import { theme } from "../../styles/theme";
import { css } from "@emotion/react";

export const SelectBox = styled(B.FlexSpaceBetween)<{ width: string, open: boolean }>`
  width: ${({ width }) => (width)};
  height: 50px;
  position: ${({ open }) => (open ? 'relative' : 'none')};
  padding: 12px 16px;
  border: 1px solid ${theme.palette.graySecondary};
  border-radius: 16px;
  background-color: ${theme.palette.white};
  align-self: center;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
`

export const SelectOptions = styled.ul<{ open: boolean }>`
  position: absolute;
  list-style: none;
  top: 60px;
  left: 0;
  width: 100%;
  overflow: auto;
  height: 150px;
  max-height: ${(props) => (props.open ? "none" : "0")};
  padding: 0px;
  border-radius: 16px;
  background-color: ${theme.palette.white};
  color: ${theme.palette.grayMain};
  border: ${(props) => (props.open ? `1px solid ${theme.palette.graySecondary}` : "none")};

  &::-webkit-scrollbar {
    width: 20px;
    height: 144px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${theme.palette.graySecondary};
    border-radius: 10px; 
    border: 7px solid ${theme.palette.white};
  }
  ::-webkit-scrollbar-button:vertical:start:decrement,
  ::-webkit-scrollbar-button:vertical:start:increment,
  ::-webkit-scrollbar-button:vertical:end:decrement {
    display: block;
    height: 3px;
  }
`

export const Option = styled.li`
  padding: 8px 12px;
  margin: 8px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: ${theme.palette.grayThird};
    border-radius: 8px
  }
`

export const textStyles = css`
  &:hover {
    color: ${theme.palette.black}
  }
`