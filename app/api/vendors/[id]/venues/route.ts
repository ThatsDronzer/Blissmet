import { connectToDatabase } from "@/lib/db"
import { NextResponse, NextRequest } from "next/server"
import Venue from "@/models/Venue"
import mongoose from "mongoose"
import "@/models/Vendor"


export async function GET(req: NextRequest, { params } : { params : { id : string}}){
    try{
        const vendorId = params.id;
        if(!mongoose.Types.ObjectId.isValid(vendorId)){
            return NextResponse.json({
                message: "Invalid vendor ID",
            },{status: 400})
        }
        await connectToDatabase();
        const venues = await Venue.find({vendorId: vendorId});
        if(venues){
            return NextResponse.json({
                venues,
            },{status: 200})
        }else{
            return NextResponse.json({
                message:`Vendor not found with ID : ${ vendorId }`,
            },{status: 404})
        }
    }catch(err){
        console.error("Error : ", err);
        return NextResponse.json({
            message:"Interanl server error",
        },{status: 500})
    }
}