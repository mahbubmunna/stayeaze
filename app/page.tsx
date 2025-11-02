"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import SearchBar from "@/components/search-bar"
import PropertyCard from "@/components/property-card"
import { properties } from "@/lib/property-data"

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-96 bg-gradient-to-r from-primary to-secondary overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center max-w-2xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-balance">Find Your Perfect Stay</h1>
            <p className="text-xl text-white/90 mb-8 text-balance">
              Discover unique properties and unforgettable experiences around the world
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="bg-white py-8 border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <SearchBar />
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Featured Properties</h2>
            <p className="text-muted-foreground text-lg">Explore our handpicked selection of amazing stays</p>
          </div>

          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.slice(0, 6).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-12 text-center">
            <Link href="/properties">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground"
              >
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Stayease</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We make property rental simple, secure, and enjoyable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Easy Search</h3>
              <p className="text-muted-foreground">Find properties by location, date, and preferences in seconds</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Best Prices</h3>
              <p className="text-muted-foreground">Competitive rates with transparent pricing, no hidden fees</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Safe & Secure</h3>
              <p className="text-muted-foreground">Your bookings are protected with our secure guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to List Your Property?</h2>
          <p className="text-muted-foreground text-lg mb-8">Join thousands of hosts earning with Stayease</p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground"
          >
            Become a Host
          </Button>
        </div>
      </section>
    </div>
  )
}
