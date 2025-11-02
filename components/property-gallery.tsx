"use client"

import { useState } from "react"

interface PropertyGalleryProps {
  images: string[]
  title: string
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative w-full h-96 bg-muted rounded-lg overflow-hidden">
        <img
          src={images[selectedIndex] || "/placeholder.svg"}
          alt={`${title} - Image ${selectedIndex + 1}`}
          className="w-full h-full object-cover"
        />
        {/* Navigation Arrows */}
        <button
          onClick={() => setSelectedIndex((prev) => (prev - 1 + images.length) % images.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition"
          aria-label="Previous image"
        >
          ←
        </button>
        <button
          onClick={() => setSelectedIndex((prev) => (prev + 1) % images.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition"
          aria-label="Next image"
        >
          →
        </button>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-4">
        {images.slice(0, 4).map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`relative h-24 rounded-lg overflow-hidden border-2 transition ${
              selectedIndex === index ? "border-primary" : "border-transparent hover:border-border"
            }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
