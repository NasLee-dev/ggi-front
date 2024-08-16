import { useRecoilValue } from 'recoil'
import Spinner from '../icons/Spinner'
import { biddingInfoState } from '@/store/atom/bid-form'
import Start from './Start'
import { useCallback, useEffect } from 'react'

export default function Steps({ loading }: { loading: boolean }) {
  const biddingForm = useRecoilValue(biddingInfoState)

  const handleHeight = () => {
    const height = window.innerHeight
    if (document && document.getElementById('box')) {
      const boxElement = document.getElementById('box')
      if (boxElement) {
        boxElement.style.height = height + 'px'
      }
    }
  }

  useEffect(() => {
    handleHeight()
    window.addEventListener('resize', handleHeight)
    return () => {
      window.removeEventListener('resize', handleHeight)
    }
  }, [])
  return (
    <div
      id="box"
      className="w-screen bg-mybg h-screen items-center justify-center"
    >
      {loading ? (
        <div className="flex justify-center items-center bg-mybg w-[100%] h-screen">
          <div className="flex flex-col justify-center items-center bg-mybg w-[50%] h-[100%]">
            <Spinner />
          </div>
        </div>
      ) : (
        <>
          {biddingForm.state === 9 || biddingForm.state === 0 ? (
            <Start />
          ) : null}
        </>
      )}
    </div>
  )
}
