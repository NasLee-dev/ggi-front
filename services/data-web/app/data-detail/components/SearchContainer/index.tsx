'use client'

import AreaContainer from '@/app/data-detail/components/SearchContainer/components/AreaContainer'
import DateContainer from '@/app/data-detail/components/SearchContainer/components/DateContainer'
import UseContainer from '@/app/data-detail/components/SearchContainer/components/UseContainer'
import FilterBox from '@/app/shared/components/box/FilterBox'
import Button from '@/app/shared/components/buttons/Button'
import { FormProvider, useForm } from 'react-hook-form'

export default function SearchContainer() {
  const methods = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <form
        className="pb-10 border-b border-[#E5E7EB] mb-10"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <FilterBox title="경매통계 검색">
          <DateContainer control={methods.control} />
          <AreaContainer />
          <UseContainer />
        </FilterBox>
        <div className="flex gap-2 justify-center items-center mt-10">
          <Button text="초기화" width="83px" styleType="plain" />
          <Button text="검색하기" styleType="colored" />
        </div>
      </form>
    </FormProvider>
  )
}
