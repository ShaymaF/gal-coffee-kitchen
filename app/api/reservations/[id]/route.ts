import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Reservation from "@/models/ Reservation"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const { id } = params

    const reservation = await Reservation.findById(id)

    if (!reservation) {
      return NextResponse.json({ success: false, error: "Reservation not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: reservation })
  } catch (error) {
    console.error("Error fetching reservation:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch reservation" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const { id } = params
    const body = await request.json()

    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true },
    )

    if (!updatedReservation) {
      return NextResponse.json({ success: false, error: "Reservation not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: updatedReservation })
  } catch (error) {
    console.error("Error updating reservation:", error)
    return NextResponse.json({ success: false, error: "Failed to update reservation" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const { id } = params

    const deletedReservation = await Reservation.findByIdAndDelete(id)

    if (!deletedReservation) {
      return NextResponse.json({ success: false, error: "Reservation not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: {} })
  } catch (error) {
    console.error("Error deleting reservation:", error)
    return NextResponse.json({ success: false, error: "Failed to delete reservation" }, { status: 500 })
  }
}
