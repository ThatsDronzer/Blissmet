import { connectToDatabase} from "@/lib/db"
import Booking from "@/models/Bookings"
import mongoose from "mongoose"
import { NextResponse, NextRequest } from "next/server"

export async function GET(req: NextRequest,{ params }: {params: { id: string}}) {
    try{
        const bookingId = params.id;
        if(!mongoose.Types.ObjectId.isValid(bookingId)){
            return NextResponse.json({
                message: "Booking Id should be an ObjectId"
            },{status:500})
        }
        await connectToDatabase();
        const booking = await Booking.findById(bookingId);
        if(!booking){
            return NextResponse.json({
                message: `Booking not found with Id : ${bookingId}`
            },{status: 404})
        }

        return NextResponse.json({
            booking,
        },{status: 200})
    }catch(err){
        console.error("Error: ", err);
        return NextResponse.json({
            message: "Internal server error",
        },{status: 500})
    }
}

export async function PATCH( req: NextRequest, {params} : {params: { id: string}}){
    try{
        const bookingId = params.id;
        if(!mongoose.Types.ObjectId.isValid(bookingId)){
            return NextResponse.json({
                message: "Booking Id should be an ObjectId"
            },{status:500})
        }
        const updateData = await req.json();
        await connectToDatabase();
        const updatedBooking = await Booking.findByIdAndUpdate(bookingId, updateData,{
            new: true,
            runValidators: true,
        })

        if(!updatedBooking){
            return NextResponse.json({
                message: `Booking not found with Id : ${bookingId}`,
            },{status: 404})
        }
        return NextResponse.json({
            updatedBooking,
        },{status:200})
    }catch(err){
        console.error("Error :", err);
        return NextResponse.json({
            message: "Internal server error",
        },{status: 500})
    }
}

export async function DELETE(req: NextRequest,{params} : {params:{id:string}}){
    try{
        const bookingId = params.id;
        if(!mongoose.Types.ObjectId.isValid(bookingId)){
            return NextResponse.json({
                message:"Booking id should be an ObjectId"
            },{status:500})
        }
        await connectToDatabase();
        const deleted = await Booking.findByIdAndDelete(bookingId);
        if(!deleted){
            return NextResponse.json({
                message: `Booking not found with Id : ${bookingId}` 
            },{status:404})
        }
        return NextResponse.json({
            message:`Booking deleted successfully`,
        },{status: 200})
    }catch(err){
        console.error("Error :", err);
        return NextResponse.json({
            message: "Internal server error",
        },{status: 500})
    }
}