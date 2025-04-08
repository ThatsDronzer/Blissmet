import mongoose from "mongoose";

const MONGO_URI = process.env.NEXT_MONGO_URI;

export async function connectToDatabase() {
    if (mongoose.connection.readyState >= 1) return;
    //@ts-ignore
    await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB: eventPro");
}
