"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ReservationFormData {
  date: string
  time: string
  guests: string
  name: string
  phone: string
  email: string
  specialRequests: string
}

export function BookTableButton({ trigger }: { trigger?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const [formData, setFormData] = useState<ReservationFormData>({
    date: "",
    time: "",
    guests: "",
    name: "",
    phone: "",
    email: "",
    specialRequests: "",
  })

  const handleChange = (field: keyof ReservationFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const requiredFields: (keyof ReservationFormData)[] = ["date", "time", "guests", "name", "phone", "email"]
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast({
          title: "Missing information",
          description: `Please provide your ${field}.`,
          variant: "destructive",
        })
        return
      }
    }

    try {
      setIsSubmitting(true)

      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          guests: Number.parseInt(formData.guests),
        }),
      })

      const result = await response.json()
      console.log("response ID:",response);

      if (!response.ok) {
        throw new Error(result.error || "Failed to make reservation")
      }

      // Success
      toast({
        title: "Reservation Confirmed!",
        description: `Your reservation number is ${result.data.reservationNumber}. We'll see you on ${formData.date} at ${formData.time}.`,
      })

      // Reset form and close dialog
      setFormData({
        date: "",
        time: "",
        guests: "",
        name: "",
        phone: "",
        email: "",
        specialRequests: "",
      })
      setIsOpen(false)
      router.push(`/reservation/${result.data._id}`)
    } catch (error: any) {
      toast({
        title: "Reservation Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get today's date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split("T")[0]

  return (
    <>
      {trigger ? (
        React.cloneElement(trigger as React.ReactElement, { onClick: () => setIsOpen(true) })
      ) : (
        <div className="fixed bottom-8 right-8 z-40">
          <Button
            className="bg-gal-beige text-gal-dark hover:bg-gal-beige/90 px-6 shadow-lg"
            onClick={() => setIsOpen(true)}
          >
            BOOK A TABLE
          </Button>
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-3xl border-gal-beige/20 bg-gal-dark">
          <DialogHeader>
            <DialogTitle className="text-2xl font-light text-gal-beige text-center">Reserve Your Table</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-gal-beige">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  min={today}
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className="block bg-transparent text-[#E7CFAB] placeholder:text-[#E7CFAB]/50 border-[#E7CFAB]/30 focus-visible:ring-[#E7CFAB]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time" className="text-gal-beige">
                  Time
                </Label>
                <Select value={formData.time} onValueChange={(value) => handleChange("time", value)}>
                  <SelectTrigger className="bg-transparent text-[#E7CFAB] placeholder:text-[#E7CFAB]/50 border-[#E7CFAB]/30 focus-visible:ring-[#E7CFAB]">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "11:00",
                      "11:30",
                      "12:00",
                      "12:30",
                      "13:00",
                      "13:30",
                      "18:00",
                      "18:30",
                      "19:00",
                      "19:30",
                      "20:00",
                      "20:30",
                    ].map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="guests" className="text-gal-beige">
                Number of Guests
              </Label>
              <Select value={formData.guests} onValueChange={(value) => handleChange("guests", value)}>
                <SelectTrigger className="bg-transparent text-[#E7CFAB] placeholder:text-[#E7CFAB]/50 border-[#E7CFAB]/30 focus-visible:ring-[#E7CFAB]">
                  <SelectValue placeholder="Select guests" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "person" : "people"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gal-beige">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="bg-transparent text-[#E7CFAB] placeholder:text-[#E7CFAB]/50 border-[#E7CFAB]/30 focus-visible:ring-[#E7CFAB]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gal-beige">
                Phone
              </Label>
              <Input
                id="phone"
                placeholder="Your phone number"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="bg-transparent text-[#E7CFAB] placeholder:text-[#E7CFAB]/50 border-[#E7CFAB]/30 focus-visible:ring-[#E7CFAB]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gal-beige">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email address"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="bg-transparent text-[#E7CFAB] placeholder:text-[#E7CFAB]/50 border-[#E7CFAB]/30 focus-visible:ring-[#E7CFAB]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="special-requests" className="text-gal-beige">
                Special Requests
              </Label>
              <Textarea
                id="special-requests"
                placeholder="Any special requests or notes"
                value={formData.specialRequests}
                onChange={(e) => handleChange("specialRequests", e.target.value)}
                className="bg-transparent text-[#E7CFAB] placeholder:text-[#E7CFAB]/50 border-[#E7CFAB]/30 focus-visible:ring-[#E7CFAB] min-h-[80px]"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gal-beige text-gal-dark hover:bg-gal-beige/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  PROCESSING...
                </>
              ) : (
                "CONFIRM RESERVATION"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
