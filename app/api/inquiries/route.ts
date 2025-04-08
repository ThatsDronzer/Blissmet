import { connectToDatabase } from "@/lib/db";
import Inquiry from "@/models/Inquiry";
import { NextResponse, NextRequest } from "next/server"

export async function GET(req: NextRequest){
    try{
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);
        await connectToDatabase();
        const inquiries = await Inquiry.find().skip((page-1)*limit).limit(limit);
        const totalInquiries = await Inquiry.countDocuments();
        if(!inquiries){
            return NextResponse.json({
                message:"Something went wrong",
            },{status:500})
        }
        return NextResponse.json({
            total_pages: Math.ceil(totalInquiries/limit),
            page,
            total_inquiries:totalInquiries,
            inquiries,
        },{status: 200})
    }catch(err){
        console.error("Error :", err);
        return NextResponse.json({
            message:"Internal server error",
        },{status:500})
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        await connectToDatabase();
        const newInquiry = new Inquiry(data);
        const savedInquiry = await newInquiry.save();
        if(!savedInquiry){
            return NextResponse.json({
                message: "Something went wrong while creating inquiry",
            }, { status: 400 });
        }
        return NextResponse.json({
            message: "Inquiry created successfully",
            inquiry: savedInquiry
        }, { status: 201 });
    } catch (err) {
        console.error("Error:", err);
        return NextResponse.json({
            message: "Internal server error",
        }, { status: 500 });
    }
}

