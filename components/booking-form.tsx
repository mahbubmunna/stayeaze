"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import BookingModal from "@/components/booking-modal"

interface Property {
  id: number
  price: number
  title: string
}

export default function BookingForm({ property }: { property: Property }) {
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("1")
  const [showModal, setShowModal] = useState(false)

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  }

  const nights = calculateNights()
  const totalPrice = nights * property.price
  const serviceFee = Math.round(totalPrice * 0.1)

  const handleBooking = () => {
    setShowModal(true)
  }

  return (
    <>
      <Card className="border-border sticky top-20">
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="text-3xl font-bold text-primary mb-1">
              ${property.price}
              <span className="text-lg font-normal text-muted-foreground ml-2">/ night</span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
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
          </div>

          {/* Price Breakdown */}
          {nights > 0 && (
            <div className="mb-6 pb-6 border-b border-border space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  ${property.price} × {nights} nights
                </span>
                <span className="text-foreground font-medium">${totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Service fee</span>
                <span className="text-foreground font-medium">${serviceFee}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2">
                <span className="text-foreground">Total</span>
                <span className="text-primary">${totalPrice + serviceFee}</span>
              </div>
            </div>
          )}

          {/* Book Now Button */}
          <Button
            onClick={handleBooking}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground text-lg py-6"
            disabled={!checkIn || !checkOut}
          >
            Book Now
          </Button>
          <p className="text-center text-xs text-muted-foreground mt-4">You won't be charged yet</p>
        </CardContent>
      </Card>

      {showModal && (
        <BookingModal
          property={property}
          checkIn={checkIn}
          checkOut={checkOut}
          guests={guests}
          totalPrice={totalPrice + serviceFee}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
