import { properties as staticProperties } from "./property-data"

export interface Property {
  id: number
  title: string
  location: string
  price: number
  image: string
  description: string
  rating: number
  reviews: number
  guests: number
  bedrooms: number
  bathrooms: number
  amenities: string[]
  gallery: string[]
}

export function getAllProperties(): Property[] {
  // Get stored properties from localStorage
  let storedProperties: Property[] = []

  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("stayease_properties")
    if (stored) {
      try {
        storedProperties = JSON.parse(stored)
      } catch (e) {
        console.error("[v0] Error parsing stored properties:", e)
      }
    }
  }

  // Combine static and stored properties, removing duplicates by ID
  const allProperties = [...staticProperties, ...storedProperties]
  const uniqueMap = new Map<number, Property>()

  allProperties.forEach((prop) => {
    if (!uniqueMap.has(prop.id)) {
      uniqueMap.set(prop.id, prop)
    }
  })

  return Array.from(uniqueMap.values())
}

export function getPropertyById(id: number): Property | undefined {
  return getAllProperties().find((p) => p.id === id)
}
