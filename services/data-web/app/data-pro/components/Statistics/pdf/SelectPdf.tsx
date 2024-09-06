import { useState } from 'react'
import Checked from './Checked'

export default function SelectPdf() {
  const [checkedItem, setCheckedItem] = useState({
    all: false,
    sold: false,
    real: false,
    annualChart: false,
    annualRealChart: false,
    annualSoldTable: false,
    map: false,
  })
  return (
    <div className="flex flex-col w-full h-full gap-5">
      <div
        className={`flex justify-between w-[510px] h-[55px] pl-5 pr-5 pt-[15px] pb-[15px] rounded-[10px] border border-[#1E40AF] bg-[#F3F8FF] cursor-pointer`}
        onClick={() => {
          setCheckedItem({
            all: !checkedItem.all,
            sold: !checkedItem.all,
            real: !checkedItem.all,
            annualChart: !checkedItem.all,
            annualRealChart: !checkedItem.all,
            annualSoldTable: !checkedItem.all,
            map: !checkedItem.all,
          })
        }}
      >
        <p className="text-gray-800 text-base font-bold font-['NanumGothic'] leading-snug">
          항목 전체 인쇄
        </p>
        <Checked isClicked={checkedItem.all} />
      </div>
      <div className="flex flex-row gap-5 w-full h-[55px]">
        <div
          className={`flex justify-between w-[245px] h-[55px] pl-5 pr-5 pt-[15px] pb-[15px] rounded-[10px] border border-[#1E40AF] bg-[#F3F8FF] cursor-pointer`}
          onClick={() => {
            setCheckedItem((prev) => ({
              ...prev,
              sold: !prev.sold,
            }))
          }}
        >
          <p className="text-gray-800 text-base font-bold font-['NanumGothic'] leading-snug">
            간단 매각통계
          </p>
          <Checked isClicked={checkedItem.sold} />
        </div>
        <div
          className={`flex justify-between w-[245px] h-[55px] pl-5 pr-5 pt-[15px] pb-[15px] rounded-[10px] border border-[#1E40AF] bg-[#F3F8FF] cursor-pointer`}
          onClick={() => {
            setCheckedItem((prev) => ({
              ...prev,
              real: !prev.real,
            }))
          }}
        >
          <p className="text-gray-800 text-base font-bold font-['NanumGothic'] leading-snug">
            실거래통계
          </p>
          <Checked isClicked={checkedItem.real} />
        </div>
      </div>
      <div className="flex flex-row gap-5 w-full h-[55px]">
        <div
          className={`flex justify-between w-[245px] h-[55px] pl-5 pr-5 pt-[15px] pb-[15px] rounded-[10px] border border-[#1E40AF] bg-[#F3F8FF] cursor-pointer`}
          onClick={() => {
            setCheckedItem((prev) => ({
              ...prev,
              annualChart: !prev.annualChart,
            }))
          }}
        >
          <p className="text-gray-800 text-base font-bold font-['NanumGothic'] leading-snug">
            연간 매각통계 차트
          </p>
          <Checked isClicked={checkedItem.annualChart} />
        </div>
        <div
          className={`flex justify-between w-[245px] h-[55px] pl-5 pr-5 pt-[15px] pb-[15px] rounded-[10px] border border-[#1E40AF] bg-[#F3F8FF] cursor-pointer`}
          onClick={() => {
            setCheckedItem((prev) => ({
              ...prev,
              annualRealChart: !prev.annualRealChart,
            }))
          }}
        >
          <p className="text-gray-800 text-base font-bold font-['NanumGothic'] leading-snug">
            연간 실거래통계 차트
          </p>
          <Checked isClicked={checkedItem.annualRealChart} />
        </div>
      </div>
      <div className="flex flex-row gap-5 w-full h-[55px]">
        <div
          className={`flex justify-between w-[245px] h-[55px] pl-5 pr-5 pt-[15px] pb-[15px] rounded-[10px] border border-[#1E40AF] bg-[#F3F8FF] cursor-pointer`}
          onClick={() => {
            setCheckedItem((prev) => ({
              ...prev,
              annualSoldTable: !prev.annualSoldTable,
            }))
          }}
        >
          <p className="text-gray-800 text-base font-bold font-['NanumGothic'] leading-snug">
            연간 매각통계 표
          </p>
          <Checked isClicked={checkedItem.annualSoldTable} />
        </div>
        <div
          className={`flex justify-between w-[245px] h-[55px] pl-5 pr-5 pt-[15px] pb-[15px] rounded-[10px] border border-[#1E40AF] bg-[#F3F8FF] cursor-pointer`}
          onClick={() => {
            setCheckedItem((prev) => ({
              ...prev,
              map: !prev.map,
            }))
          }}
        >
          <p className="text-gray-800 text-base font-bold font-['NanumGothic'] leading-snug">
            인근 경공매, 실거래 시세
          </p>
          <Checked isClicked={checkedItem.map} />
        </div>
      </div>
    </div>
  )
}
