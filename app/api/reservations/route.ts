import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Reservation from "@/models/ Reservation"

export async function POST(request: Request) {
  try {
    await dbConnect()

    const body = await request.json()

    // Validate required fields
    const requiredFields = ["date", "time", "guests", "name", "phone", "email"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Generate a unique reservation number
    const reservationCount = await Reservation.countDocuments()
    const reservationNumber = `R${String(100000 + reservationCount).padStart(6, "0")}`

    // Create the reservation
    const reservation = await Reservation.create({
      ...body,
      reservationNumber,
      status: "pending",
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          _id: reservation._id,
          reservationNumber: reservation.reservationNumber,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating reservation:", error)
    return NextResponse.json({ success: false, error: "Failed to create reservation" }, { status: 500 })
  }
}

export async function GET() {
  try {
    await dbConnect()
    const reservations = await Reservation.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ success: true, data: reservations })
  } catch (error) {
    console.error("Error fetching reservations:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch reservations" }, { status: 500 })
  }
}
