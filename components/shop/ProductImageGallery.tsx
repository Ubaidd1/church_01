"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

type ProductImageGalleryProps = {
  images: string[]
  title: string
}

export default function ProductImageGallery({ images, title }: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = images[activeIndex] ?? images[0]

  if (!activeImage) return null

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-faith-gray shadow-xl">
        <Image
          src={activeImage}
          alt={`${title} — image ${activeIndex + 1}`}
          fill
          priority
          unoptimized
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center"
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-2 gap-3">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View image ${index + 1}`}
              className={cn(
                "relative aspect-square overflow-hidden rounded-xl border-2 transition-all duration-300",
                index === activeIndex
                  ? "border-faith-gold ring-2 ring-faith-gold/30"
                  : "border-transparent opacity-80 hover:opacity-100"
              )}
            >
              <Image
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                unoptimized
                sizes="(max-width: 1024px) 45vw, 20vw"
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
