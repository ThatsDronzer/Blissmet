import mongoose from "mongoose"

// FAQ Model
const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String },
});
  
export default mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);