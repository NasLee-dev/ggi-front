'use client'
import Flex from 'app/map/components/shared/Flex'
import PriceRange from 'app/map/components/shared/PriceRange'
import Text from 'app/map/components/shared/Text'
import { formDataAtom } from '@/store/atom/map'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { PRICE } from 'app/map/constants/map/SubFilter'
import React, { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { colors } from 'app/styles/colorPallette'

interface PriceBoxProps {
  fromToAppraisalPrice: number[]
  setFromToAppraisalPrice: React.Dispatch<React.SetStateAction<number[]>>
}

export default function PriceBox({
  fromToAppraisalPrice,
  setFromToAppraisalPrice,
}: PriceBoxProps) {
  const [formData, setFormData] = useRecoilState(formDataAtom)

  const handlefromToAppraisalPrice = useCallback(
    (price: number) => {
      if (
        price === 3000000001 &&
        fromToAppraisalPrice[0] === 0 &&
        fromToAppraisalPrice[1] === 0
      ) {
        setFromToAppraisalPrice([price, 0])
        setFormData({
          ...formData,
          fromAppraisalAmount: price,
          toAppraisalAmount: 0,
        })
        return
      } else if (
        fromToAppraisalPrice[0] === 3000000001 &&
        price < 3000000001 &&
        fromToAppraisalPrice[1] === 0
      ) {
        setFromToAppraisalPrice([price, fromToAppraisalPrice[0]])
        setFormData({
          ...formData,
          fromAppraisalAmount: price,
          toAppraisalAmount: fromToAppraisalPrice[0],
        })
        return
      }
      if (
        fromToAppraisalPrice[0] !== 0 &&
        fromToAppraisalPrice[1] !== 0 &&
        price !== 3000000001
      ) {
        setFromToAppraisalPrice([0, price])
        setFormData({
          ...formData,
          fromAppraisalAmount: 0,
          toAppraisalAmount: price,
        })
        return
      } else if (
        fromToAppraisalPrice[0] === 0 &&
        fromToAppraisalPrice[1] !== 0 &&
        price < fromToAppraisalPrice[1]
      ) {
        setFromToAppraisalPrice([price, fromToAppraisalPrice[1]])
        setFormData({
          ...formData,
          fromAppraisalAmount: price,
          toAppraisalAmount: fromToAppraisalPrice[1],
        })
      } else if (
        fromToAppraisalPrice[0] === 0 &&
        fromToAppraisalPrice[1] !== 0 &&
        price > fromToAppraisalPrice[1]
      ) {
        setFromToAppraisalPrice([fromToAppraisalPrice[1], price])
        setFormData({
          ...formData,
          fromAppraisalAmount: fromToAppraisalPrice[1],
          toAppraisalAmount: price,
        })
      } else if (
        fromToAppraisalPrice[0] === 0 &&
        fromToAppraisalPrice[1] === 0
      ) {
        setFromToAppraisalPrice([0, price])
        setFormData({
          ...formData,
          fromAppraisalAmount: 0,
          toAppraisalAmount: price,
        })
      } else if (
        fromToAppraisalPrice[0] !== 0 &&
        fromToAppraisalPrice[1] !== 0 &&
        price === 3000000001
      ) {
        setFromToAppraisalPrice([price, 0])
        setFormData({
          ...formData,
          fromAppraisalAmount: price,
          toAppraisalAmount: 0,
        })
      } else if (
        fromToAppraisalPrice[0] === 0 &&
        fromToAppraisalPrice[1] !== 0 &&
        price === fromToAppraisalPrice[1] &&
        price !== 3000000001
      ) {
        setFromToAppraisalPrice([0, 0])
        setFormData({
          ...formData,
          fromAppraisalAmount: 0,
          toAppraisalAmount: 0,
        })
      } else if (
        fromToAppraisalPrice[1] === 0 &&
        price === 3000000001 &&
        fromToAppraisalPrice[0] === price
      ) {
        setFromToAppraisalPrice([0, 0])
        setFormData({
          ...formData,
          fromAppraisalAmount: 0,
          toAppraisalAmount: 0,
        })
      }
    },
    [formData, fromToAppraisalPrice, setFormData, setFromToAppraisalPrice],
  )
  return (
    <Flex
      justify="start"
      direction="column"
      align="center"
      css={ContainerStyle}
    >
      <FlexContainer>
        {Object.values(PRICE).map((value, index) => (
          <React.Fragment key={index}>
            <FlexItem
              style={{
                borderLeft: `${
                  formData.fromAppraisalAmount ===
                    parseInt(Object.keys(PRICE)[index]) ||
                  formData.toAppraisalAmount ===
                    parseInt(Object.keys(PRICE)[index]) ||
                  formData.fromAppraisalAmount ===
                    parseInt(Object.keys(PRICE)[index - 1]) ||
                  (formData.toAppraisalAmount ===
                    parseInt(Object.keys(PRICE)[index - 1]) &&
                    formData.toAppraisalAmount !== 300000000)
                    ? `1px solid ${colors.borderBoxBlue}`
                    : formData.fromAppraisalAmount !== 0 &&
                        formData.fromAppraisalAmount <
                          parseInt(Object.keys(PRICE)[index]) &&
                        formData.toAppraisalAmount >=
                          parseInt(Object.keys(PRICE)[index])
                      ? `1px solid ${colors.borderBoxBlue}`
                      : `1px solid ${colors.borderBoxGray}`
                }`,
                borderTop: `${
                  index <= 3
                    ? formData.fromAppraisalAmount ===
                        parseInt(Object.keys(PRICE)[index]) ||
                      formData.toAppraisalAmount ===
                        parseInt(Object.keys(PRICE)[index])
                      ? `1px solid ${colors.borderBoxBlue}`
                      : formData.fromAppraisalAmount !== 0 &&
                          formData.fromAppraisalAmount <
                            parseInt(Object.keys(PRICE)[index]) &&
                          formData.toAppraisalAmount >=
                            parseInt(Object.keys(PRICE)[index])
                        ? `1px solid ${colors.borderBoxBlue}`
                        : `1px solid ${colors.borderBoxGray}`
                    : index >= 4
                      ? formData.fromAppraisalAmount ===
                          parseInt(Object.keys(PRICE)[index]) ||
                        formData.toAppraisalAmount ===
                          parseInt(Object.keys(PRICE)[index])
                        ? `1px solid ${colors.borderBoxBlue}`
                        : formData.fromAppraisalAmount !== 0 &&
                            formData.fromAppraisalAmount <
                              parseInt(Object.keys(PRICE)[index]) &&
                            formData.toAppraisalAmount >=
                              parseInt(Object.keys(PRICE)[index])
                          ? `1px solid ${colors.borderBoxBlue}`
                          : formData.fromAppraisalAmount ===
                                parseInt(Object.keys(PRICE)[index - 4]) ||
                              formData.toAppraisalAmount ===
                                parseInt(Object.keys(PRICE)[index - 4])
                            ? `1px solid ${colors.borderBoxBlue}`
                            : formData.fromAppraisalAmount !== 0 &&
                                formData.fromAppraisalAmount <
                                  parseInt(Object.keys(PRICE)[index - 4]) &&
                                formData.toAppraisalAmount >=
                                  parseInt(Object.keys(PRICE)[index - 4]) &&
                                formData.fromAppraisalAmount !==
                                  parseInt(Object.keys(PRICE)[index - 4]) &&
                                formData.toAppraisalAmount !==
                                  parseInt(Object.keys(PRICE)[index - 4])
                              ? `1px solid ${colors.borderBoxBlue}`
                              : `1px solid ${colors.borderBoxGray}`
                      : ''
                }`,
                borderRight: `${
                  index === 3
                    ? formData.fromAppraisalAmount ===
                        parseInt(Object.keys(PRICE)[index]) ||
                      formData.toAppraisalAmount ===
                        parseInt(Object.keys(PRICE)[index])
                      ? `1px solid ${colors.borderBoxBlue}`
                      : formData.fromAppraisalAmount !== 0 &&
                          formData.fromAppraisalAmount <
                            parseInt(Object.keys(PRICE)[index]) &&
                          formData.toAppraisalAmount >=
                            parseInt(Object.keys(PRICE)[index])
                        ? `1px solid ${colors.borderBoxBlue}`
                        : `1px solid ${colors.borderBoxGray}`
                    : index === 7
                      ? formData.fromAppraisalAmount ===
                          parseInt(Object.keys(PRICE)[index]) ||
                        formData.toAppraisalAmount ===
                          parseInt(Object.keys(PRICE)[index])
                        ? `1px solid ${colors.borderBoxBlue}`
                        : formData.fromAppraisalAmount !== 0 &&
                            formData.fromAppraisalAmount <
                              parseInt(Object.keys(PRICE)[index]) &&
                            formData.toAppraisalAmount >=
                              parseInt(Object.keys(PRICE)[index])
                          ? `1px solid ${colors.borderBoxBlue}`
                          : `1px solid ${colors.borderBoxGray}`
                      : ''
                }`,
                borderBottom: `${
                  index <= 3
                    ? ''
                    : formData.fromAppraisalAmount ===
                          parseInt(Object.keys(PRICE)[index]) ||
                        formData.toAppraisalAmount ===
                          parseInt(Object.keys(PRICE)[index])
                      ? `1px solid ${colors.borderBoxBlue}`
                      : formData.fromAppraisalAmount !== 0 &&
                          formData.fromAppraisalAmount <
                            parseInt(Object.keys(PRICE)[index]) &&
                          formData.toAppraisalAmount >=
                            parseInt(Object.keys(PRICE)[index])
                        ? `1px solid ${colors.borderBoxBlue}`
                        : `1px solid ${colors.borderBoxGray}`
                }`,
                backgroundColor: `${
                  formData.fromAppraisalAmount ===
                    parseInt(Object.keys(PRICE)[index]) ||
                  formData.toAppraisalAmount ===
                    parseInt(Object.keys(PRICE)[index])
                    ? '#F0F0FF'
                    : formData.fromAppraisalAmount !== 0 &&
                        formData.fromAppraisalAmount <
                          parseInt(Object.keys(PRICE)[index]) &&
                        formData.toAppraisalAmount >=
                          parseInt(Object.keys(PRICE)[index])
                      ? '#F0F0FF'
                      : 'white'
                }`,
              }}
              onClick={() => {
                handlefromToAppraisalPrice(parseInt(Object.keys(PRICE)[index]))
              }}
            >
              <Text
                fontWeight="500"
                typography="t5"
                style={{
                  color: `${
                    formData.fromAppraisalAmount ===
                      parseInt(Object.keys(PRICE)[index]) ||
                    formData.toAppraisalAmount ===
                      parseInt(Object.keys(PRICE)[index])
                      ? `${colors.borderBoxBlue}`
                      : formData.fromAppraisalAmount !== 0 &&
                          formData.fromAppraisalAmount <
                            parseInt(Object.keys(PRICE)[index]) &&
                          formData.toAppraisalAmount >=
                            parseInt(Object.keys(PRICE)[index])
                        ? `${colors.borderBoxBlue}`
                        : 'black'
                  }`,
                }}
              >
                {value}
              </Text>
            </FlexItem>
            {(index + 1) % 4 === 0 && <br />}
          </React.Fragment>
        ))}
      </FlexContainer>
      <PriceRange formData={formData} setFormData={setFormData} />
    </Flex>
  )
}

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const FlexItem = styled.div`
  display: flex;
  width: 80px;
  height: 45px;
  flex: 1 0 21%;
  padding: 8px 8px 8px 4px;
  justify-content: center;
  align-items: center;
  gap: 1px;
  flex-shrink: 0;
  cursor: pointer;
  box-sizing: border-box;
`

const ContainerStyle = css`
  display: flex;
  width: 350px;
  background-color: white;
`
