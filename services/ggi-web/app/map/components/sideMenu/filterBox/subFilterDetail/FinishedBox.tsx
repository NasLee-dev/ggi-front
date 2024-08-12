'use client'
import Reset from 'app/map/components/icons/Reset'
import Flex from 'app/map/components/shared/Flex'
import Spacing from 'app/map/components/shared/Spacing'
import Text from 'app/map/components/shared/Text'
import { formDataAtom } from '@/store/atom/map'
import { css } from '@emotion/react'
import { MULGUN, MULGUN_SUB } from 'constants/map/SubFilter'
import { useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'

interface FinishedBoxProps {
  handleReset: () => void
}

export default function FinishedBox({ handleReset }: FinishedBoxProps) {
  const [formData, setFormData] = useRecoilState(formDataAtom)
  const handleGubunBoxClick = useCallback(
    (index: number) => {
      if (index === 0) {
        setFormData({
          ...formData,
          ekm: !formData.ekm,
        })
      } else if (index === 1) {
        setFormData({
          ...formData,
          egm: !formData.egm,
        })
      } else {
        setFormData({
          ...formData,
          egg: !formData.egg,
        })
      }
    },
    [formData, setFormData],
  )

  const handleFinishedBoxClick = useCallback(
    (index: number) => {
      setFormData({
        ...formData,
        awardedMonths:
          formData.awardedMonths === Number(Object.keys(MULGUN)[index])
            ? 0
            : Number(Object.keys(MULGUN)[index]),
      })
    },
    [formData, setFormData],
  )

  useEffect(() => {
    if (formData.ekm || formData.egm || formData.egg) {
      if (formData.awardedMonths === 0) {
        setFormData({
          ...formData,
          awardedMonths: 3,
        })
      } else {
        setFormData({
          ...formData,
          awardedMonths: formData.awardedMonths,
        })
      }
    } else if (!formData.ekm && !formData.egm && !formData.egg) {
      setFormData({
        ...formData,
        awardedMonths: 0,
      })
    }
  }, [formData.ekm, formData.egm, formData.egg, setFormData])

  return (
    <Flex justify="start" direction="column" css={ContainerStyle}>
      <Flex direction="column">
        <Flex justify="space-between">
          <Flex
            justify="row"
            style={{
              gap: '10px',
              marginTop: '5px',
            }}
          >
            <Text
              typography="t4"
              fontWeight="700"
              color="black"
              textAlign="left"
            >
              구분
            </Text>
            <Text
              typography="t6"
              fontWeight="500"
              color="textGray"
              textAlign="right"
            >
              낙찰 정보를 함께 표시합니다
            </Text>
          </Flex>
          <Flex onClick={handleReset}>
            <Reset />
          </Flex>
        </Flex>
        <Spacing direction="vertical" size={10} />
        <Flex>
          {Object.values(MULGUN_SUB).map((value, index) => {
            return (
              <Flex
                justify="center"
                align="center"
                key={index}
                css={BoxStyle}
                onClick={() => {
                  handleGubunBoxClick(index)
                }}
                style={{
                  borderLeft:
                    index === 0
                      ? formData.ekm
                        ? '1px solid #332EFC'
                        : '1px solid #E5E5E5'
                      : index === 1
                        ? formData.egm
                          ? '1px solid #332EFC'
                          : '1px solid #E5E5E5'
                        : index === 2
                          ? formData.egg
                            ? '1px solid #332EFC'
                            : '1px solid #E5E5E5'
                          : 'none',
                  borderRight:
                    index === 0
                      ? formData.ekm && !formData.egm
                        ? '1px solid #332EFC'
                        : ''
                      : index === 1
                        ? formData.egm && !formData.egg
                          ? '1px solid #332EFC'
                          : ''
                        : index === 2
                          ? formData.egg
                            ? '1px solid #332EFC'
                            : '1px solid #E5E5E5'
                          : 'none',
                  borderTop:
                    index === 0
                      ? formData.ekm
                        ? '1px solid #332EFC'
                        : '1px solid #E5E5E5'
                      : index === 1
                        ? formData.egm
                          ? '1px solid #332EFC'
                          : '1px solid #E5E5E5'
                        : index === 2
                          ? formData.egg
                            ? '1px solid #332EFC'
                            : '1px solid #E5E5E5'
                          : 'none',
                  borderBottom:
                    index === 0
                      ? formData.ekm
                        ? '1px solid #332EFC'
                        : '1px solid #E5E5E5'
                      : index === 1
                        ? formData.egm
                          ? '1px solid #332EFC'
                          : '1px solid #E5E5E5'
                        : index === 2
                          ? formData.egg
                            ? '1px solid #332EFC'
                            : '1px solid #E5E5E5'
                          : 'none',
                  backgroundColor:
                    index === 0
                      ? formData.ekm
                        ? '#F0F0FF'
                        : 'white'
                      : index === 1
                        ? formData.egm
                          ? '#F0F0FF'
                          : 'white'
                        : formData.egg
                          ? '#F0F0FF'
                          : 'white',
                }}
              >
                <Text
                  fontWeight="500"
                  typography="t5"
                  style={{
                    color:
                      index === 0
                        ? formData.ekm
                          ? '#332EFC'
                          : 'black'
                        : index === 1
                          ? formData.egm
                            ? '#332EFC'
                            : 'black'
                          : formData.egg
                            ? '#332EFC'
                            : 'black',
                  }}
                >
                  {value}
                </Text>
              </Flex>
            )
          })}
        </Flex>
      </Flex>
      <Spacing size={10} />
      <Flex direction="column">
        <Flex justify="start">
          <Text typography="t4" fontWeight="700" color="black" textAlign="left">
            기간
          </Text>
        </Flex>
        <Spacing direction="vertical" size={10} />
        <Flex direction="row" justify="center">
          {Object.values(MULGUN)
            .slice(0, 3)
            .map((value, index) => (
              <Flex
                justify="center"
                align="center"
                key={index}
                css={BoxStyle}
                onClick={() => {
                  formData.egg || formData.egm || formData.ekm
                    ? handleFinishedBoxClick(index)
                    : null
                }}
                style={{
                  borderLeft:
                    formData.awardedMonths ===
                    Number(Object.keys(MULGUN)[index])
                      ? '1px solid #332EFC'
                      : '1px solid #E5E5E5',
                  borderTop:
                    formData.awardedMonths ===
                    Number(Object.keys(MULGUN)[index])
                      ? '1px solid #332EFC'
                      : '1px solid #E5E5E5',
                  backgroundColor:
                    formData.awardedMonths ===
                    Number(Object.keys(MULGUN)[index])
                      ? '#F0F0FF'
                      : 'white',
                  borderRight:
                    Number(Object.keys(MULGUN)[index]) === 9
                      ? formData.awardedMonths === 9
                        ? '1px solid #332EFC'
                        : '1px solid #E5E5E5'
                      : formData.awardedMonths ===
                          Number(Object.keys(MULGUN)[index])
                        ? '1px solid #332EFC'
                        : '',

                  cursor:
                    formData.egg || formData.egm || formData.ekm
                      ? 'pointer'
                      : 'not-allowed',
                }}
              >
                <Text
                  fontWeight="500"
                  typography="t5"
                  style={{
                    color:
                      formData.awardedMonths ===
                      Number(Object.keys(MULGUN)[index])
                        ? '#332EFC'
                        : 'black',
                  }}
                >
                  {value}
                </Text>
              </Flex>
            ))}
        </Flex>
        <Flex direction="row" justify="center">
          {Object.values(MULGUN)
            .slice(3, 6)
            .map((value, index) => (
              <Flex
                justify="center"
                align="center"
                key={index}
                css={BoxStyle}
                onClick={() => {
                  formData.egg || formData.egm || formData.ekm
                    ? handleFinishedBoxClick(index + 3)
                    : null
                }}
                style={{
                  borderLeft:
                    formData.awardedMonths ===
                    Number(Object.keys(MULGUN)[index + 3])
                      ? '1px solid #332EFC'
                      : '1px solid #E5E5E5',
                  borderTop:
                    formData.awardedMonths ===
                      Number(Object.keys(MULGUN)[index + 3]) ||
                    formData.awardedMonths ===
                      Number(Object.keys(MULGUN)[index])
                      ? '1px solid #332EFC'
                      : '1px solid #E5E5E5',
                  borderBottom:
                    formData.awardedMonths ===
                    Number(Object.keys(MULGUN)[index + 3])
                      ? '1px solid #332EFC'
                      : '1px solid #E5E5E5',
                  borderRight:
                    Number(Object.keys(MULGUN)[index + 3]) === 60
                      ? formData.awardedMonths === 60
                        ? '1px solid #332EFC'
                        : '1px solid #E5E5E5'
                      : formData.awardedMonths ===
                          Number(Object.keys(MULGUN)[index + 3])
                        ? '1px solid #332EFC'
                        : '',
                  backgroundColor:
                    formData.awardedMonths ===
                    Number(Object.keys(MULGUN)[index + 3])
                      ? '#F0F0FF'
                      : 'white',
                  cursor:
                    formData.egg || formData.egm || formData.ekm
                      ? 'pointer'
                      : 'not-allowed',
                }}
              >
                <Text
                  fontWeight="500"
                  typography="t5"
                  style={{
                    color:
                      formData.awardedMonths ===
                      Number(Object.keys(MULGUN)[index + 3])
                        ? '#332EFC'
                        : 'black',
                  }}
                >
                  {value}
                </Text>
              </Flex>
            ))}
        </Flex>
      </Flex>
    </Flex>
  )
}

const ContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  background-color: white;
`

const BoxStyle = css`
  display: flex;
  width: 115px;
  height: 40px;
  cursor: pointer;
`
