import { css, SerializedStyles } from '@emotion/react'

type Breakpoints = 'small' | 'smMedium' | 'medium' | 'large'

const breakpoints: Record<Breakpoints, string> = {
  small: '768px',
  smMedium: '1000px',
  medium: '1250px',
  large: '1500px',
}

const media: Record<
  Breakpoints,
  (styles: TemplateStringsArray, ...args: any[]) => SerializedStyles
> = (Object.keys(breakpoints) as Breakpoints[]).reduce(
  (acc, label) => {
    acc[label] = (styles, ...args) => css`
      @media (max-width: ${breakpoints[label]}) {
        ${css(styles, ...args)};
      }
    `
    return acc
  },
  {} as Record<
    Breakpoints,
    (styles: TemplateStringsArray, ...args: any[]) => SerializedStyles
  >,
)

export default media
