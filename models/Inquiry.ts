import mongoose from "mongoose"

// Inquiry Model
const InquirySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  venueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue' },
  date: { type: Date, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['open', 'resolved'], default: 'open' },
});

export default mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
  