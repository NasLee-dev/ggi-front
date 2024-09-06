interface CheckedProps {
  isClicked: boolean
}

export default function Checked({ isClicked }: CheckedProps) {
  return (
    <>
      {isClicked ? (
        <div
          className={`flex w-[25px] h-[25px] justify-center items-center rounded-full bg-[#dbeafe]`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M13.3346 4L6.0013 11.3333L2.66797 8"
              stroke="#1E40AF"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M13.3346 4L6.0013 11.3333L2.66797 8"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  )
}
