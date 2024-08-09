'use client'
import { css } from '@emotion/react'

export default function Info() {
  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="162"
        height="35"
        viewBox="0 0 162 35"
        fill="none"
      >
        <path
          d="M3.27453 28.4023L3.2888 28.3023L3.2296 28.2204C1.35493 25.6286 0.25 22.4437 0.25 19V16C0.25 7.30152 7.30152 0.25 16 0.25H146C154.698 0.25 161.75 7.30152 161.75 16V19C161.75 27.6985 154.698 34.75 146 34.75H16C12.8267 34.75 9.87339 33.8118 7.4012 32.1978L7.29083 32.1257L7.16902 32.1761L2.86317 33.956L2.95868 34.1871L2.86315 33.956C2.68426 34.03 2.4928 33.8813 2.52014 33.6897L3.27453 28.4023Z"
          fill="#1F1F1F"
          stroke="#F9F9F9"
          strokeWidth="0.5"
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: '8px',
          left: '10px',
        }}
      >
        <span css={TextStyle}>모든 필터가 초기화됩니다</span>
      </div>
    </div>
  )
}

const TextStyle = css`
  color: #fff;
  text-align: center;
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 135%;
  letter-spacing: -0.28px;
`
