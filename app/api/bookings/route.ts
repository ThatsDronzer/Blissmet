import { connectToDatabase} from "@/lib/db"
import Booking from "@/models/Bookings"
import { NextResponse, NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    try{
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);
        await connectToDatabase();
        const bookings = await Booking.find().skip((page-1)*limit).limit(limit);
        const totalBookings = await Booking.countDocuments();
        if(!bookings){
            return NextResponse.json({
                message:`Something went wrong`,
            },{status: 500})
        }
        return NextResponse.json({
            bookings
        },{status: 200})
    }catch(err){
        console.error("Error :", err);
        return NextResponse.json({
            message: "Internal server error",
        },{status: 500})
    }
}

export async function POST(req : NextRequest) {
    try{
        const booking = await req.json();
        const newBooking = new Booking(booking)
        await connectToDatabase();
        const saved = await newBooking.save();

        if(!saved){
            return NextResponse.json({
                message:`Something went wrong`,
            },{status: 400})
        }
        return NextResponse.json({
            message:`New Booking created successfuly`
        },{status: 201})
    }catch(err){
        console.error("Error :", err);
        return NextResponse.json({
            message:"Internal server error",
        },{status: 500})
    }
}