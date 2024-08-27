'use client'
import Flex from 'app/map/components/shared/Flex'
import Text from 'app/map/components/shared/Text'
import { formDataAtom } from '@/store/atom/map'
import { css } from '@emotion/react'
import { USAGE } from 'app/map/constants/map/SubFilter'
import { useRecoilState } from 'recoil'
import { colors } from 'app/styles/colorPallette'

export default function UsageBox() {
  const [formData, setFormData] = useRecoilState(formDataAtom)
  const handleAddUsage = (id: number) => {
    const idStr = id.toString()
    setFormData((prev) => {
      const updatedIds = prev.ids.includes(idStr)
        ? prev.ids.filter((existingId) => existingId !== idStr)
        : [...prev.ids, idStr]
      return { ...prev, ids: updatedIds }
    })
  }
  return (
    <Flex justify="start" direction="column" align="center">
      <Flex direction="row" justify="center" css={ContainerStyle}>
        {Object.values(USAGE)
          .slice(1, 4)
          .map((value, index) => (
            <Flex
              key={index}
              css={BoxStyle}
              onClick={() => {
                console.log(index)
                handleAddUsage(Number(Object.keys(USAGE)[index + 1]))
              }}
              style={{
                backgroundColor: formData.ids.includes(
                  Object.keys(USAGE)[index + 1].toString(),
                )
                  ? `${colors.selectedUsageType}`
                  : 'white',
                borderLeft: formData.ids.includes(
                  Object.keys(USAGE)[index + 1].toString(),
                )
                  ? `1px solid ${colors.selectedFilter}`
                  : formData.ids.includes(Object.keys(USAGE)[index].toString())
                    ? `1px solid ${colors.selectedFilter}`
                    : `1px solid ${colors.borderGray}`,
                borderTop: formData.ids.includes(
                  Object.keys(USAGE)[index + 1].toString(),
                )
                  ? `1px solid ${colors.selectedFilter}`
                  : `1px solid ${colors.borderGray}`,
                borderRight:
                  index === 2
                    ? formData.ids.includes(
                        Object.keys(USAGE)[index + 1].toString(),
                      )
                      ? `1px solid ${colors.selectedFilter}`
                      : `1px solid ${colors.borderGray}`
                    : ``,
              }}
            >
              <Text
                fontWeight="500"
                typography="t5"
                color={
                  formData.ids.includes(
                    Object.keys(USAGE)[index + 1].toString(),
                  )
                    ? 'filterBlue'
                    : 'black'
                }
              >
                {value}
              </Text>
            </Flex>
          ))}
      </Flex>
      <Flex direction="row" justify="center" css={ContainerStyle}>
        {Object.values(USAGE)
          .slice(4, 7)
          .map((value, index) => (
            <Flex
              key={index}
              css={BoxStyle}
              onClick={() => {
                handleAddUsage(Number(Object.keys(USAGE)[index + 4]))
              }}
              style={{
                backgroundColor: formData.ids.includes(
                  Object.keys(USAGE)[index + 4].toString(),
                )
                  ? `${colors.selectedUsageType}`
                  : 'white',
                borderLeft: formData.ids.includes(
                  Object.keys(USAGE)[index + 4].toString(),
                )
                  ? `1px solid ${colors.selectedFilter}`
                  : formData.ids.includes(
                        Object.keys(USAGE)[index + 3].toString(),
                      ) && Object.keys(USAGE)[index + 3].toString() !== '4'
                    ? `1px solid ${colors.selectedFilter}`
                    : `1px solid ${colors.borderGray}`,
                borderTop:
                  formData.ids.includes(
                    Object.keys(USAGE)[index + 4].toString(),
                  ) ||
                  formData.ids.includes(
                    Object.keys(USAGE)[index + 1].toString(),
                  )
                    ? `1px solid ${colors.selectedFilter}`
                    : `1px solid ${colors.borderGray}`,
                borderRight:
                  index === 2
                    ? formData.ids.includes(
                        Object.keys(USAGE)[index + 4].toString(),
                      )
                      ? `1px solid ${colors.selectedFilter}`
                      : `1px solid ${colors.borderGray}`
                    : ``,
              }}
            >
              <Text
                fontWeight="500"
                typography="t5"
                color={
                  formData.ids.includes(
                    Object.keys(USAGE)[index + 4].toString(),
                  )
                    ? 'filterBlue'
                    : 'black'
                }
              >
                {value}
              </Text>
            </Flex>
          ))}
      </Flex>
      <Flex direction="row" justify="center" css={ContainerStyle}>
        {Object.values(USAGE)
          .slice(7, 10)
          .map((value, index) => (
            <Flex
              key={index}
              css={BoxStyle}
              onClick={() => {
                handleAddUsage(Number(Object.keys(USAGE)[index + 7]))
              }}
              style={{
                backgroundColor: formData.ids.includes(
                  Object.keys(USAGE)[index + 7].toString(),
                )
                  ? `${colors.selectedUsageType}`
                  : 'white',
                borderLeft: formData.ids.includes(
                  Object.keys(USAGE)[index + 7].toString(),
                )
                  ? `1px solid ${colors.selectedFilter}`
                  : formData.ids.includes(
                        Object.keys(USAGE)[index + 6].toString(),
                      ) && Object.keys(USAGE)[index + 6].toString() !== '7'
                    ? `1px solid ${colors.selectedFilter}`
                    : `1px solid ${colors.borderGray}`,
                borderTop:
                  formData.ids.includes(
                    Object.keys(USAGE)[index + 7].toString(),
                  ) ||
                  formData.ids.includes(
                    Object.keys(USAGE)[index + 4].toString(),
                  )
                    ? `1px solid ${colors.selectedFilter}`
                    : `1px solid ${colors.borderGray}`,
                borderRight:
                  index === 2
                    ? formData.ids.includes(
                        Object.keys(USAGE)[index + 7].toString(),
                      )
                      ? `1px solid ${colors.selectedFilter}`
                      : `1px solid ${colors.borderGray}`
                    : ``,
              }}
            >
              <Text
                fontWeight="500"
                typography="t5"
                color={
                  formData.ids.includes(
                    Object.keys(USAGE)[index + 7].toString(),
                  )
                    ? 'filterBlue'
                    : 'black'
                }
              >
                {value}
              </Text>
            </Flex>
          ))}
      </Flex>
      <Flex direction="row" justify="center" css={ContainerStyle}>
        {Object.values(USAGE)
          .slice(10, 13)
          .map((value, index) => (
            <Flex
              key={index}
              css={BoxStyle}
              style={{
                backgroundColor: formData.ids.includes(
                  Object.keys(USAGE)[index + 10].toString(),
                )
                  ? `${colors.selectedUsageType}`
                  : 'white',
                borderLeft: formData.ids.includes(
                  Object.keys(USAGE)[index + 10].toString(),
                )
                  ? `1px solid ${colors.selectedFilter}`
                  : formData.ids.includes(
                        Object.keys(USAGE)[index + 9].toString(),
                      ) && Object.keys(USAGE)[index + 9].toString() !== '11'
                    ? `1px solid ${colors.selectedFilter}`
                    : `1px solid ${colors.borderGray}`,
                borderTop:
                  formData.ids.includes(
                    Object.keys(USAGE)[index + 10].toString(),
                  ) ||
                  formData.ids.includes(
                    Object.keys(USAGE)[index + 7].toString(),
                  )
                    ? `1px solid ${colors.selectedFilter}`
                    : `1px solid ${colors.borderGray}`,
                borderRight:
                  index === 2
                    ? formData.ids.includes(
                        Object.keys(USAGE)[index + 10].toString(),
                      )
                      ? `1px solid ${colors.selectedFilter}`
                      : `1px solid ${colors.borderGray}`
                    : ``,
                borderBottom: formData.ids.includes(
                  Object.keys(USAGE)[index + 10].toString(),
                )
                  ? `1px solid ${colors.selectedFilter}`
                  : `1px solid ${colors.borderGray}`,
              }}
              onClick={() => {
                handleAddUsage(Number(Object.keys(USAGE)[index + 10]))
              }}
            >
              <Text
                fontWeight="500"
                typography="t5"
                color={
                  formData.ids.includes(
                    Object.keys(USAGE)[index + 10].toString(),
                  )
                    ? 'filterBlue'
                    : 'black'
                }
              >
                {value}
              </Text>
            </Flex>
          ))}
      </Flex>
    </Flex>
  )
}

const ContainerStyle = css`
  display: flex;
  width: 350px;
  height: 40px;
  background-color: white;
`

const BoxStyle = css`
  display: flex;
  width: 115px;
  height: 45px;
  justify-content: center;
  align-items: center;
  gap: 1px;
  flex-shrink: 0;
  cursor: pointer;
`
