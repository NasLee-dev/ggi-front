import { Spinner } from '@chakra-ui/react'
import * as S from './style'

export default function DefaultLoading() {
  return (
    <S.BackDrop>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </S.BackDrop>
  )
}
