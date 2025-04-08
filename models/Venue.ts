import mongoose from 'mongoose';

// Venue Model
const VenueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  price: { type: mongoose.Types.Decimal128, required: true },
  amenities: { type: String },
  availability: { type: Boolean, default: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  rating: { type: Number, default: 0 },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
});

export default mongoose.models.Venue || mongoose.model('Venue', VenueSchema);



