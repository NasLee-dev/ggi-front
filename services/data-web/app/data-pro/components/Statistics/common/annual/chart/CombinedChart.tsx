import { Bar, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from 'recharts'

export default function CombinedChartComponent() {
  const data = [
    {
      name: '2019년',
      uv: 4000,
      pv: 2400,
    },
    {
      name: '2020년',
      uv: 3000,
      pv: 1398,
    },
    {
      name: '2021년',
      uv: 2000,
      pv: 9800,
    },
    {
      name: '2022년',
      uv: 2780,
      pv: 3908,
    },
    {
      name: '2023년',
      uv: 2780,
      pv: 3908,
    },
  ]

  return (
    <div className="flex flex-col gap-5 w-full bg-[#F8FAFC] rounded-[24px] justify-center items-end">
      <div className="flex flex-col gap-5 justify-center items-center w-full">
        <div className="flex flex-1 w-full justify-between items-center pl-5 pr-5">
          <div className="w-[10%]">
            <img src={'/images/mark.png'} alt="mark" />
          </div>
          <p className="h-7 text-center text-gray-800 text-lg font-bold font-['SUIT'] leading-normal ">
            실거래추이(당기)
          </p>
          <p className="w-[10%]">&nbsp;&nbsp;</p>{' '}
          {/* 중간에 빈 공간을 배치하려면 필요 */}
        </div>
        <p className="text-gray-400 text-sm font-medium font-['SUIT'] leading-[18.90px] ">
          (출처 : 지지옥션)
        </p>
      </div>
      <ComposedChart width={1600} height={500} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="pv" barSize={80} fill="rgba(124, 37, 235, 0.50)" />
        <Bar dataKey="uv" barSize={80} fill="rgba(203, 213, 225, 0.50)" />
      </ComposedChart>
    </div>
  )
}
