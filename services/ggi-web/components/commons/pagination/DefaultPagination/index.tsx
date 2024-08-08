// src/components/Pagination.tsx
import * as S from './style'

interface PaginationProps {
  totalPages?: number
  currentPage?: number
  onPageChange: (page: number) => void
}

export default function DefaultPagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <S.PaginationContainer>
      <S.MoveButton
        disabled={currentPage === 1}
        onClick={() => currentPage && onPageChange(currentPage - 1)}
      >
        <span className="move-img">«</span>
        <span>이전 페이지</span>
      </S.MoveButton>
      <S.MoveButton
        disabled={currentPage === totalPages}
        onClick={() => currentPage && onPageChange(currentPage + 1)}
      >
        <span>다음 페이지</span>
        <span className="move-img">»</span>
      </S.MoveButton>
    </S.PaginationContainer>
  )
}
