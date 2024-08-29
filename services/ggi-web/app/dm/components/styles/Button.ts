import styled from '@emotion/styled'
import { theme } from './theme'

// Search Component
export const IconBtn = styled.button<{ bc?: string }>`
  background-color: ${({ bc }) => (bc ? bc : theme.palette.white)}
`

export const CheckBox = styled.input({
  margin: '0 10px',
  border: `1px solid ${theme.palette.graySecondary}`
})

// modal
export const ModalBtn = styled.button<{ styles: any }>`
  ${({ styles }) => (styles)},
  width: auto;
  border-radius: 8px;
`

