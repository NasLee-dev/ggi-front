'use client'

import styled from '@emotion/styled'
import Image from 'next/image'

export const BasketModalContainer = styled.div`
  width: 540px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 16px;
  box-shadow:
    0px 20px 13px rgba(0, 0, 0, 0.03),
    0px 8px 5px rgba(0, 0, 0, 0.08);
  position: relative;
`

export const BasketIcon = styled(Image)`
  display: block;
  margin-bottom: 22px;
`

export const ModalText = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: #6b7280;
  margin-bottom: 25px;
  line-height: 1.35;
  text-align: center;
`

export const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
`
