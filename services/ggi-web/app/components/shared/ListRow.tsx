'use client'
import { css, SerializedStyles } from '@emotion/react'
import Flex from './Flex'
import Skeleton from './Skeleton'
import Spacing from './Spacing'
import Text from './Text'
import AddressArrow from '../map/icons/AddressArrow'

interface ListRowProps {
  left?: React.ReactNode
  contents: React.ReactNode
  right?: React.ReactNode
  withArrow?: boolean
  onClick?: () => void
  as?: 'div' | 'li'
  style?: SerializedStyles
}

function ListRow({
  left,
  contents,
  right,
  withArrow,
  onClick,
  style,
  as = 'li',
}: ListRowProps) {
  return (
    <Flex
      as={as}
      css={[listRowContainerStyles, style]}
      onClick={onClick}
      align="center"
    >
      {left && <Flex css={listRowLeftStyles}>{left}</Flex>}
      <Flex css={listRowContentsStyles}>{contents}</Flex>
      {right && <Flex>{right}</Flex>}
      {withArrow ? <AddressArrow /> : null}
    </Flex>
  )
}

const listRowContainerStyles = css`
  justify-content: space-between;
  width: 89%;
  position: absolute;
`

const listRowLeftStyles = css`
  margin-right: 5px;
`

const listRowContentsStyles = css`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

function ListRowTexts({
  title,
  subtitle,
}: {
  title: React.ReactNode
  subtitle: React.ReactNode
}) {
  return (
    <Flex direction="column">
      <Text bold={true}>{title}</Text>
      <Text typography="t7">{subtitle}</Text>
    </Flex>
  )
}

ListRow.Texts = ListRowTexts

function ListRowSkeleton() {
  return (
    <Flex as="li" css={listRowContainerStyles} align="center">
      <Flex css={listRowLeftStyles}></Flex>
      <Flex css={listRowContentsStyles}>
        <ListRow.Texts
          title={
            <>
              <Skeleton width={67} height={23} />
              <Spacing size={2} />
            </>
          }
          subtitle={<Skeleton width={85} height={20} />}
        />
      </Flex>
      <IconArrowRight />
    </Flex>
  )
}

function SearchTextSkeleton({
  left,
  as,
  onClick,
  style,
  contents,
  right,
  withArrow,
}: {
  left?: React.ReactNode
  as?: 'div' | 'li'
  onClick?: () => void
  style?: SerializedStyles
  contents: React.ReactNode
  right?: React.ReactNode
  withArrow?: boolean
}) {
  return (
    <Flex
      as={as}
      css={[listRowContainerStyles, style]}
      onClick={onClick}
      align="center"
    >
      {<Skeleton width={200} height={32} />}
      {<Skeleton width={130} height={32} />}
      {<Skeleton width={130} height={32} />}
      {withArrow ? <IconArrowRight /> : null}
    </Flex>
  )
}

function IconArrowRight() {
  return (
    <svg
      id="Layer_1"
      version="1.1"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      widths={20}
      height={20}
    >
      <polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 " />
    </svg>
  )
}
ListRow.Texts = ListRowTexts
ListRow.Skeleton = ListRowSkeleton
ListRow.SearchTextSkeleton = SearchTextSkeleton

export default ListRow
