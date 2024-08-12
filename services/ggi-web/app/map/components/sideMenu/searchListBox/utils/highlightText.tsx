import styled from '@emotion/styled'
import { colors } from 'app/styles/colorPallette'

const highlightText = (text: string, highlight: string) => {
  if (!highlight) return text

  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  const parts = text.split(new RegExp(`(${escapedHighlight})`, 'gi'))
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <Highlight key={index}>{part}</Highlight>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  )
}

export default highlightText

const Highlight = styled.span`
  color: ${colors.winOrange};
  font-weight: bold;
`
