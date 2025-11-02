"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import PropertyCard from "@/components/property-card"
import { getAllProperties, type Property } from "@/lib/property-utils"

export default function PropertiesPage() {
  const searchParams = useSearchParams()
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState("all")
  const [properties, setProperties] = useState<Property[]>([])

  useEffect(() => {
    const allProps = getAllProperties()
    setProperties(allProps)
  }, [])

  // Get search filters from URL
  const location = searchParams.get("location") || ""
  const guests = searchParams.get("guests") || ""

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let filtered = properties

    // Filter by location
    if (location) {
      filtered = filtered.filter(
        (p) =>
          p.location.toLowerCase().includes(location.toLowerCase()) ||
          p.title.toLowerCase().includes(location.toLowerCase()),
      )
    }

    // Filter by guests
    if (guests) {
      const guestCount = Number.parseInt(guests)
      filtered = filtered.filter((p) => p.guests >= guestCount)
    }

    // Filter by price range
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number)
      filtered = filtered.filter((p) => p.price >= min && (max ? p.price <= max : true))
    }

    // Sort
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating)
    }

    return filtered
  }, [properties, location, guests, sortBy, priceRange])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Available Properties</h1>
          <p className="text-muted-foreground">
            {filteredProperties.length} properties found
            {location && ` in ${location}`}
            {guests && ` for ${guests} guests`}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-border p-6 sticky top-20">
              <h2 className="font-semibold text-lg text-foreground mb-6">Filters</h2>

              {/* Sort By */}
              <div className="mb-6">
                <h3 className="font-medium text-foreground mb-3">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium text-foreground mb-3">Price Range</h3>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                >
                  <option value="all">All Prices</option>
                  <option value="0-100">Under $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="200-300">$200 - $300</option>
                  <option value="300-500">$300 - $500</option>
                  <option value="500-99999">$500+</option>
                </select>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => {
                  setSortBy("featured")
                  setPriceRange("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          </aside>

          {/* Properties Grid */}
          <main className="lg:col-span-3">
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-border p-12 text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">No properties found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search criteria</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
