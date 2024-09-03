import Selectbox from "../../styled/SelectBox"
import useSearchLocals from "./hook/useSearchLocals"
import { useKMFilterStore } from "@/store/dm/useFilterStore"

export default function SelectLocalBox() {
  const { filters, setFilters } = useKMFilterStore()
  const { sidos, sggs, umds } = useSearchLocals(filters.sd, filters.sgg)

  const handleSelectedValue = (prop: string) => (value: string, idx: number) => {
    const newFilters = {
      ...filters,
      [prop]: value === '전체' ? '' : value
    }
    setFilters(newFilters)
  }
  return (
    <>
      <Selectbox 
        options={sidos}
        width="186px" 
        setOption={handleSelectedValue('sd')}
      />
      <Selectbox 
          options={sggs} 
          width="186px" 
          setOption={handleSelectedValue('sgg')}
        />
      <Selectbox 
          options={umds} 
          marginRight={'0'} 
          width="186px" 
          setOption={handleSelectedValue('umd')}
        /> 
    </>
  )
}