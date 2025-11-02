"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function BookingsPage() {
  const bookings = [
    {
      id: 1,
      property: "Modern Beach Villa",
      location: "Malibu, California",
      checkIn: "2025-06-15",
      checkOut: "2025-06-20",
      status: "confirmed",
      total: 1750,
    },
    {
      id: 2,
      property: "Mountain Cabin",
      location: "Aspen, Colorado",
      checkIn: "2025-07-10",
      checkOut: "2025-07-15",
      status: "pending",
      total: 1400,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">My Bookings</h1>

        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.id} className="border-border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{booking.property}</h3>
                      <p className="text-sm text-muted-foreground">{booking.location}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Check-in</p>
                      <p className="font-medium text-foreground">{new Date(booking.checkIn).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Check-out</p>
                      <p className="font-medium text-foreground">{new Date(booking.checkOut).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Total</p>
                      <p className="font-medium text-primary text-lg">${booking.total}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-border">
            <CardContent className="p-12 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">No bookings yet</h3>
              <p className="text-muted-foreground mb-6">Start exploring and book your first property today</p>
              <Link href="/properties">
                <Button className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                  Browse Properties
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
