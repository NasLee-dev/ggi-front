export default function SelectOptions() {
  return (
    <option className="w-[260px] h-[168px] pb-2 bg-white rounded-2xl shadow border border-gray-200 flex-col justify-start items-start inline-flex">
      <div className="flex flex-row items-center gap-[12px] self-stretch">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
          >
            <path
              d="M14.0026 4L6.66927 11.3333L3.33594 8"
              stroke="#3B82F6"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <p className="text-gray-500 text-base font-normal font-['NanumGothic'] leading-snug">
          선택안함
        </p>
      </div>
    </option>
  )
}
