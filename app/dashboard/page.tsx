"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentUser, logout } from "@/lib/auth"

interface Booking {
  id: number
  property: string
  location: string
  checkIn: string
  checkOut: string
  status: "confirmed" | "pending"
  total: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState(getCurrentUser())
  const [isLoading, setIsLoading] = useState(true)
  const [bookings] = useState<Booking[]>([
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
  ])

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/login")
    } else {
      setUser(currentUser)
    }
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welcome back, {user.name}</h1>
              <p className="text-muted-foreground mt-1">{user.email}</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{bookings.length}</div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Confirmed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {bookings.filter((b) => b.status === "confirmed").length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">${bookings.reduce((sum, b) => sum + b.total, 0)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Your Bookings */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">Your Bookings</h2>
            <Link href="/properties">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground">
                Browse Properties
              </Button>
            </Link>
          </div>

          {bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id} className="border-border hover:shadow-md transition">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{booking.property}</h3>
                        <p className="text-sm text-muted-foreground">{booking.location}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
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
                <p className="text-muted-foreground">Start exploring and book your first property today</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Account Settings */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Account Settings</h2>
          <Card className="border-border max-w-2xl">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>View your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <p className="text-foreground font-medium">{user.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-foreground font-medium">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                <p className="text-foreground font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
