// src/components/Pagination.tsx
import * as S from './style'

interface PaginationProps {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}

export default function DefaultPagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const maxPagesToShow = 5
  const currentRangeStart =
    Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1
  const currentRangeEnd = Math.min(
    currentRangeStart + maxPagesToShow - 1,
    totalPages,
  )

  const pageNumbers = []
  for (let i = currentRangeStart; i <= currentRangeEnd; i++) {
    pageNumbers.push(i)
  }

  const handleNextPageGroup = () => {
    const nextGroupStart = currentRangeEnd + 1
    if (nextGroupStart <= totalPages) {
      onPageChange(nextGroupStart)
    }
  }

  const handlePreviousPageGroup = () => {
    const previousGroupStart = currentRangeStart - maxPagesToShow
    if (previousGroupStart >= 1) {
      onPageChange(previousGroupStart)
    }
  }

  return (
    <S.PaginationContainer>
      <S.MoveButton
        disabled={currentPage === 1}
        onClick={handlePreviousPageGroup}
      >
        <span className="move-img">«</span>
        <span>이전 페이지</span>
      </S.MoveButton>
      <S.ButtonContainer>
        {pageNumbers.map((number) => (
          <S.PageButton
            active={currentPage === number}
            key={number}
            onClick={() => onPageChange(number)}
          >
            {number}
          </S.PageButton>
        ))}
      </S.ButtonContainer>

      <S.MoveButton
        disabled={currentPage === totalPages}
        onClick={handleNextPageGroup}
      >
        <span>다음 페이지</span>
        <span className="move-img">»</span>
      </S.MoveButton>
    </S.PaginationContainer>
  )
}
