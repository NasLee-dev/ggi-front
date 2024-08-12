'use client'
import Flex from 'app/map/components/shared/Flex'
import { useRecoilState } from 'recoil'
import { formDataAtom } from '@/store/atom/map'
import { useState } from 'react'
import Reset from 'app/map/components/icons/Reset'
import FinishedBox from './FinishedBox'
import SelectAll from 'app/map/components/icons/SelectAll'
import UsageBox from './UsageBox'
import PriceBox from './PriceBox'
import LowPriceBox from './LowPrice'

interface SearchBoxProps {
  isBoxOpen: {
    finished: boolean
    usage: boolean
    lowPrice: boolean
    price: boolean
  }
}

export default function DetailBox({ isBoxOpen }: SearchBoxProps) {
  const [formData, setFormData] = useRecoilState(formDataAtom)
  const [fromToAppraisalPrice, setFromToAppraisalPrice] = useState([0, 0])
  const [fromToMinPrice, setFromToMinPrice] = useState([0, 0])
  const handleReset = () => {
    setFormData((prev) => {
      return {
        ...prev,
        ekm: false,
        egm: false,
        egg: false,
        awardedMonths: 0,
        ids: [],
        fromAppraisalAmount: 0,
        toAppraisalAmount: 0,
        fromMinimumAmount: 0,
        toMinimumAmount: 0,
      }
    })
    setFromToAppraisalPrice([0, 0])
    setFromToMinPrice([0, 0])
  }
  return (
    <Flex
      direction="column"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        position: 'relative',
        width: '350px',
        height: `${
          formData.lastFilter === 1
            ? '220px'
            : formData.lastFilter === 2
              ? '230px'
              : formData.lastFilter === 3
                ? '190px'
                : formData.lastFilter === 4
                  ? '190px'
                  : '0px'
        }`,
      }}
    >
      {formData.lastFilter === 1 || formData.lastFilter === 0 ? null : (
        <Flex
          justify="space-between"
          style={{
            width: '350px',
          }}
        >
          <SelectAll type={formData.lastFilter} />
          <Flex onClick={handleReset}>
            <Reset />
          </Flex>
        </Flex>
      )}
      {isBoxOpen.usage && <UsageBox />}
      {isBoxOpen.price && (
        <PriceBox
          fromToAppraisalPrice={fromToAppraisalPrice}
          setFromToAppraisalPrice={setFromToAppraisalPrice}
        />
      )}
      {isBoxOpen.lowPrice && (
        <LowPriceBox
          fromToMinPrice={fromToMinPrice}
          setFromToMinPrice={setFromToMinPrice}
        />
      )}
      {isBoxOpen.finished && <FinishedBox handleReset={handleReset} />}
    </Flex>
  )
}
