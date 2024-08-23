import Flex from 'app/map/components/shared/Flex'
import ListRow from 'app/map/components/shared/ListRow'
import Skeleton from 'app/map/components/shared/Skeleton'
import Spacing from 'app/map/components/shared/Spacing'

function ListSkeleton() {
  return (
    <Flex
      direction="column"
      style={{
        display: 'flex',
        position: 'relative',
        borderBottom: '1px solid #e0e0e0',
        background: '#fff',
        gap: '10px',
        padding: '10px',
        width: 'calc(100% - 20px)',
        height: '208px',
        flexShrink: 0,
      }}
    >
      <ListRow
        left={<Skeleton width={80} height={20} />}
        contents={<Skeleton width={80} height={20} />}
        right={<Skeleton width={20} height={20} />}
      />
      <Flex
        direction="row"
        style={{
          position: 'absolute',
          top: 45,
          left: 10,
        }}
      >
        <Skeleton width={150} height={150} />
        <Flex
          direction="column"
          style={{
            gap: '5px',
            marginLeft: '10px',
          }}
        >
          <Skeleton width={40} height={20} />
          <Skeleton width={120} height={20} />
          <Flex direction="row">
            <Skeleton width={40} height={20} />
            <Spacing direction="horizontal" size={5} />
            <Skeleton width={60} height={20} />
          </Flex>
          <Flex direction="row">
            <Skeleton width={40} height={20} />
            <Spacing direction="horizontal" size={5} />
            <Skeleton width={60} height={20} />
          </Flex>
          <Flex direction="row">
            <Skeleton width={40} height={20} />
            <Spacing direction="horizontal" size={5} />
            <Skeleton width={40} height={20} />
            <Spacing direction="horizontal" size={5} />
            <Skeleton width={40} height={20} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ListSkeleton
