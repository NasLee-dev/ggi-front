import * as B from 'app/dm/components/styles/Boxes'
import ContentTop from '../ContentTop'
import ContentMiddle from '../ContentMiddle'
import ContentBottom from '../ContentBottom'
import { useTabStore } from '@/store/dm/useTabStore'

export default function DMSection() {
  const { tabs } = useTabStore()
  return (
    <B.Container>
      <ContentTop />
      {tabs.mine 
      ? null
      : <ContentMiddle />
      }
      <ContentBottom />
    </B.Container>
  )
}