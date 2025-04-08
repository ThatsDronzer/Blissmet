import mongoose from "mongoose"

// Subscription Model
const SubscriptionSchema = new mongoose.Schema({
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    plan: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    transactionId: { type: String },
  });
  
  export default mongoose.models.Subscription || mongoose.model('Subscription', SubscriptionSchema);