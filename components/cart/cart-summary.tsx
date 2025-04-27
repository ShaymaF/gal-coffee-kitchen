"use client"

import { useState } from "react"
import { useCart } from "@/components/cart/cart-provider"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Mail, User, Phone, FileText } from "lucide-react"
import { useRouter } from "next/navigation"
import { useConfirm } from "../ui/use-confirm"
import { useToast } from "@/hooks/use-toast"

interface CartSummaryProps {
  deliveryMethod: "delivery" | "pickup"
}

export function CartSummary({ deliveryMethod }: CartSummaryProps) {
  const { subtotal, cartItems, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [form, setForm] = useState({ fullName: "", email: "", address: "", phone: "", notes: "" })
  const router = useRouter()
  const { confirm, ConfirmationDialog } = useConfirm()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const deliveryFee = deliveryMethod === "delivery" ? 5.99 : 0
  const tax = subtotal * 0.0
  const total = subtotal + deliveryFee + tax

  if (cartItems.length === 0) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const confirmed = await confirm({
        title: "Confirm Order",
        description: "Are you sure you want to place this order? Once confirmed, it cannot be modified.",
        confirmText: "PLACE ORDER",
        cancelText: "REVIEW ORDER",
      })
      if (!confirmed) return 
      setIsSubmitting(true)
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          cartItems,
          deliveryMethod,
          total
        })
      })
      
      const order = await response.json();
      if (!response.ok) {
        throw new Error("Failed to place order")
      }


      toast({
        title: "Order Placed Successfully",
        description: "Your order has been placed successfully. Thank you!",
        duration: 5000,
      })
      clearCart()
      console.log("Order ID:", order)
      router.push(`/order/${order.id}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive", 
        duration: 5000,
      })   
     }finally {
      setIsSubmitting(false)
     }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border border-gal-beige/20 p-6 rounded-sm"
    >
      {!isCheckingOut ? (
        <>
          <h3 className="text-xl font-light text-gal-beige mb-6 font-serif">DELIVERY METHOD</h3>
          <div className="flex gap-4 mb-8">
            <button
              className={`fidalgo-button flex-1 ${
                deliveryMethod === "delivery" ? "bg-gal-beige text-gal-dark" : "text-gal-beige"
              }`}
            >
              DELIVERY
            </button>
            <button
              className={`fidalgo-button flex-1 ${
                deliveryMethod === "pickup" ? "bg-gal-beige text-gal-dark" : "text-gal-beige"
              }`}
            >
              PICKUP
            </button>
          </div>

          <h3 className="text-xl font-light text-gal-beige mb-6 font-serif">ORDER SUMMARY</h3>

          <div className="space-y-3 mb-6 font-sans">
            <div className="flex justify-between text-gal-beige/80">
              <span>Subtotal</span>
              <span>TND {subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gal-beige/80">
              <span>Tax</span>
              <span>TND {tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gal-beige/80">
              <span>{deliveryMethod === "delivery" ? "Delivery Fee" : "Pickup"}</span>
              <span>{deliveryMethod === "delivery" ? `TND ${deliveryFee.toFixed(2)}` : "Free"}</span>
            </div>

            <div className="border-t border-gal-beige/20 pt-3 flex justify-between text-gal-beige font-medium">
              <span>Total</span>
              <span>TND {total.toFixed(2)}</span>
            </div>
          </div>

          <button
            className="fidalgo-button w-full text-gal-beige hover:bg-gal-beige hover:text-gal-dark"
            onClick={() => setIsCheckingOut(true)}
          >
            PROCEED TO CHECKOUT
          </button>
        </>
      ) : (
        <>
          <h3 className="text-xl font-light text-gal-beige mb-6 font-serif">CHECKOUT</h3>
        
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gal-beige flex items-center gap-2">
                <User size={16} /> Full Name
              </Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                className="bg-transparent text-[#E7CFAB] placeholder:text-[#E7CFAB]/50 border-[#E7CFAB]/30 focus-visible:ring-[#E7CFAB]"
                required onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gal-beige flex items-center gap-2">
                <Mail size={16} /> Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="bg-transparent text-[#E7CFAB] placeholder:text-[#E7CFAB]/50 border-[#E7CFAB]/30 focus-visible:ring-[#E7CFAB]"
                required onChange={(e) => setForm({ ...form, email: e.target.value })} 
              />
            </div>

            {/* Address */}
            {deliveryMethod === "delivery" && (
              <div className="space-y-2">
                <Label htmlFor="address" className="text-gal-beige flex items-center gap-2">
                  <MapPin size={16} /> Address
                </Label>
                <Input
                  id="address"
                placeholder="Start typing your address"
                className="bg-transparent text-[#E7CFAB] placeholder:text-[#E7CFAB]/50 border-[#E7CFAB]/30 focus-visible:ring-[#E7CFAB]"
                required
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </div>
            )}

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gal-beige flex items-center gap-2">
                <Phone size={16} /> Phone Number
              </Label>
              <Input
                id="phone"
                placeholder="Enter your phone number"
                className="bg-transparent text-[#E7CFAB] placeholder:text-[#E7CFAB]/50 border-[#E7CFAB]/30 focus-visible:ring-[#E7CFAB]"
                required onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-gal-beige flex items-center gap-2">
                <FileText size={16} /> Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Any special requests or delivery instructions"
                className="bg-transparent text-[#E7CFAB] placeholder:text-[#E7CFAB]/50 border-[#E7CFAB]/30 focus-visible:ring-[#E7CFAB] min-h-[100px]"
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>

            <div className="pt-4 border-t border-gal-beige/20">
              <div className="flex justify-between text-gal-beige mb-4 font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button type="submit" className="fidalgo-button w-full bg-gal-beige text-gal-dark hover:bg-gal-beige/90"
                disabled={isSubmitting}>
                {isSubmitting ? "PROCESSING..." : "PLACE ORDER"}
              </button>
              <button
                type="button"
                className="mt-4 text-gal-beige/70 hover:text-gal-beige text-sm w-full text-center"
                onClick={() => setIsCheckingOut(false)}
              >
                Return to cart
              </button>
              <ConfirmationDialog />
               
            </div>
          </form>
        </>
      )}
    </motion.div>
  )
}
