import { connectToDatabase} from "@/lib/db"
import Venue from "@/models/Venue"
import { NextResponse, NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    try{
        const {searchParams} = new URL(req.url); 
        const page = parseInt(searchParams.get("page") || '1', 10);
        const limit = parseInt(searchParams.get("limit") || '10', 10);
        await connectToDatabase();
        const venues = await Venue.find().skip((page-1)*limit).limit(limit);
        const totalVenues = await Venue.find().countDocuments();

        if(!venues){
            return NextResponse.json({
                message:`Something went wrong`,
            },{status: 500})
        }
        return NextResponse.json({
            total_venues: totalVenues,
            totalPages: Math.ceil(totalVenues/limit),
            page,
            venues
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
        const venue = await req.json();
        const newVenue = new Venue(venue);
        await connectToDatabase();
        const saved = await newVenue.save();

        if(!saved){
            return NextResponse.json({
                message:`Something went wrong`,
            },{status: 400})
        }

        return NextResponse.json({
            message:`Venue created successfuly`
        },{status: 201})
    }catch(err){
        console.error("Error :", err);
        return NextResponse.json({
            message:"Internal server error",
        },{status: 500})
    }
}