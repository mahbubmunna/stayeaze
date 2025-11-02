// Mock backend storage for user-listed properties using localStorage
import { properties as initialProperties } from "./property-data"

export interface UserProperty {
  id: number
  title: string
  location: string
  price: number
  image: string
  description: string
  bedrooms: number
  bathrooms: number
  guests: number
  amenities: string[]
  gallery: string[]
  rating: number
  reviews: number
  userId: string
  createdAt: string
}

const STORAGE_KEY = "stayease_user_properties"

// Initialize with placeholder properties
function initializeProperties() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProperties))
    }
  }
}

export function getAllProperties(): UserProperty[] {
  if (typeof window === "undefined") return initialProperties
  initializeProperties()
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : initialProperties
}

export function addProperty(
  property: Omit<UserProperty, "id" | "createdAt" | "rating" | "reviews" | "gallery">,
): UserProperty {
  if (typeof window === "undefined") throw new Error("Cannot add property in server context")

  initializeProperties()
  const allProperties = getAllProperties()

  const newProperty: UserProperty = {
    ...property,
    id: Math.max(...allProperties.map((p) => p.id), 0) + 1,
    createdAt: new Date().toISOString(),
    rating: 5.0,
    reviews: 0,
    gallery: [property.image], // Use the main image as first gallery item
  }

  allProperties.push(newProperty)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allProperties))

  return newProperty
}

export function getUserProperties(userId: string): UserProperty[] {
  if (typeof window === "undefined") return []
  return getAllProperties().filter((p) => p.userId === userId)
}
