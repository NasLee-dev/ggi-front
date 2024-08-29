import styled from "@emotion/styled";
import * as B from "../../styles/Boxes";
import { theme } from "../../styles/theme";
import { ITabStatus } from "@/models/dm/DM";

export const InputContainer = styled(B.FlexNowrap)<{ disable: boolean, tabs: ITabStatus }>`
  width: ${({ tabs }) => (tabs.expected ? '472px' : '680px')};
  height: 50px;
  padding: 12px 16px;
  border-radius: 16px;
  border: 1px solid ${({disable}) => (disable ? theme.palette.grayThird : theme.palette.graySecondary)};
  background-color: ${({disable}) => (disable ? theme.palette.backgroundGray : theme.palette.white)};
  box-sizing: border-box;
`

export const DateInputBox = styled.input<{ disable: boolean, tabs: ITabStatus }>`
  appearance: none;
  outline: none;
  width: ${({ tabs }) => (tabs.expected ? '120px' : '200px')};
  background-color: ${({disable}) => (disable ? theme.palette.backgroundGray : theme.palette.white)};
  text-align: center;
  border-color: rgba(118, 118, 118, 0);

  text-align: center;
  color: ${({disable}) => (disable ? theme.palette.disabledGray : theme.palette.grayMain)};
  font-family: nanum-gothic;
  font-size: 16px;
  font-weight: 400;
  
  position: relative;
  
  ::-webkit-calendar-picker-indicator {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    color: transparent;
    cursor: pointer;
  }

  ::before {
    content: attr(data-placeholder);
    position: absolute;
    left: 0;
    width: 100%;
  }
    
  :valid::before {
    display: none;
  }
    
  :disabled,
  :not(:focus):invalid {
    ::-webkit-datetime-edit-text,
    ::-webkit-datetime-edit-month-field,
    ::-webkit-datetime-edit-day-field,
    ::-webkit-datetime-edit-year-field {
      -webkit-appearance: none;
      display: none;
    }
  }
`
