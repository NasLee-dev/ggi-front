import Clustering from './Clustering'

type ItemProps = {
  sd: string
  sgg: string
  umd: string
  count?: number
  x: number
  y: number
}
interface ClusteringProps {
  item: ItemProps[]
}

export default function Clusterings({ item }: ClusteringProps) {
  return (
    <>
      {item && item.length > 0
        ? item?.map((item, index) => {
            return <Clustering key={index} item={item} />
          })
        : null}
    </>
  )
}
