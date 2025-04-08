import { connectToDatabase} from "@/lib/db"
import Advertisement from "@/models/Advertisement"
import { NextResponse, NextRequest } from "next/server"

export async function GET(req:NextRequest) {
    try{
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);
        await connectToDatabase();
        const ads = await Advertisement.find().skip((page-1)*limit).limit(limit);
        const totalAds = await Advertisement.countDocuments();
        if(!ads){
            return NextResponse.json({
                message:`Something went wrong`,
            },{status: 500})
        }

        return NextResponse.json({
            total_pages:Math.ceil(totalAds/limit),
            total_advertisements:totalAds,
            page,
            ads
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
        const advertisement = await req.json();
        const newAd = new Advertisement(advertisement)
        await connectToDatabase();
        const saved = await newAd.save();

        if(!saved){
            return NextResponse.json({
                message:`Something went wrong`,
            },{status: 400})
        }

        return NextResponse.json({
            message:`New Advertisement created successfuly`
        },{status: 201})
    }catch(err){
        console.error("Error :", err);
        return NextResponse.json({
            message:"Internal server error",
        },{status: 500})
    }
}