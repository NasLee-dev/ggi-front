import { Bar, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from 'recharts'
import Background from './Background'

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
    <Background title="실거래추이(당기)" isRow={false}>
      <ComposedChart width={1600} height={500} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="pv" barSize={80} fill="rgba(124, 37, 235, 0.50)" />
        <Bar dataKey="uv" barSize={80} fill="rgba(203, 213, 225, 0.50)" />
      </ComposedChart>
    </Background>
  )
}
