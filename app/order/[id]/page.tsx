// app/order/[id]/page.tsx (Server Component)
import dbConnect from "@/lib/mongodb"
import { notFound } from "next/navigation"
import Order from "@/models/Order"
import { OrderDetail } from "@/components/order/order-detail"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { BookTableButton } from "@/components/book-table-button"
import { TopButton } from "@/components/top-button"

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  await dbConnect()
  const { id } = await params
  if (!id) return notFound()
  const orderId = decodeURIComponent(id)
  const rawOrder = await Order.findById(orderId)
  if (!rawOrder) return notFound()
    const order = rawOrder.toObject()
  order._id = order._id.toString()
  order.date = rawOrder.createdAt.toISOString().split("T")[0]       // "YYYY-MM-DD"
  order.time = rawOrder.createdAt.toTimeString().split(" ")[0]      // "HH:MM:SS"
  

  return (
    <main className="min-h-screen bg-gal-dark">
      <Header />
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="fidalgo-container">
          <h1 className="text-4xl md:text-5xl font-light text-gal-beige tracking-wider mb-6 text-center font-serif">
            ORDER DETAILS
          </h1>
          <div className="fidalgo-divider"></div>
          <OrderDetail order={order} />
        </div>
      </section>
      <Footer />
      <TopButton />
    </main>
  )}
