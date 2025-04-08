import mongoose from "mongoose"

// Review Model
const ReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  venueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue' },
  rating: { type: Number, required: true, min: 0, max: 5 },
  comments: { type: String },
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
  