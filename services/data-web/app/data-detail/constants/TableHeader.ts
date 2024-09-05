export const REGIONAL_AUCTION_TABLE_HEADER = [
  {
    title: '시도',
    key: 'province', // 시도 (광역시/도)
    width: 120,
  },
  {
    title: '시군구',
    key: 'city', // 시군구 (시/군/구)
    width: 120,
  },
  {
    title: '읍면동',
    key: 'district', // 읍면동 (세부 지역)
    width: 88,
  },
  {
    title: '용도',
    key: 'usage', // 용도 (건물 또는 토지의 용도)
    width: 160,
  },
  {
    title: '매각율',
    key: 'saleRate', // 매각율 (%로 표현)
    width: 88,
  },
  {
    title: '매각가율',
    key: 'salePriceRate', // 매각가율 (감정가 대비 매각가 비율)
    width: 88,
  },
  {
    title: '미진행율',
    key: 'nonProceedRate', // 미진행율 (%로 표현)
    width: 88,
  },
  {
    title: '평균 응찰자 수',
    key: 'avgBidCount', // 평균 응찰자 수 (건별 평균)
    width: 88,
  },
  {
    title: '진행건수',
    key: 'progressCount', // 진행된 건수
    width: 88,
  },
  {
    title: '매각건수',
    key: 'saleCount', // 매각된 건수
    width: 88,
  },
  {
    title: '유찰건수',
    key: 'unsuccessfulCount', // 유찰된 건수
    width: 88,
  },
  {
    title: '변경건수',
    key: 'modifiedCount', // 변경된 건수
    width: 88,
  },
  {
    title: '취하건수',
    key: 'withdrawnCount', // 취하된 건수
    width: 88,
  },
  {
    title: '감정가총액',
    key: 'appraisalTotal', // 감정가 총액
    width: 180,
  },
  {
    title: '매각가총액',
    key: 'saleTotal', // 매각가 총액
    width: 180,
  },
]
