import { useState } from "react"
import Selectbox from "../../styled/SelectBox"
import useSearchCourts from "./hook/useSearchCourts"
import { useKMFilterStore } from "@/store/dm/useFilterStore"

interface ISelectCourtProps {
  court: boolean
}
export default function SelectLocalBox({
  court
}: ISelectCourtProps) {
  const { filters, setFilters } = useKMFilterStore()
  const { court1s, court2s, court3s } = useSearchCourts(filters.code1, filters.code2)
  
  const handleSelectedValue = (prop: string) => (value: string, idx: number) => {
    const newFilters = {
      ...filters,
      [prop]: value
    }
    setFilters(newFilters)
  }
  return (
    <>
    {court1s 
      ? <Selectbox 
          options={court1s}
          width="186px" 
          setOption={handleSelectedValue('code1')}
          court={court}
        />
      : null}
    {court2s 
      ? <Selectbox 
          options={court2s} 
          width="186px" 
          setOption={handleSelectedValue('code2')}
          court={court}
        /> 
      : null}
    {court3s
      ? <Selectbox 
          options={court3s} 
          marginRight={'0'} 
          width="186px" 
          setOption={handleSelectedValue('code3')}
          court={court}
        /> 
      : null}
    </>
  )
}