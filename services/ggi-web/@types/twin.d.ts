import 'twin.macro'
import { css as cssImport } from '@emotion/react'
import styledImport from '@emotion/styled'
import { CSSInterpolation } from '@emotion/serialize'

// `twin.macro`에 다음 타입을 넣음
declare module 'twin.macro' {
  const styled: typeof styledImport
  const css: typeof cssImport
}

// DOM의 attribute에 다음 타입을 넣음
declare module 'react' {
  interface DOMAttributes<T> {
    tw?: string
    css?: CSSInterpolation
  }
}
