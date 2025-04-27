
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TopButton } from "@/components/top-button"
import dbConnect from "@/lib/mongodb"
import { notFound } from "next/navigation"
import Reservation from "@/models/ Reservation"
import { ReservationDetail } from "@/components/reservation/reservation-detail"

export default async function ReservationConfirmationPage({ params }: { params: { id: string } }) {
  await dbConnect()
  const { id } = await params
  try {
    const rawReservation = await Reservation.findById(id)
    if (!rawReservation || !id) return notFound()

    const reservation = rawReservation.toObject()
    reservation._id = reservation._id.toString()

    return (
      <main className="min-h-screen bg-gal-dark">
        <Header />
        <section className="pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="fidalgo-container">
            <h1 className="text-4xl md:text-5xl font-light text-gal-beige tracking-wider mb-6 text-center font-serif">
              RESERVATION DETAILS
            </h1>
            <div className="fidalgo-divider"></div>
              <ReservationDetail reservation={reservation} /> 
          
          </div>
        </section>
        <Footer />
        <TopButton />
      </main>
    )
  } catch (error) {
    console.error("Error fetching reservation:", error)
    return notFound()
  }
}

