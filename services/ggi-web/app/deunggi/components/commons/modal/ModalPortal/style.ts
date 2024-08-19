'use client'

import styled from '@emotion/styled'

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;

  @media (max-width: 620px) {
    width: 90%;
  }
`
