import DownloadButtonBox from "./DownloadButtonBox";
import TableList from "./TableList";
import * as C from "constants/dm/dm";
import Pagination from "./Pagination";
import { useTabStore } from "@/store/dm/useTabStore";

const tempValues = [
  {
    download: 'Y',
    court: '북부4계',
    caseNum: '2024-4056',
    openingDate: '2024.07.29',
    usage: '아파트',
    sendTo: '소유자',
    address: '서울특별시 용산구 후암동 ***',
    postCode: '*****'
  }
]

const tempMyValues = [
  {
    type: '진행',
    filters: {
      date: '배당종기일 2024.01.01 ~ 2024.12.31',
      local: '서울중앙지방법원',
      specific: '특수조건 전체',
      price: '감정가 10억 이상',
      usage: '용도 아파트, 다세대'
    },
    download: '300개',
    reDownload: true,
    expired: '2024.08.04'
  }
]

export default function ContentBottom() {
  const { tabs } = useTabStore()
  return (
    <>
      <DownloadButtonBox />
      <TableList 
        headers={tabs.mine 
          ? C.myDmHeaders 
          : C.listHeaders(tabs.expected)}
        values={tabs.mine ? tempMyValues : tempValues}      
      />
      <Pagination />
    </>
  )
}