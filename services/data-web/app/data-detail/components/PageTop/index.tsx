import ProfileBox from '@/app/shared/components/box/ProfileBox'
import Title from '@/app/shared/components/text/Title'

export default function PageTop() {
  return (
    <div className="flex justify-between items-center mb-10">
      <Title title="경매상세통계" />
      <ProfileBox userName="조정택" date="2024.04.30 ~ 2024.05.29" />
    </div>
  )
}
