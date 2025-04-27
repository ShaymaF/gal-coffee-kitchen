"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  Check,
  Truck,
  Package,
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  User,
  Loader2,
  Copy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface OrderDetailProps {
  order: any
}

export function OrderDetail({ order }: OrderDetailProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 text-gal-beige animate-spin" />
      </div>
    )
  }
 
  const getStatusStep = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing":
        return 0
      case "confirmed":
        return 1
      case "preparing":
        return 2
      case "ready":
        return 3
      case "delivered":
      case "completed":
        return 4
      default:
        return 0
    }
  }

  const currentStep = getStatusStep(order.status)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="mt-12">
      {/* Order Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6">
        <h2 className="text-2xl font-light text-gal-beige font-serif flex items-center gap-2">
          ORDER #{order.orderNumber}
          <button
            onClick={() => {
              navigator.clipboard.writeText(order.orderNumber)
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }}
            className="text-gal-beige/50 hover:text-gal-beige transition-colors"
            aria-label="Copy order number"
          >
            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          </button>
        </h2>

        <div className="flex flex-wrap gap-4 text-gal-beige/70 text-sm mt-4 md:mt-0 ">
          <div className="flex items-center gap-1">
            <Calendar size={14} /> <span>{order.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} /> <span>{order.time}</span>
          </div>
          <div className="flex items-center gap-1">
            {order.deliveryMethod === "delivery" ? <Truck size={14} /> : <Package size={14} />}
            <span>{order.deliveryMethod === "delivery" ? "Delivery" : "Pickup"}</span>
          </div>
        </div>
      </div>
      {/* Order Status Tracker */}
      {order.status !== "cancelled" && (
        <div className="mb-12">
          {/* <h3 className="text-xl font-light text-gal-beige mb-6 font-serif">ORDER STATUS</h3> */}
          <div className="relative">
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gal-beige/20"></div>
            <div
              className="absolute top-4 left-0 h-0.5 bg-gal-beige transition-all duration-500"
              style={{ width: `${currentStep * 25}%` }}
            ></div>
            <div className="flex justify-between">
              {["Order Received", "Confirmed", "Preparing", "Ready", "Completed"].map((step, index, array) => (
                <div key={index}          
                  className={`flex flex-col w-full text-center ${
                  index === 0 ? "items-start" : index === array.length - 1 ? "items-end" : "items-center"
                }`}>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                      index <= currentStep
                        ? "bg-gal-beige text-gal-dark"
                        : "bg-gal-dark border border-gal-beige/20 text-gal-beige/50"
                    }`}
                  >
                    {index <= currentStep ? <Check size={16} /> : index + 1}
                  </div>
                  <span
                    className={`text-xs mt-2 text-center ${
                      index <= currentStep ? "text-gal-beige" : "text-gal-beige/50"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Order Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-gal-beige/20">
        {/* Left Column - Order Items */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-light text-gal-beige mb-6 font-serif">ORDER ITEMS</h3>
          <div className="space-y-6">
            {order.cartItems?.map((item: any, index: number) => (
              <div key={index} className="flex gap-4 pb-6 border-b border-gal-beige/10">
                <div className="w-20 h-20 relative rounded-sm overflow-hidden flex-shrink-0">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <h4 className="text-gal-beige font-medium font-serif">{item.name}</h4>
                    <span className="text-gal-beige">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-gal-beige/70 text-sm mt-1">{item.description || ''}</p>
                  <div className="flex justify-between items-end mt-2">
                    <span className="text-gal-beige/70 text-sm">Quantity: {item.quantity}</span>
                    <span className="text-gal-beige">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Customer Information - Expandable on Mobile */}
          <div className="mt-12 lg:hidden">
            <button
              className="flex items-center justify-between w-full text-left text-xl font-light text-gal-beige mb-6 font-serif"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <span>CUSTOMER INFORMATION</span>
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {isExpanded && (
              <div className="space-y-6 mb-8">
                <div className="border border-gal-beige/20 p-6 rounded-sm">
                  <h4 className="text-lg font-light text-gal-beige mb-4 font-serif">CUSTOMER DETAILS</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <User className="text-gal-beige/70 mt-1" size={16} />
                      <div>
                        <p className="text-gal-beige">{order.customer.name}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="text-gal-beige/70 mt-1" size={16} />
                      <div>
                        <p className="text-gal-beige">{order.customer.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="text-gal-beige/70 mt-1" size={16} />
                      <div>
                        <p className="text-gal-beige">{order.customer.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-gal-beige/20 p-6 rounded-sm">
                  <h4 className="text-lg font-light text-gal-beige mb-4 font-serif">
                    {order.type === "delivery" ? "DELIVERY DETAILS" : "PICKUP DETAILS"}
                  </h4>
                  <div className="space-y-3">
                    {order.type === "delivery" ? (
                      <div className="flex items-start gap-3">
                        <MapPin className="text-gal-beige/70 mt-1" size={16} />
                        <div>
                          <p className="text-gal-beige">{order.delivery.address}</p>
                          <p className="text-gal-beige/70 text-sm">{order.delivery.instructions}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <MapPin className="text-gal-beige/70 mt-1" size={16} />
                        <div>
                          <p className="text-gal-beige">71 Madison Ave, New York, NY 10016</p>
                          <p className="text-gal-beige/70 text-sm">Ready for pickup at {order.pickup.time}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border border-gal-beige/20 p-6 rounded-sm">
                  <h4 className="text-lg font-light text-gal-beige mb-4 font-serif">PAYMENT DETAILS</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CreditCard className="text-gal-beige/70 mt-1" size={16} />
                      <div>
                        <p className="text-gal-beige">{order.payment.method}</p>
                        <p className="text-gal-beige/70 text-sm">{order.payment.cardInfo}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Special Instructions */}
          {order.specialInstructions && (
            <div className="mt-8">
              <Accordion type="single" collapsible className="border-gal-beige/20">
                <AccordionItem value="instructions" className="border-gal-beige/20">
                  <AccordionTrigger className="text-gal-beige hover:text-gal-beige/80 font-serif">
                    SPECIAL INSTRUCTIONS
                  </AccordionTrigger>
                  <AccordionContent className="text-gal-beige/80">{order.specialInstructions}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
        </div>

        {/* Right Column - Order Summary and Customer Info */}
        <div>
          {/* Order Summary */}
          <div className="border border-gal-beige/20 p-6 rounded-sm mb-6">
            <h3 className="text-xl font-light text-gal-beige mb-6 font-serif">ORDER SUMMARY</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gal-beige/80">
                <span>Subtotal</span>
                <span>${order.total?.toFixed(2)}</span>
              </div>

              {order.type === "delivery" && (
                <div className="flex justify-between text-gal-beige/80">
                  <span>Delivery Fee</span>
                  <span>${order.deliveryFee.toFixed(2)}</span>
                </div>
              )}
              {order.tip > 0 && (
                <div className="flex justify-between text-gal-beige/80">
                  <span>Tip</span>
                  <span>${order.tip.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-gal-beige/20 pt-3 flex justify-between text-gal-beige font-medium">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Customer Information - Desktop */}
          <div className="hidden lg:block space-y-6">
            <div className="border border-gal-beige/20 p-6 rounded-sm">
              <h3 className="text-xl font-light text-gal-beige mb-4 font-serif">CUSTOMER DETAILS</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="text-gal-beige/70 mt-1" size={16} />
                  <div>
                    <p className="text-gal-beige">{order.fullName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="text-gal-beige/70 mt-1" size={16} />
                  <div>
                    <p className="text-gal-beige">{order.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="text-gal-beige/70 mt-1" size={16} />
                  <div>
                    <p className="text-gal-beige">{order.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gal-beige/20 p-6 rounded-sm">
              <h3 className="text-xl font-light text-gal-beige mb-4 font-serif">
                {order.type === "delivery" ? "DELIVERY DETAILS" : "PICKUP DETAILS"}
              </h3>
              <div className="space-y-3">
                {order.type === "delivery" ? (
                  <div className="flex items-start gap-3">
                    <MapPin className="text-gal-beige/70 mt-1" size={16} />
                    <div>
                      <p className="text-gal-beige">{order.address}</p>
                      <p className="text-gal-beige/70 text-sm">{order.notes}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <MapPin className="text-gal-beige/70 mt-1" size={16} />
                    <div>
                      <p className="text-gal-beige">71 Madison Ave, New York, NY 10016</p>
                      <p className="text-gal-beige/70 text-sm">Ready for pickup soon</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="border border-gal-beige/20 p-6 rounded-sm">
              <h3 className="text-xl font-light text-gal-beige mb-4 font-serif">PAYMENT DETAILS</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CreditCard className="text-gal-beige/70 mt-1" size={16} />
                  <div>
                    <p className="text-gal-beige">Cash</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 space-y-3">
           
            <Link href="/menu" className="block">
              <Button className="w-full bg-gal-beige text-gal-dark hover:bg-gal-beige/90">
              <ShoppingBag className="mr-2 h-4 w-4" />
              CONTINUE SHOPPING
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
