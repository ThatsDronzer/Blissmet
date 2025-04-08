"use client";

import Image from "next/image"
import { useState } from "react"

interface ResponsiveImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  onClick?: () => void
}

export default function ResponsiveImage({ src, alt, width, height, className, onClick }: ResponsiveImageProps) {
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  return (
    <div className={`relative ${className}`} style={{ aspectRatio: `${width}/${height}` }}>
      {!error ? (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          layout="fill"
          objectFit="cover"
          className={`duration-700 ease-in-out ${
            isLoading ? "grayscale blur-2xl scale-110" : "grayscale-0 blur-0 scale-100"
          }`}
          onLoadingComplete={() => setLoading(false)}
          onError={() => setError(true)}
          onClick={onClick}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
          Failed to load image
        </div>
      )}
    </div>
  )
}

