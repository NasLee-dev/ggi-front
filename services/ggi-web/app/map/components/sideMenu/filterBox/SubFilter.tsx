import Flex from 'app/map/components/shared/Flex'
import { Form } from 'app/map/models/map/Form'
import { css } from '@emotion/react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import SubFilterProps from './SubFilterProps'
import Arrow from '../../icons/Arrow'
import { NaverMap } from 'app/map/models/map/Map'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { queryKey } from '../../sections/hooks/useMap'
import { SUBFILTERS } from 'app/map/constants/map'

interface SearchBoxProps {
  formData: Form
  setFormData: React.Dispatch<React.SetStateAction<Form>>
  isBoxOpen: {
    finished: boolean
    usage: boolean
    lowPrice: boolean
    price: boolean
  }
  setIsBoxOpen: React.Dispatch<
    React.SetStateAction<{
      finished: boolean
      usage: boolean
      lowPrice: boolean
      price: boolean
    }>
  >
  setOpenOverlay: Dispatch<SetStateAction<boolean>>
}

export default function SubFilter({
  formData,
  setFormData,
  isBoxOpen,
  setIsBoxOpen,
  setOpenOverlay,
}: SearchBoxProps) {
  const [nowChecked, setNowChecked] = useState(1)
  const { data: map }: UseQueryResult<NaverMap> = useQuery({
    queryKey: queryKey,
    enabled: false,
  })
  useEffect(() => {
    if (
      !isBoxOpen.usage &&
      !isBoxOpen.price &&
      !isBoxOpen.lowPrice &&
      !isBoxOpen.finished
    ) {
      setFormData((prev) => {
        return {
          ...prev,
          isSubFilterBoxOpen: false,
        }
      })
    } else if (nowChecked !== 2 && map && map?.getZoom() < 15) {
      setFormData({
        ...formData,
        isSubFilterBoxOpen: false,
      })
    } else {
      setFormData({
        ...formData,
        isSubFilterBoxOpen: true,
      })
    }
  }, [
    isBoxOpen.usage,
    isBoxOpen.price,
    isBoxOpen.lowPrice,
    isBoxOpen.finished,
    map?.getZoom(),
  ])
  return (
    <Flex
      direction="row"
      align="center"
      justify="center"
      css={ContainerStyle}
      onClick={() => {
        setOpenOverlay(false)
      }}
    >
      <SubFilterProps
        isSelected={
          formData.awardedMonths > 0 ||
          formData.egg ||
          formData.egm ||
          formData.ekm
        }
        nowChecked={nowChecked === 1}
        isBoxOpen={isBoxOpen.finished}
        textType={SUBFILTERS.FINISHED}
        onButtonClick={() => {
          setIsBoxOpen({
            usage: false,
            lowPrice: false,
            price: false,
            finished: !isBoxOpen.finished,
          })
          setFormData({
            ...formData,
            lastFilter: 1,
          })
          setNowChecked(1)
        }}
      />
      <SubFilterProps
        isSelected={formData.ids.length > 0}
        textType={SUBFILTERS.USAGE}
        nowChecked={nowChecked === 2}
        isBoxOpen={isBoxOpen.usage}
        onButtonClick={() => {
          setIsBoxOpen({
            finished: false,
            lowPrice: false,
            price: false,
            usage: !isBoxOpen.usage,
          })
          setFormData({
            ...formData,
            lastFilter: 2,
          })
          setNowChecked(2)
        }}
      />
      <SubFilterProps
        isSelected={
          formData.toAppraisalAmount > 0 || formData.fromAppraisalAmount > 0
        }
        nowChecked={nowChecked === 3}
        textType={SUBFILTERS.PRCIE}
        isBoxOpen={isBoxOpen.price}
        onButtonClick={() => {
          setIsBoxOpen({
            lowPrice: false,
            usage: false,
            finished: false,
            price: !isBoxOpen.price,
          })
          setFormData({
            ...formData,
            lastFilter: 3,
          })
          setNowChecked(3)
        }}
      />
      <SubFilterProps
        isSelected={
          formData.toMinimumAmount > 0 || formData.fromMinimumAmount > 0
        }
        nowChecked={nowChecked === 4}
        textType={SUBFILTERS.LOW_PRICE}
        isBoxOpen={isBoxOpen.lowPrice}
        onButtonClick={() => {
          setIsBoxOpen({
            usage: false,
            finished: false,
            price: false,
            lowPrice: !isBoxOpen.lowPrice,
          })
          setFormData({
            ...formData,
            lastFilter: 4,
          })
          setNowChecked(4)
        }}
      />
      <Arrow
        isOpenArrow={formData.isSubFilterBoxOpen}
        setIsOpenArrow={setFormData}
        setIsBoxOpen={setIsBoxOpen}
        formData={formData}
      />
    </Flex>
  )
}

const ContainerStyle = css`
  display: flex;
  padding: 10px;
  background-color: #f9f9f9;
  width: 333px;
  height: 20px;
  gap: 5px;
  transition: all 0.3s ease-in-out;
  z-index: 100;
`
