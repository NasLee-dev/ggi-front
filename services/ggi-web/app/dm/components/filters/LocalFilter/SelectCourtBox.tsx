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
      [prop]: value === '전체' ? '' : value
    }
    setFilters(newFilters)
  }
  return (
    <>
      <Selectbox 
        options={court1s}
        width="186px" 
        setOption={handleSelectedValue('code1')}
        court={court}
      />
      <Selectbox 
        options={court2s} 
        width="186px" 
        setOption={handleSelectedValue('code2')}
        court={court}
      /> 
      <Selectbox 
        options={court3s} 
        marginRight={'0'} 
        width="186px" 
        setOption={handleSelectedValue('code3')}
        court={court}
      />
    </>
  )
}