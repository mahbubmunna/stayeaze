"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SearchBar() {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("1")

  const handleSearch = () => {
    const params = new URLSearchParams({
      location,
      checkIn,
      checkOut,
      guests,
    })
    router.push(`/properties?${params.toString()}`)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 border border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Location</label>
          <Input
            placeholder="Where to?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Check In */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Check In</label>
          <Input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full" />
        </div>

        {/* Check Out */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Check Out</label>
          <Input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full" />
        </div>

        {/* Guests */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Guests</label>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground"
        >
          Search
        </Button>
      </div>
    </div>
  )
}
