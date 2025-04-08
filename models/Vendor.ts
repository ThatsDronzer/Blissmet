import mongoose from "mongoose"

// Vendor Model Schema
const VendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: false },
  services: { type: String },
  category: { type: String, default: "Other" }, // Ensure this field exists for filtering
  price: { type: Number, default: 0 }, // Ensure this field exists for filtering
  product: { type:mongoose.Schema.Types.ObjectId, ref: 'Product' },
  location: { type: String, default: "Unknown" },
  availability: { type: Boolean, default: true },
  profilePicture: { type: String },
  image: { type: String, default: 'https://via.placeholder.com/300' }, // Ensure image field exists
  portfolio: { type: String },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  rating: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  subscriptionPlan: { type: String },
}, { 
  timestamps: true,
  // Add this to include virtual properties when using .lean()
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Check if the model already exists before creating a new one
const Vendor = mongoose.models.Vendor || mongoose.model('Vendor', VendorSchema);

export default Vendor;
