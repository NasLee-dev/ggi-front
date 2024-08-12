import { Global, css } from '@emotion/react'

const style = css`
  @font-face {
    font-family: 'NanumGothic';
    src: url('/fonts/NanumGothicLight.ttf') format('truetype');
    font-weight: 300;
  }
  @font-face {
    font-family: 'NanumGothic';
    src: url('/fonts/NanumGothic.ttf') format('truetype');
    font-weight: 400;
  }
  @font-face {
    font-family: 'NanumGothic';
    src: url('/fonts/NanumGothicBold.ttf') format('truetype');
    font-weight: 600;
  }
  @font-face {
    font-family: 'NanumGothic';
    src: url('/fonts/NanumGothicExtraBold.ttf') format('truetype');
    font-weight: 700;
  }

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  button {
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    background: transparent;
    color: inherit;
    font: inherit;
    line-height: normal;
    cursor: pointer;
  }
  a {
    color: inherit;
    text-decoration: inherit;
  }

  * {
    box-sizing: border-box;
  }
`

const GlobalStyle = () => <Global styles={style} />

export default GlobalStyle
