"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import PropertyGallery from "@/components/property-gallery"
import BookingForm from "@/components/booking-form"
import { getPropertyById, type Property } from "@/lib/property-utils"

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const id = Number.parseInt(params.id)
    const found = getPropertyById(id)
    setProperty(found || null)
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-foreground">Loading property...</div>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Property not found</h1>
          <Link href="/properties">
            <Button className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
              Back to Properties
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/properties" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          ← Back to Properties
        </Link>

        {/* Gallery */}
        <div className="mb-8">
          <PropertyGallery images={property.gallery} title={property.title} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-2">{property.title}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg text-foreground">{property.rating}</span>
                  <span className="text-muted-foreground">({property.reviews} reviews)</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{property.location}</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-border mb-8">
              <div className="flex gap-8">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`pb-4 font-medium transition ${
                    activeTab === "overview"
                      ? "border-b-2 border-primary text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("amenities")}
                  className={`pb-4 font-medium transition ${
                    activeTab === "amenities"
                      ? "border-b-2 border-primary text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Amenities
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">About this property</h2>
                  <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <Card className="border-border">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">{property.bedrooms}</div>
                        <div className="text-sm text-muted-foreground">Bedrooms</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-border">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">{property.bathrooms}</div>
                        <div className="text-sm text-muted-foreground">Bathrooms</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-border">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">{property.guests}</div>
                        <div className="text-sm text-muted-foreground">Max Guests</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "amenities" && (
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-6">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-3 p-4 bg-white rounded-lg border border-border">
                      <span className="text-lg">✓</span>
                      <span className="text-foreground">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Booking Form */}
          <aside className="lg:col-span-1">
            <div className="sticky top-20">
              <BookingForm property={property} />
            </div>
          </aside>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 pt-8 border-t border-border">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Guest Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border-border">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="font-semibold text-foreground">Guest {i}</div>
                      <div className="text-sm text-muted-foreground">Verified stay</div>
                    </div>
                    <div className="text-lg font-semibold text-foreground">4.{8 + i}</div>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Amazing property with great amenities and excellent hospitality. Highly recommend for your next
                    vacation!
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
