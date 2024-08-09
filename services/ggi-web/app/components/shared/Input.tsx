import styled from '@emotion/styled'
import { colors } from 'app/styles/colorPallette'

const Input = styled.input`
  padding: 0 5px;
  font-size: 15px;
  height: 48px;
  font-weight: 500;
  border: 1px solid ${colors.gray};

  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.blue};
  }

  &[aria-invalid='true'] {
    border-color: ${colors.red};
  }
`

export default Input
