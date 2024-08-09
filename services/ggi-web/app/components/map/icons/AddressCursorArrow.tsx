import { jusoProps } from '@/models/Address'
import { Dispatch, SetStateAction } from 'react'

interface AddressCursorArrowProps {
  openCursor: boolean
  setOpenCursor: Dispatch<SetStateAction<boolean>>
  setRange: Dispatch<SetStateAction<number>>
  setJuso: Dispatch<SetStateAction<jusoProps>>
}

export default function AddressCursorArrow({
  openCursor,
  setOpenCursor,
  setRange,
  setJuso,
}: AddressCursorArrowProps) {
  const handleCursor = () => {
    if (!openCursor) {
      setOpenCursor(true)
      setJuso((prev) => {
        return {
          ...prev,
          bottomSido: '',
          bottomGungu: '',
          bottomDong: '',
        }
      })
      setRange(0)
    } else {
      setOpenCursor(false)
    }
  }
  return (
    <>
      {openCursor ? (
        <div onClick={handleCursor}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="8"
            viewBox="0 0 15 8"
            fill="none"
            style={{
              marginRight: '10px',
            }}
          >
            <path
              d="M14 7.25L7.57071 0.820712C7.53166 0.781659 7.46834 0.781659 7.42929 0.820711L1 7.25"
              stroke="#332EFC"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ) : (
        <div onClick={handleCursor}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="8"
            viewBox="0 0 15 8"
            fill="none"
            style={{
              marginRight: '10px',
            }}
          >
            <path
              d="M14 0.75L7.57071 7.17929C7.53166 7.21834 7.46834 7.21834 7.42929 7.17929L1 0.75"
              stroke="#7676A3"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </>
  )
}
