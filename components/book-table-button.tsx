"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function BookTableButton({ trigger }: { trigger?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {trigger && React.cloneElement(trigger as React.ReactElement, { onClick: () => setIsOpen(true) })}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] border-gal-beige/20 bg-gal-dark">
          <DialogHeader>
            <DialogTitle className="text-2xl font-light text-gal-beige text-center">Reserve Your Table</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-gal-beige">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  className="border-gal-beige/20 focus-visible:ring-gal-beige bg-transparent text-gal-beige"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time" className="text-gal-beige">
                  Time
                </Label>
                <Select>
                  <SelectTrigger className="border-gal-beige/20 focus:ring-gal-beige bg-transparent text-gal-beige">
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
              <Select>
                <SelectTrigger className="border-gal-beige/20 focus:ring-gal-beige bg-transparent text-gal-beige">
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
                className="border-gal-beige/20 focus-visible:ring-gal-beige bg-transparent text-gal-beige"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gal-beige">
                Phone
              </Label>
              <Input
                id="phone"
                placeholder="Your phone number"
                className="border-gal-beige/20 focus-visible:ring-gal-beige bg-transparent text-gal-beige"
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
                className="border-gal-beige/20 focus-visible:ring-gal-beige bg-transparent text-gal-beige"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="special-requests" className="text-gal-beige">
                Special Requests
              </Label>
              <Textarea
                id="special-requests"
                placeholder="Any special requests or notes"
                className="border-gal-beige/20 focus-visible:ring-gal-beige bg-transparent text-gal-beige min-h-[80px]"
              />
            </div>
          </div>
          <Button className="w-full bg-gal-beige text-gal-dark hover:bg-gal-beige/90">CONFIRM RESERVATION</Button>
        </DialogContent>
      </Dialog>
      </>

  )
}
