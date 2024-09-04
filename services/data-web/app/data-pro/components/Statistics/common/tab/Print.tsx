import '../../../../styles/icon.css'

export default function Print() {
  return (
    <div className="print-container flex flex-row gap-2 w-[120px] px-3 py-2 border border-gray-100 justify-center items-center h-full self-stretch bg-white  rounded-full cursor-pointer">
      <p className="text-gray-500 text-base font-bold font-['SUIT'] leading-snug">
        전체인쇄
      </p>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
        >
          <path
            d="M5.5 8.00008V2.16675H15.5V8.00008"
            stroke="#6B7280"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon-path"
          />
          <path
            d="M5.49935 15.5H3.83268C3.39065 15.5 2.96673 15.3244 2.65417 15.0118C2.34161 14.6993 2.16602 14.2754 2.16602 13.8333V9.66667C2.16602 9.22464 2.34161 8.80072 2.65417 8.48816C2.96673 8.1756 3.39065 8 3.83268 8H17.166C17.608 8 18.032 8.1756 18.3445 8.48816C18.6571 8.80072 18.8327 9.22464 18.8327 9.66667V13.8333C18.8327 14.2754 18.6571 14.6993 18.3445 15.0118C18.032 15.3244 17.608 15.5 17.166 15.5H15.4993"
            className="icon-path"
            stroke="#6B7280"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.5 12.1667H5.5V18.8334H15.5V12.1667Z"
            className="icon-path"
            stroke="#6B7280"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
