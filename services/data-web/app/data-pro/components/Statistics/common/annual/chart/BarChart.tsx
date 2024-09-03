import { BarChart } from 'recharts/lib/chart/BarChart'
import { CartesianGrid } from 'recharts/lib/cartesian/CartesianGrid'
import { XAxis } from 'recharts/lib/cartesian/XAxis'
import { YAxis } from 'recharts/lib/cartesian/YAxis'
import { Tooltip } from 'recharts/lib/component/Tooltip'
import { Legend } from 'recharts/lib/component/Legend'
import { Bar } from 'recharts/lib/cartesian/Bar'

export default function BarChartComponent() {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
    },
  ]
  return (
    <div className="flex flex-row gap-5 w-[1620px]">
      <BarChart width={800} height={560} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
      <BarChart width={800} height={560} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </div>
  )
}
