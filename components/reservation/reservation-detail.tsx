"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Clock,
  Check,
  Mail,
  Loader2,
  Copy,
  Users,
  CalendarCheck,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface ReservationDetailProps {
  reservation: any
}

export function ReservationDetail({ reservation }: ReservationDetailProps) {
  const [loading, setLoading] = useState(true)

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
 
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="mt-12">
   <div className="max-w-2xl mx-auto mt-12 border border-gal-beige/20 p-8 rounded-sm">
   <div className="text-center mb-8">
  <p className="text-gal-beige/80 mb-2">Your reservation number is</p>
  <div className="flex items-center justify-center gap-2">
    <h2 className="text-3xl font-light text-gal-beige font-serif">{reservation.reservationNumber}</h2>
    <CopyButton text={reservation.reservationNumber} />
  </div>

  {/* Status badge */}
  <div className="text-center mt-4">
    <span
      className={`inline-block px-3 py-1 text-sm rounded-full font-medium 
        ${
          reservation.status === "confirmed"
            ? "bg-green-600 text-white"
            : reservation.status === "cancelled"
            ? "bg-red-500 text-white"
            : "bg-amber-500 text-white"
        }`}
    >
      {reservation.status === "confirmed"
        ? "Confirmée"
        : reservation.status === "cancelled"
        ? "Annulée"
        : "En attente de confirmation"}
    </span>
  </div>
</div>

 
               <div className="space-y-6 text-gal-beige">
                 <InfoRow icon={<CalendarCheck size={20} />} title="Date" value={reservation.date} />
                 <InfoRow icon={<Clock size={20} />} title="Time" value={reservation.time} />
                 <InfoRow icon={<Users size={20} />} title="Party Size" value={`${reservation.guests} ${reservation.guests === 1 ? "person" : "people"}`} />
                 <InfoRow icon={<Mail size={20} />} title="Contact Info" value={[
                   reservation.name,
                   reservation.email,
                   reservation.phone
                 ]} />
                 {reservation.specialRequests && (
                   <InfoRow icon={<FileText size={20} />} title="Special Requests" value={reservation.specialRequests} />
                 )}
               </div>
 
               <div className="mt-10 text-center">
                 <p className="text-gal-beige/80 mb-6">
                   We look forward to welcoming you to GAL Coffee & Kitchen. A confirmation email has been sent.
                 </p>
                 <Link href="/">
                   <Button className="bg-gal-beige text-gal-dark hover:bg-gal-beige/90">RETURN TO HOME</Button>
                 </Link>
               </div>
             </div>
    </motion.div>
  )
}
function InfoRow({ icon, title, value }: { icon: React.ReactNode; title: string; value: string | string[] }) {
  return (
    <div className="flex items-start gap-4">
      <div className="text-gal-beige mt-1">{icon}</div>
      <div>
        <h3 className="text-gal-beige font-medium">{title}</h3>
        {Array.isArray(value) ? (
          value.map((val, i) => <p key={i} className="text-gal-beige/80 text-sm">{val}</p>)
        ) : (
          <p className="text-gal-beige/80 text-sm">{value}</p>
        )}
      </div>
    </div>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button 
     onClick={() => {
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }} className="text-gal-beige/50 hover:text-gal-beige transition-colors" aria-label="Copy">
      {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
    </button>
  )
}
