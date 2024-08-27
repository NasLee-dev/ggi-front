export default function Pagination({
  totalCount,
  currentPage,
  pageUpClick,
  pageDownClick,
  countPerPage,
}: any) {
  return (
    <div className="flex justify-center items-center gap-2 mt-5">
      <button
        onClick={pageDownClick}
        className="w-[30px] h-[30px] rounded-full bg-[#e1e1e1] text-[#666666] text-[10px] font-NanumGothic not-italic font-extrabold"
        disabled={currentPage === 1}
      >
        {'<'}
      </button>
      <span className="text-[10px] font-NanumGothic not-italic font-extrabold text-[#666666]">
        {currentPage} / {Math.ceil(totalCount / countPerPage)}
      </span>
      <button
        onClick={pageUpClick}
        className="w-[30px] h-[30px] rounded-full bg-[#e1e1e1] text-[#666666] text-[10px] font-NanumGothic not-italic font-extrabold"
      >
        {'>'}
      </button>
    </div>
  )
}
