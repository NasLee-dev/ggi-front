'use client'

import AreaContainer from '@/app/data-detail/components/SearchContainer/components/AreaContainer'
import DateContainer from '@/app/data-detail/components/SearchContainer/components/DateContainer'
import UseContainer from '@/app/data-detail/components/SearchContainer/components/UseContainer'
import FilterBox from '@/app/shared/components/box/FilterBox'
import { FormProvider, useForm } from 'react-hook-form'

export default function SearchContainer() {
  const methods = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FilterBox title="경매통계 검색">
          <DateContainer control={methods.control} />
          <AreaContainer />
          <UseContainer />
        </FilterBox>
      </form>
    </FormProvider>
  )
}
