import { useRecoilValue } from 'recoil'
import Spinner from '../icons/Spinner'
import { biddingInfoState, stepState } from '@/store/atom/bid-form'
import Start from './Start'
import { useEffect, useCallback } from 'react'
import Search from './Search'
import Info from './Info'
import TimeInfo from './Time'
import BidderInfo from './Bidder'
import AgentForm from './Agent'

export default function Steps({ loading }: { loading: boolean }) {
  const biddingForm = useRecoilValue(biddingInfoState)
  const stateNum = useRecoilValue(stepState)

  const handleHeight = useCallback(() => {
    const height = window.innerHeight
    const boxElement = document.getElementById('box')
    if (boxElement) {
      boxElement.style.height = height + 'px'
    }
  }, [])

  useEffect(() => {
    handleHeight()
    window.addEventListener('resize', handleHeight)
    return () => {
      window.removeEventListener('resize', handleHeight)
    }
  }, [handleHeight])
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center bg-mybg w-[100%] h-screen">
          <div className="flex flex-col justify-center items-center bg-mybg w-[50%] h-[100%]">
            <Spinner />
          </div>
        </div>
      )
    } else if (biddingForm.state === 9 || stateNum === 0) {
      return <Start />
    } else if (biddingForm.state === 0 && stateNum === 4) {
      return <BidderInfo />
    } else {
      switch (stateNum) {
        case 0:
          return <Start />
        case 1:
          return <Search />
        case 2:
          return <Info />
        case 3:
          if (biddingForm.biddingInfos.length > 1) {
            return <TimeInfo />
          }
          break
        case 4:
          return <BidderInfo />
        case 5:
          return <AgentForm />
        default:
          return null
      }
    }
  }

  return (
    <div
      id="box"
      className={`w-full bg-mybg items-center justify-center`}
      style={{
        height: '100vh',
      }}
    >
      {renderContent()}
    </div>
  )
}
