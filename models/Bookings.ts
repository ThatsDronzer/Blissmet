import mongoose from "mongoose"

const BookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Vendor",
        required: true,
    },
    venueId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Venue",
        required: true,
    },
    bookingDate:{
        type: Date,
        default: Date.now,
        required: true,
    },
    eventDate: {
        type: Date,
        required: true,
    },
    totalAmount:{
        type:Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    transactionId: {
        type: String,
        required:true,
    },
    cancellationPolicy: {
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
    }
})

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);