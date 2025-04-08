import mongoose from "mongoose"

// Advertisement Model
const AdvertisementSchema = new mongoose.Schema({
  advertiserName: { type: String, required: true },
  adType: { type: String, required: true },
  imageUrl: { type: String },
  redirectUrl: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
});
  
const Advertisement = mongoose.models.Advertisement || mongoose.model('Advertisement', AdvertisementSchema);
export default Advertisement