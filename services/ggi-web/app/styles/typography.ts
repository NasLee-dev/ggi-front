import { css } from '@emotion/react'

export const typographyMap = {
  t1: css`
    font-family: 'SUIT';
    font-size: 30px;
    line-height: 21.6px;
    letter-spacing: -0.14px;
  `,
  t2: css`
    font-family: 'SUIT';
    font-size: 24px;
    line-height: 32.4px;
    letter-spacing: -0.24px;
  `,
  t3: css`
    font-family: 'SUIT';
    font-size: 20px;
    line-height: 21.6px;
  `,
  t4: css`
    font-family: 'SUIT';
    font-size: 16px;
    line-height: 21.6px;
    letter-spacing: -0.16px;
  `,
  t5: css`
    font-family: 'SUIT';
    font-size: 15px;
    line-height: 20.25px;
    letter-spacing: -0.15px;
  `,
  t6: css`
    font-family: 'SUIT';
    font-size: 14px;
    line-height: 18.9px;
    letter-spacing: -0.14px;
  `,
  t7: css`
    font-family: 'SUIT';
    font-size: 13px;
    line-height: 21.6px;
  `,
}

export type Typography = keyof typeof typographyMap
