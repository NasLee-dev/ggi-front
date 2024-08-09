import { CSSProperties } from 'react'

import styled from '@emotion/styled'
import { Typography, typographyMap } from 'app/styles/typography'
import { colors, Colors } from 'app/styles/colorPallette'

interface TextProps {
  typography?: Typography
  color?: Colors
  display?: CSSProperties['display']
  textAlign?: CSSProperties['textAlign']
  fontWeight?: CSSProperties['fontWeight']
  bold?: boolean
}

const Text = styled.span<TextProps>(
  ({ color = 'black', display, textAlign, fontWeight, bold }) => ({
    color: colors[color],
    display,
    textAlign,
    fontWeight: bold ? 'bold' : fontWeight,
  }),
  ({ typography = 't5' }) => typographyMap[typography],
)

export default Text
