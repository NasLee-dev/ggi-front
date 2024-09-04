'use client'

import AreaContainer from '@/app/data-detail/components/SearchContainer/components/AreaContainer'
import DateContainer from '@/app/data-detail/components/SearchContainer/components/DateContainer'
import UseContainer from '@/app/data-detail/components/SearchContainer/components/UseContainer'
import FilterBox from '@/app/shared/components/box/FilterBox'
import Button from '@/app/shared/components/buttons/Button'
import useWindowSize from '@/app/shared/hooks/useWindowSize'
import { FormProvider, useForm } from 'react-hook-form'

export default function SearchContainer() {
  const methods = useForm()
  const size = useWindowSize()
  const isMobile = size.width < 1080

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <form
        className="pb-10 border-b border-[#E5E7EB] mb-10 ggi:px-4 ggi:pb-5 ggi:border-b-[6px] ggi:border-[#F1F2F6] ggi:mb-5"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <FilterBox title="경매통계 검색">
          <DateContainer control={methods.control} />
          <AreaContainer />
          <UseContainer />
        </FilterBox>
        <div className="flex gap-2 justify-center items-center mt-10 ggi:mt-5 ggi:gap-3 ggi:justify-between">
          <Button
            text="초기화"
            width={isMobile ? '49%' : '83px'}
            height={isMobile && '42px'}
            styleType="plain"
          />
          <Button
            text="검색하기"
            width={isMobile && '49%'}
            height={isMobile && '42px'}
            styleType="colored"
          />
        </div>
      </form>
    </FormProvider>
  )
}
