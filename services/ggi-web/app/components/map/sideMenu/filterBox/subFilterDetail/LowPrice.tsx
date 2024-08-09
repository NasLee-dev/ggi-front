import Flex from 'app/components/shared/Flex'
import PriceRange from 'app/components/shared/PriceRange'
import Text from 'app/components/shared/Text'
import { formDataAtom } from '@/store/atom/map'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { PRICE } from 'constants/map/SubFilter'
import React, { useCallback } from 'react'
import { useRecoilState } from 'recoil'

interface LowPriceBoxProps {
  fromToMinPrice: number[]
  setFromToMinPrice: React.Dispatch<React.SetStateAction<number[]>>
}

export default function LowPriceBox({
  fromToMinPrice,
  setFromToMinPrice,
}: LowPriceBoxProps) {
  const [formData, setFormData] = useRecoilState(formDataAtom)
  const handlefromToMinPrice = useCallback(
    (price: number) => {
      if (
        price === 3000000001 &&
        fromToMinPrice[0] === 0 &&
        fromToMinPrice[1] === 0
      ) {
        setFromToMinPrice([price, 0])
        setFormData({
          ...formData,
          fromMinimumAmount: price,
          toMinimumAmount: 0,
        })
        return
      } else if (
        fromToMinPrice[0] === 3000000001 &&
        price < 3000000001 &&
        fromToMinPrice[1] === 0
      ) {
        setFromToMinPrice([price, fromToMinPrice[0]])
        setFormData({
          ...formData,
          fromMinimumAmount: price,
          toMinimumAmount: fromToMinPrice[0],
        })
        return
      }
      if (
        fromToMinPrice[0] !== 0 &&
        fromToMinPrice[1] !== 0 &&
        price !== 3000000001
      ) {
        setFromToMinPrice([0, price])
        setFormData({
          ...formData,
          fromMinimumAmount: 0,
          toMinimumAmount: price,
        })
        return
      } else if (
        fromToMinPrice[0] === 0 &&
        fromToMinPrice[1] !== 0 &&
        price < fromToMinPrice[1]
      ) {
        setFromToMinPrice([price, fromToMinPrice[1]])
        setFormData({
          ...formData,
          fromMinimumAmount: price,
          toMinimumAmount: fromToMinPrice[1],
        })
      } else if (
        fromToMinPrice[0] === 0 &&
        fromToMinPrice[1] !== 0 &&
        price > fromToMinPrice[1]
      ) {
        setFromToMinPrice([fromToMinPrice[1], price])
        setFormData({
          ...formData,
          fromMinimumAmount: fromToMinPrice[1],
          toMinimumAmount: price,
        })
      } else if (fromToMinPrice[0] === 0 && fromToMinPrice[1] === 0) {
        setFromToMinPrice([0, price])
        setFormData({
          ...formData,
          fromMinimumAmount: 0,
          toMinimumAmount: price,
        })
      } else if (
        fromToMinPrice[0] !== 0 &&
        fromToMinPrice[1] !== 0 &&
        price === 3000000001
      ) {
        setFromToMinPrice([price, 0])
        setFormData({
          ...formData,
          fromMinimumAmount: price,
          toMinimumAmount: 0,
        })
      } else if (
        fromToMinPrice[0] === 0 &&
        fromToMinPrice[1] !== 0 &&
        price === fromToMinPrice[1] &&
        price !== 3000000001
      ) {
        setFromToMinPrice([0, 0])
        setFormData({
          ...formData,
          fromMinimumAmount: 0,
          toMinimumAmount: 0,
        })
      } else if (
        fromToMinPrice[1] === 0 &&
        price === 3000000001 &&
        fromToMinPrice[0] === price
      ) {
        setFromToMinPrice([0, 0])
        setFormData({
          ...formData,
          fromMinimumAmount: 0,
          toMinimumAmount: 0,
        })
      }
    },
    [formData, fromToMinPrice, setFormData, setFromToMinPrice],
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
                  formData.fromMinimumAmount ===
                    parseInt(Object.keys(PRICE)[index]) ||
                  formData.toMinimumAmount ===
                    parseInt(Object.keys(PRICE)[index]) ||
                  formData.fromMinimumAmount ===
                    parseInt(Object.keys(PRICE)[index - 1]) ||
                  (formData.toMinimumAmount ===
                    parseInt(Object.keys(PRICE)[index - 1]) &&
                    formData.toMinimumAmount !== 300000000)
                    ? '1px solid #007AFF'
                    : formData.fromMinimumAmount !== 0 &&
                        formData.fromMinimumAmount <
                          parseInt(Object.keys(PRICE)[index]) &&
                        formData.toMinimumAmount >=
                          parseInt(Object.keys(PRICE)[index])
                      ? '1px solid #007AFF'
                      : '1px solid #e5e5e5'
                }`,
                borderTop: `${
                  index <= 3
                    ? formData.fromMinimumAmount ===
                        parseInt(Object.keys(PRICE)[index]) ||
                      formData.toMinimumAmount ===
                        parseInt(Object.keys(PRICE)[index])
                      ? '1px solid #007AFF'
                      : formData.fromMinimumAmount !== 0 &&
                          formData.fromMinimumAmount <
                            parseInt(Object.keys(PRICE)[index]) &&
                          formData.toMinimumAmount >=
                            parseInt(Object.keys(PRICE)[index])
                        ? '1px solid #007AFF'
                        : '1px solid #e5e5e5'
                    : index >= 4
                      ? formData.fromMinimumAmount ===
                          parseInt(Object.keys(PRICE)[index]) ||
                        formData.toMinimumAmount ===
                          parseInt(Object.keys(PRICE)[index])
                        ? '1px solid #007AFF'
                        : formData.fromMinimumAmount !== 0 &&
                            formData.fromMinimumAmount <
                              parseInt(Object.keys(PRICE)[index]) &&
                            formData.toMinimumAmount >=
                              parseInt(Object.keys(PRICE)[index])
                          ? '1px solid #007AFF'
                          : formData.fromMinimumAmount ===
                                parseInt(Object.keys(PRICE)[index - 4]) ||
                              formData.toMinimumAmount ===
                                parseInt(Object.keys(PRICE)[index - 4])
                            ? '1px solid #007AFF'
                            : formData.fromMinimumAmount !== 0 &&
                                formData.fromMinimumAmount <
                                  parseInt(Object.keys(PRICE)[index - 4]) &&
                                formData.toMinimumAmount >=
                                  parseInt(Object.keys(PRICE)[index - 4]) &&
                                formData.fromMinimumAmount !==
                                  parseInt(Object.keys(PRICE)[index - 4]) &&
                                formData.toMinimumAmount !==
                                  parseInt(Object.keys(PRICE)[index - 4])
                              ? '1px solid #007AFF'
                              : '1px solid #e5e5e5'
                      : ''
                }`,
                borderRight: `${
                  index === 3
                    ? formData.fromMinimumAmount ===
                        parseInt(Object.keys(PRICE)[index]) ||
                      formData.toMinimumAmount ===
                        parseInt(Object.keys(PRICE)[index])
                      ? '1px solid #007AFF'
                      : formData.fromMinimumAmount !== 0 &&
                          formData.fromMinimumAmount <
                            parseInt(Object.keys(PRICE)[index]) &&
                          formData.toMinimumAmount >=
                            parseInt(Object.keys(PRICE)[index])
                        ? '1px solid #007AFF'
                        : '1px solid #e5e5e5'
                    : index === 7
                      ? formData.fromMinimumAmount ===
                          parseInt(Object.keys(PRICE)[index]) ||
                        formData.toMinimumAmount ===
                          parseInt(Object.keys(PRICE)[index])
                        ? '1px solid #007AFF'
                        : formData.fromMinimumAmount !== 0 &&
                            formData.fromMinimumAmount <
                              parseInt(Object.keys(PRICE)[index]) &&
                            formData.toMinimumAmount >=
                              parseInt(Object.keys(PRICE)[index])
                          ? '1px solid #007AFF'
                          : '1px solid #e5e5e5'
                      : ''
                }`,
                borderBottom: `${
                  index <= 3
                    ? ''
                    : formData.fromMinimumAmount ===
                          parseInt(Object.keys(PRICE)[index]) ||
                        formData.toMinimumAmount ===
                          parseInt(Object.keys(PRICE)[index])
                      ? '1px solid #007AFF'
                      : formData.fromMinimumAmount !== 0 &&
                          formData.fromMinimumAmount <
                            parseInt(Object.keys(PRICE)[index]) &&
                          formData.toMinimumAmount >=
                            parseInt(Object.keys(PRICE)[index])
                        ? '1px solid #007AFF'
                        : '1px solid #e5e5e5'
                }`,
                backgroundColor: `${
                  formData.fromMinimumAmount ===
                    parseInt(Object.keys(PRICE)[index]) ||
                  formData.toMinimumAmount ===
                    parseInt(Object.keys(PRICE)[index])
                    ? '#F0F0FF'
                    : formData.fromMinimumAmount !== 0 &&
                        formData.fromMinimumAmount <
                          parseInt(Object.keys(PRICE)[index]) &&
                        formData.toMinimumAmount >=
                          parseInt(Object.keys(PRICE)[index])
                      ? '#F0F0FF'
                      : 'white'
                }`,
              }}
              onClick={() => {
                handlefromToMinPrice(parseInt(Object.keys(PRICE)[index]))
              }}
            >
              <Text
                fontWeight="500"
                typography="t5"
                style={{
                  color: `${
                    formData.fromMinimumAmount ===
                      parseInt(Object.keys(PRICE)[index]) ||
                    formData.toMinimumAmount ===
                      parseInt(Object.keys(PRICE)[index])
                      ? '#007AFF'
                      : formData.fromMinimumAmount !== 0 &&
                          formData.fromMinimumAmount <
                            parseInt(Object.keys(PRICE)[index]) &&
                          formData.toMinimumAmount >=
                            parseInt(Object.keys(PRICE)[index])
                        ? '#007AFF'
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

const ContainerStyle = css`
  display: flex;
  width: 100%;
  background-color: white;
`

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

const BoxStyle = css`
  display: flex;
  width: 80px;
  height: 45px;
  padding: 8px 8px 8px 4px;
  justify-content: center;
  align-items: center;
  gap: 1px;
  flex-shrink: 0;
  cursor: pointer;
`
