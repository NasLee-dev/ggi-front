import * as B from 'app/dm/components/styles/Boxes'
import DMInfo from './DMInfo'
import ProfileBox from './ProfileBox'
import TabBox from './TabBox'

export default function ContentTop() {
  return (
    <B.FlexColumn>
      <B.FlexSpaceBetween>
        <DMInfo />
        <ProfileBox />
      </B.FlexSpaceBetween>
      <TabBox />
    </B.FlexColumn>
  )
}