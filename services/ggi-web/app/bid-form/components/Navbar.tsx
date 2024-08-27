import { biddingInfoState, stepState } from '@/store/atom/bid-form'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

export default function Navbar() {
  const [statusBar, setStatusBar] = useState<number>(0)
  const stepStateNum = useRecoilValue(stepState)
  const biddingForm = useRecoilValue(biddingInfoState)

  const progressBarMapping = {
    0: 0,
    1: 10,
    2: 10,
    3: 15,
    4: 15,
    5: 30,
    6: 30,
    7: 30,
    8: 50,
    9: 50,
    10: 50,
    11: 70,
    12: 70,
    13: 100,
    14: 100,
    16: 30,
    17: 30,
    19: 50,
  }

  const handleProgressBar = () => {
    const newStatus = Object.entries(progressBarMapping).find(([step]) => {
      const stepNum = parseInt(step)
      return (
        stepStateNum === stepNum ||
        (stepNum >= 5 && stepNum <= 7) ||
        (stepNum >= 16 && stepNum <= 17)
      )
    })

    setStatusBar(newStatus ? newStatus[1] : 0)
  }

  useEffect(() => {
    handleProgressBar()
  }, [stepStateNum])
  return (
    <header
      className={`flex justify-center items-center absolute w-[100%] h-[50px] left-[50%] top-0 bg-mybg mx-auto`}
      style={{
        transform: 'translateX(-50%)',
        zIndex: biddingForm.isModalOpen ? 0 : 10,
      }}
    >
      {stepStateNum === 0 ? null : (
        <div className="flex justify-start md:w-[550px] w-[80%] h-[2.5px] bg-gray-200 absolute top-[25px]">
          <div
            className={`flex w-[${statusBar}%] h-[100%] bg-myBlue ease-in z-10`}
          />
        </div>
      )}
    </header>
  )
}
