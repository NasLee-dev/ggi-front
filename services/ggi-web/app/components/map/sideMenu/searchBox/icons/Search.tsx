import { Dispatch, SetStateAction } from 'react'

export default function Search({
  right,
  top,
  handleSearchButton,
  setOpenOverlay,
}: {
  right: string
  top: string
  handleSearchButton: () => void
  setOpenOverlay: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <div
      style={{
        position: 'absolute',
        right: `${right}px`,
        top: `${top}px`,
        cursor: 'pointer',
        zIndex: 100,
      }}
      onClick={() => {
        handleSearchButton()
        setOpenOverlay(false)
      }}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.6471 20.9855C17.2523 20.9855 20.9855 17.2523 20.9855 12.6471C20.9855 8.04185 17.2523 4.30859 12.6471 4.30859C8.04185 4.30859 4.30859 8.04185 4.30859 12.6471C4.30859 17.2523 8.04185 20.9855 12.6471 20.9855Z"
          stroke="#E9413E"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24.3083 24.3083L18.5391 18.5391"
          stroke="#E9413E"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
