import mongoose, { Schema, models } from "mongoose"

const OrderSchema = new Schema(
  {
    fullName: String,
    email: String,
    address: String,
    phone: String,
    notes: String,
    cartItems: Array,
    deliveryMethod: String,
    total: Number,
    status: { type: String, default: "pending" },
    orderNumber: { type: String, unique: true }

  },
  { timestamps: true }
)
// Generate 4-digit order number if not present
OrderSchema.pre("save", async function (next) {
    if (!this.orderNumber) {
      let unique = false
      let generated
  
      // Try generating until a unique one is found
      while (!unique) {
        generated = Math.floor(1000 + Math.random() * 9000).toString()
        const existing = await mongoose.models.Order.findOne({ orderNumber: generated })
        if (!existing) unique = true
      }
  
      this.orderNumber = generated
    }
  
    next()
  })
export default models?.Order || mongoose.model("Order", OrderSchema)
