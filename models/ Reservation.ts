import mongoose from "mongoose"

const ReservationSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    specialRequests: { type: String, required: false },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    reservationNumber: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models?.Reservation || mongoose.model("Reservation", ReservationSchema)
