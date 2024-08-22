import '@emotion/react'

const theme = {
  colors: {
    primary: '#2563EB',
    secondary: '#F8FAFC',
    text: '#1F2937',
    border: '#E5E7EB',
  },

  fonts: {
    title: '24px',
    subTitle: '20px',
    largeText: '18px',
    text: '16px',
    smallText: '14px',
    tinyText: '12px',
  },
}

export type ThemeType = typeof theme

export default theme
