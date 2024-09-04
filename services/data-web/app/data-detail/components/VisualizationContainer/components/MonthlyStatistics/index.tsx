import DownloadBtn from '@/app/shared/components/buttons/DownloadBtn'
import TableContainer from '@/app/shared/components/table/TableContainer'
import TableHead from '@/app/shared/components/table/TableHead'
import TableItem from '@/app/shared/components/table/TableItem'
import PickText from '@/app/shared/components/text/PickText'
import SubTitle from '@/app/shared/components/text/SubTitle'
import useWindowSize from '@/app/shared/hooks/useWindowSize'

export default function MonthlyStatistics() {
  const size = useWindowSize()
  const isMobile = size.width < 1080

  return (
    <div>
      <div className="w-full flex justify-between items-center mb-8 ggi:flex-col ggi:items-start ggi:mb-5 ggi:px-4">
        <div>
          <SubTitle title="월별 통계" />
          <div className="mt-3 ggi:mt-2">
            <PickText
              text={
                <span>
                  서울특별시 용산구 청파동,{isMobile && <br />}2023.08.01 ~
                  2024.07.31 경매매각 건,{isMobile && <br />}아파트
                </span>
              }
            />
          </div>
        </div>
        <DownloadBtn
          onClick={() => {
            console.log('다운로드')
          }}
        />
      </div>
      <TableContainer>
        <ul className="flex border-b border-[#E5E7EB]">
          <TableHead width="108px" text="기준일자" />
          <TableHead width="190px" text="지역" />
          <TableHead width="160px" text="용도" />
          <TableHead width="88px" text="매각율" />
          <TableHead width="88px" text="매각가율" />
          <TableHead width="88px" text="미진행율" />
          <TableHead
            width="88px"
            text={
              <span>
                평균
                <br />
                응찰자 수
              </span>
            }
          />
          <TableHead width="88px" text="진행건수" />
          <TableHead width="88px" text="매각건수" />
          <TableHead width="88px" text="유찰건수" />
          <TableHead width="88px" text="변경건수" />
          <TableHead width="88px" text="취하건수" />
          <TableHead width="190px" text="감정가총액" />
          <TableHead width="200px" text="매각가총액" />
        </ul>
        <ul className="flex border-b border-[#E5E7EB] last:border-none group last:bg-[#F9FBFF]">
          <TableItem width="108px" text="2023.07" />
          <TableItem width="190px" text="서울특별시 서대문구" />
          <TableItem width="160px" text="아파트" />
          <TableItem width="88px" text="45.65" />
          <TableItem width="88px" text="65.45" />
          <TableItem width="88px" text="15.54" />
          <TableItem width="88px" text="5.3" />
          <TableItem width="88px" text="65" />
          <TableItem width="88px" text="35" />
          <TableItem width="88px" text="25" />
          <TableItem width="88px" text="2" />
          <TableItem width="88px" text="8" />
          <TableItem width="190px" text="12,110,000,000" />
          <TableItem width="200px" text="12,110,000,000" />
        </ul>
      </TableContainer>
    </div>
  )
}
