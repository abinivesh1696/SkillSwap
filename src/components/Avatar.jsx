import React, { useState, useEffect } from 'react'
import { DEFAULT_AVATAR } from '../constants/avatarConstants'

export { DEFAULT_AVATAR }

export default function Avatar({ src, alt = 'avatar', className = '', width, height, ...props }) {
  const [imgSrc, setImgSrc] = useState(src || DEFAULT_AVATAR)

  useEffect(() => {
    setImgSrc(src || DEFAULT_AVATAR)
  }, [src])

  const handleError = () => {
    if (imgSrc !== DEFAULT_AVATAR) {
      setImgSrc(DEFAULT_AVATAR)
    }
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onError={handleError}
      {...props}
    />
  )
}
