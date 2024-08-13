import {
  BackDrop,
  CenterSpinner,
  Spinner,
} from 'app/deunggi/components/commons/loading/style'

export default function BackLoading() {
  return (
    <BackDrop>
      <CenterSpinner />
    </BackDrop>
  )
}
