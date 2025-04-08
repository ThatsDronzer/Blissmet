import { connectToDatabase} from "@/lib/db"
import Venue from "@/models/Venue"
import mongoose from "mongoose"
import { NextResponse, NextRequest } from "next/server"

export async function GET(req: NextRequest,{ params }: {params: { id: string}}) {
    try{
        const venueId = params.id;
        if(!mongoose.Types.ObjectId.isValid(venueId)){
            return NextResponse.json({
                message: "Venue id should be an ObjectId",
            },{status: 400})
        }
        await connectToDatabase();
        const venue = await Venue.findById(venueId);
        
        if(!venue){
            return NextResponse.json({
                message: `Venue not found with Id : ${venueId}`
            },{status: 404})
        }

        return NextResponse.json({
            venue,
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
        const venueId = params.id;
        if(!mongoose.Types.ObjectId.isValid(venueId)){
            return NextResponse.json({
                message: "Venue id should be an ObjectId",
            },{status: 400})
        }
        const updateData = await req.json();
        await connectToDatabase();
        const updatedVenue = await Venue.findByIdAndUpdate(venueId, updateData,{
            new: true,
            runValidators: true,
        })

        if(!updatedVenue){
            return NextResponse.json({
                message: `Venue not found with Id : ${ venueId }`,
            },{status: 404})
        }
        
        return NextResponse.json({
            updatedVenue,
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
        const venueId = params.id;
        if(!mongoose.Types.ObjectId.isValid(venueId)){
            return NextResponse.json({
                message: "Venue id should be an ObjectId",
            },{status: 400})
        }
        await connectToDatabase();
        const deleted = await Venue.findByIdAndDelete(venueId);
        if(!deleted){
            return NextResponse.json({
                message: `Venue cannot be deleted with Id : ${venueId}` 
            })
        }
        return NextResponse.json({
            message:`venue deleted successfully`,
        },{status: 200})
    }catch(err){
        console.error("Error :", err);
        return NextResponse.json({
            message: "Internal server error",
        },{status: 500})
    }
}