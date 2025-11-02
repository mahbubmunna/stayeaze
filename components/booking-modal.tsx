"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface BookingModalProps {
  property: { id: number; title: string; price: number }
  checkIn: string
  checkOut: string
  guests: string
  totalPrice: number
  onClose: () => void
}

export default function BookingModal({ property, checkIn, checkOut, guests, totalPrice, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  })
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleConfirm = () => {
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      setBookingConfirmed(true)
      setTimeout(() => {
        onClose()
      }, 2000)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md border-border">
        <CardContent className="p-8">
          {/* Success Message */}
          {bookingConfirmed ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✓</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
              <p className="text-muted-foreground mb-6">Confirmation details have been sent to your email.</p>
              <p className="text-sm text-muted-foreground">
                Confirmation #: BK{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {step === 1 ? "Guest Details" : "Payment Information"}
              </h2>
              <div className="flex gap-2 mb-6">
                <div className={`flex-1 h-1 rounded ${step >= 1 ? "bg-primary" : "bg-muted"}`} />
                <div className={`flex-1 h-1 rounded ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
              </div>

              {/* Booking Summary */}
              <div className="bg-background p-4 rounded-lg mb-6">
                <p className="text-sm font-medium text-foreground mb-2">{property.title}</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Check-in: {new Date(checkIn).toLocaleDateString()}</p>
                  <p>Check-out: {new Date(checkOut).toLocaleDateString()}</p>
                  <p>Guests: {guests}</p>
                </div>
              </div>

              {/* Step 1: Guest Details */}
              {step === 1 && (
                <div className="space-y-3 mb-6">
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div className="space-y-3 mb-6">
                  <Input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    maxLength={19}
                    required
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={handleChange}
                      maxLength={5}
                      required
                    />
                    <Input
                      type="text"
                      name="cvc"
                      placeholder="CVC"
                      value={formData.cvc}
                      onChange={handleChange}
                      maxLength={3}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Price Summary */}
              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between font-semibold text-lg">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">${totalPrice}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirm}
                  disabled={
                    step === 1
                      ? !formData.firstName || !formData.lastName || !formData.email
                      : !formData.cardNumber || !formData.expiry || !formData.cvc
                  }
                  className="flex-1 bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                >
                  {step === 1 ? "Continue" : "Confirm Booking"}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
