"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/auth"
import { addProperty } from "@/lib/property-storage"
import { CheckCircle, AlertCircle } from "lucide-react"

export default function ListPropertyPage() {
  const router = useRouter()
  const user = getCurrentUser()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    image: "",
    description: "",
    bedrooms: "1",
    bathrooms: "1",
    guests: "2",
    amenities: "",
  })

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Login Required</h1>
          <p className="text-muted-foreground mb-6">You need to be logged in to list a property.</p>
          <Link href="/login">
            <Button className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">Go to Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = "Price must be greater than 0"
    if (!formData.image.trim()) newErrors.image = "Image URL is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (Number(formData.bedrooms) < 1) newErrors.bedrooms = "At least 1 bedroom required"
    if (Number(formData.bathrooms) < 1) newErrors.bathrooms = "At least 1 bathroom required"
    if (Number(formData.guests) < 1) newErrors.guests = "Must accommodate at least 1 guest"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const amenitiesArray = formData.amenities
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0)

      addProperty({
        title: formData.title,
        location: formData.location,
        price: Number(formData.price),
        image: formData.image,
        description: formData.description,
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        guests: Number(formData.guests),
        amenities: amenitiesArray.length > 0 ? amenitiesArray : ["WiFi"],
        userId: user.id,
      })

      setShowSuccess(true)
      setFormData({
        title: "",
        location: "",
        price: "",
        image: "",
        description: "",
        bedrooms: "1",
        bathrooms: "1",
        guests: "2",
        amenities: "",
      })

      // Redirect to properties page after 2 seconds
      setTimeout(() => {
        router.push("/properties")
      }, 2000)
    } catch (error) {
      console.error("Error adding property:", error)
      setErrors({ submit: "Failed to list property. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">List Your Property</h1>
          <p className="text-muted-foreground">Share your property with thousands of guests worldwide</p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3 animate-in fade-in">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900">Success!</h3>
              <p className="text-sm text-green-800">Your property has been listed. Redirecting to properties page...</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 space-y-6">
          {/* Error Message */}
          {errors.submit && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{errors.submit}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                Property Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Luxurious Beachfront Villa"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.title ? "border-red-500" : "border-border"
                }`}
              />
              {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
            </div>

            {/* Location */}
            <div className="md:col-span-2">
              <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Miami, Florida"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.location ? "border-red-500" : "border-border"
                }`}
              />
              {errors.location && <p className="text-sm text-red-600 mt-1">{errors.location}</p>}
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-foreground mb-2">
                Price per Night ($) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="250"
                min="1"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.price ? "border-red-500" : "border-border"
                }`}
              />
              {errors.price && <p className="text-sm text-red-600 mt-1">{errors.price}</p>}
            </div>

            {/* Guests */}
            <div>
              <label htmlFor="guests" className="block text-sm font-medium text-foreground mb-2">
                Max Guests *
              </label>
              <input
                type="number"
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                min="1"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.guests ? "border-red-500" : "border-border"
                }`}
              />
              {errors.guests && <p className="text-sm text-red-600 mt-1">{errors.guests}</p>}
            </div>

            {/* Bedrooms */}
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium text-foreground mb-2">
                Bedrooms *
              </label>
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                min="1"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.bedrooms ? "border-red-500" : "border-border"
                }`}
              />
              {errors.bedrooms && <p className="text-sm text-red-600 mt-1">{errors.bedrooms}</p>}
            </div>

            {/* Bathrooms */}
            <div>
              <label htmlFor="bathrooms" className="block text-sm font-medium text-foreground mb-2">
                Bathrooms *
              </label>
              <input
                type="number"
                id="bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                min="1"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.bathrooms ? "border-red-500" : "border-border"
                }`}
              />
              {errors.bathrooms && <p className="text-sm text-red-600 mt-1">{errors.bathrooms}</p>}
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label htmlFor="image" className="block text-sm font-medium text-foreground mb-2">
                Image URL *
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.image ? "border-red-500" : "border-border"
                }`}
              />
              {errors.image && <p className="text-sm text-red-600 mt-1">{errors.image}</p>}
              {formData.image && (
                <img
                  src={formData.image || "/placeholder.svg"}
                  alt="Preview"
                  className="mt-3 h-32 object-cover rounded-lg"
                />
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your property in detail..."
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.description ? "border-red-500" : "border-border"
                }`}
              />
              {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
            </div>

            {/* Amenities */}
            <div className="md:col-span-2">
              <label htmlFor="amenities" className="block text-sm font-medium text-foreground mb-2">
                Amenities (comma-separated)
              </label>
              <input
                type="text"
                id="amenities"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                placeholder="e.g., WiFi, Pool, Hot Tub, Beach Access"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground mt-1">Separate each amenity with a comma</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground"
            >
              {isSubmitting ? "Listing Property..." : "List Property"}
            </Button>
            <Link href="/properties" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}
