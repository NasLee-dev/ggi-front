/* eslint-disable */
import Image, { ImageProps } from 'next/image'
import { useEffect, useState } from 'react'

interface NextImageWithFallbackProps extends ImageProps {
  src: string
  alt: string
  fallbackComponent: React.ReactNode
  handleDuplicatedOpen: (idCode: string, type: number) => void
  type: number
  idCode: string
}

export default function NextImageWithFallback({
  src,
  alt,
  fallbackComponent,
  handleDuplicatedOpen,
  type,
  idCode,
  ...rest
}: NextImageWithFallbackProps) {
  const [imgError, setImgError] = useState(false)
  const [, setImagSrc] = useState(src)
  useEffect(() => {
    setImagSrc(src)
  }, [src])

  if ((imgError && fallbackComponent) || !src) {
    return (
      <div
        onClick={() => {
          handleDuplicatedOpen(idCode, type)
        }}
      >
        {fallbackComponent}
      </div>
    )
  }
  if (src !== '') {
    return (
      <Image
        src={src ? src : ''}
        alt={alt}
        {...rest}
        onError={() => {
          setImgError(true)
          setImagSrc('')
        }}
        onClick={() => {
          handleDuplicatedOpen(idCode, type)
        }}
      />
    )
  }
}
