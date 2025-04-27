// app/api/order/route.ts
import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Order from "@/models/Order"

export async function POST(req: Request) {
  try {
    await dbConnect()
    const data = await req.json()
    const newOrder = await Order.create(data)
    return NextResponse.json({ id: newOrder._id }, { status: 201 })
  } catch (error) {
    console.error("Order creation failed:", error)
    return NextResponse.json({ error: "Order creation failed" }, { status: 500 })
  }
}
