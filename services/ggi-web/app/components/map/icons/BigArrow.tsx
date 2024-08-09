interface Props {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function BigArrow({ isOpen, setIsOpen }: Props) {
  return (
    <>
      {isOpen ? (
        <div
          onClick={() => {
            setIsOpen((prev) => !prev)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
          >
            <g clipPath="url(#clip0_1128_1736)">
              <path
                d="M10.3509 1.03883C15.6588 1.03883 19.9617 5.34169 19.9617 10.6495C19.9617 15.9574 15.6588 20.2603 10.3509 20.2603C5.0431 20.2603 0.740234 15.9574 0.740234 10.6495C0.740234 5.34169 5.0431 1.03883 10.3509 1.03883Z"
                fill="white"
                stroke="#34343D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.7874 12.1289L10.3517 7.69319L5.91602 12.1289"
                stroke="#34343D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_1128_1736">
                <rect
                  width="20.7"
                  height="20.7"
                  fill="white"
                  transform="matrix(1 0 0 -1 0 21)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      ) : (
        <div
          onClick={() => {
            setIsOpen((prev) => !prev)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
          >
            <g clipPath="url(#clip0_1128_777)">
              <path
                d="M10.6491 19.9612C5.3412 19.9612 1.03834 15.6583 1.03834 10.3505C1.03834 5.04261 5.3412 0.739747 10.6491 0.739747C15.9569 0.739746 20.2598 5.04261 20.2598 10.3505C20.2598 15.6583 15.9569 19.9612 10.6491 19.9612Z"
                fill="white"
                stroke="#D21E1B"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.21256 8.87109L10.6483 13.3068L15.084 8.87109"
                stroke="#D21E1B"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_1128_777">
                <rect
                  width="20.7"
                  height="20.7"
                  fill="white"
                  transform="matrix(-1 8.74228e-08 8.74228e-08 1 21 0)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      )}
    </>
  )
}
