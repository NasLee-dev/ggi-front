import Flex from 'app/components/shared/Flex'
import Text from 'app/components/shared/Text'
import { formDataAtom } from '@/store/atom/map'
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

interface SelectAllProps {
  type: number
}

export default function SelectAll({ type }: SelectAllProps) {
  const [formData, setFormData] = useRecoilState(formDataAtom)
  const [isAllSelected, setIsAllSelected] = useState({
    finished: false,
    usage: false,
    lowPrice: false,
    price: false,
  })
  const handleIsAllSelected = () => {
    if (formData.ids.length === 12 || formData.ids.length === 0) {
      setIsAllSelected({ ...isAllSelected, finished: true })
    } else if (
      formData.fromAppraisalAmount === 10000000 &&
      formData.toAppraisalAmount === 3000000001
    ) {
      setIsAllSelected({ ...isAllSelected, price: true })
    }
  }
  const handleSelectAll = () => {
    if (type === 1) {
      return null
    } else if (type === 2) {
      if (formData.ids.length === 12) {
        setFormData((prev) => {
          return {
            ...prev,
            ids: [],
          }
        })
      } else {
        setFormData({
          ...formData,
          ids: [
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
          ],
        })
      }
    } else if (type === 3) {
      if (
        formData.fromAppraisalAmount === 10000000 &&
        formData.toAppraisalAmount === 3000000001
      ) {
        setFormData({
          ...formData,
          fromAppraisalAmount: 0,
          toAppraisalAmount: 0,
        })
      } else {
        setFormData({
          ...formData,
          fromAppraisalAmount: 10000000,
          toAppraisalAmount: 3000000001,
        })
      }
    } else {
      if (
        formData.fromMinimumAmount === 10000000 &&
        formData.toMinimumAmount === 3000000001
      ) {
        setFormData({
          ...formData,
          fromMinimumAmount: 0,
          toMinimumAmount: 0,
        })
      } else {
        setFormData({
          ...formData,
          fromMinimumAmount: 10000000,
          toMinimumAmount: 3000000001,
        })
      }
    }
  }

  useEffect(() => {
    handleIsAllSelected()
  }, [
    formData.ids,
    formData.fromAppraisalAmount,
    formData.toAppraisalAmount,
    formData.fromMinimumAmount,
    formData.toMinimumAmount,
  ])

  return (
    <Flex
      justify="center"
      align="center"
      css={ContainerStyle}
      style={{
        backgroundColor:
          type === 2 && formData.ids.length === 12
            ? '#F0F0FF'
            : type === 3 &&
                formData.fromAppraisalAmount === 10000000 &&
                formData.toAppraisalAmount === 3000000001
              ? '#F0F0FF'
              : type === 4 &&
                  formData.fromMinimumAmount === 10000000 &&
                  formData.toMinimumAmount === 3000000001
                ? '#F0F0FF'
                : '#FFFFFF',
        border:
          type === 2 && formData.ids.length === 12
            ? '1px solid #007AFF'
            : type === 3 &&
                formData.fromAppraisalAmount === 10000000 &&
                formData.toAppraisalAmount === 3000000001
              ? '1px solid #007AFF'
              : type === 4 &&
                  formData.fromMinimumAmount === 10000000 &&
                  formData.toMinimumAmount === 3000000001
                ? '1px solid #007AFF'
                : '1px solid #E5E5E5',
      }}
      direction="row"
      onClick={handleSelectAll}
    >
      <div
        style={{
          display: `${
            type === 2 && formData.ids.length === 12
              ? 'block'
              : type === 3 &&
                  formData.fromAppraisalAmount === 10000000 &&
                  formData.toAppraisalAmount === 3000000001
                ? 'block'
                : type === 4 &&
                    formData.fromMinimumAmount === 10000000 &&
                    formData.toMinimumAmount === 3000000001
                  ? 'block'
                  : 'none'
          }`,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="10"
          viewBox="0 0 11 10"
          fill="none"
        >
          <path
            d="M0.5 6.56573L3.91667 8.84768C4.00843 8.91077 4.11587 8.95599 4.23119 8.98006C4.34651 9.00413 4.46681 9.00644 4.58333 8.98683C4.70097 8.9684 4.81248 8.92904 4.91026 8.87141C5.00804 8.81379 5.08981 8.73925 5.15 8.65288L10.5 1"
            stroke="#332EFC"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <Text
        style={{
          color: `${
            type === 2 && formData.ids.length === 12
              ? '#332EFC'
              : type === 3 &&
                  formData.fromAppraisalAmount === 10000000 &&
                  formData.toAppraisalAmount === 3000000001
                ? '#332EFC'
                : type === 4 &&
                    formData.fromMinimumAmount === 10000000 &&
                    formData.toMinimumAmount === 3000000001
                  ? '#332EFC'
                  : '#333333'
          }`,
        }}
        css={fontStyle}
      >
        전체선택
      </Text>
    </Flex>
  )
}

const ContainerStyle = css`
  display: flex;
  width: 92px;
  height: 28px;
  padding: 1px 6px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  border-radius: 100px;
  cursor: pointer;
`

const fontStyle = css`
  text-align: center;
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 135%;
  letter-spacing: -0.14px;
`
