'use client'

import DimmedComponent from './Dimmed'

interface CommonModalComponentProps {
  open?: boolean
  title: React.ReactNode
  description?: React.ReactNode
  buttonLabel?: string
  onButtonClick?: () => void
  width?: number
  height?: number
  children?: React.ReactNode
}

function CommonModalComponent({
  open = false,
  title,
  description,
  buttonLabel = '확인',
  onButtonClick,
  width = 0,
  height = 0,
  children,
}: CommonModalComponentProps) {
  if (!open) {
    return null
  }
  console.log(width)
  console.log(height)
  return (
    <DimmedComponent>
      <div
        className={`flex flex-col justify-center items-center p-[40px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg overflow-hidden z-alert z-50 w-[${width}px] h-[${height}px] first-line:box-border`}
      >
        <div className="absolute top-[10px] right-[10px]">
          <button
            className="text-gray-400 hover:text-gray-500"
            onClick={onButtonClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M12 4L4 12"
                stroke="#1F2937"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4 4L12 12"
                stroke="#1F2937"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col w-full h-full justify-center items-center gap-5">
          <p className="text-center text-gray-800 text-xl font-extrabold font-['SUIT'] leading-[27px]">
            {title}
          </p>
          <div className="mt-1">{description}</div>
          {children && (
            <div className="flex justify-center items-center w-full h-full">
              {children}
            </div>
          )}
          <div className="flex justify-center items-center w-full h-full">
            <button
              className="bg-blue-500 text-white rounded-lg px-4 py-2"
              onClick={onButtonClick}
            >
              {buttonLabel}
            </button>
          </div>
        </div>
      </div>
    </DimmedComponent>
  )
}

export default CommonModalComponent
