import { connectToDatabase } from "@/lib/db"
import Faq from "@/models/Faq"
import { NextResponse, NextRequest } from "next/server"

export async function GET(req: NextRequest){
    try{
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);
        await connectToDatabase();
        const faqs = await Faq.find().skip((page-1)*limit).limit(limit);
        const totalFaqs = await Faq.countDocuments();
        if(!faqs){
            return NextResponse.json({
                message:"Something went wrond",
            },{status: 400})
        }
        return NextResponse.json({
            total_pages: Math.ceil(totalFaqs/limit),
            page,
            total_faqs:totalFaqs,
            faqs,
        },{status: 200})
    }catch(err){
        console.error("Error :", err);
        return NextResponse.json({
            message:"Internal server error",
        },{status: 500})
    }
}

export async function POST(req : NextRequest){
    try{
        const data = await req.json();
        const newFaq = new Faq(data);
        const saved = await newFaq.save();
        if(!saved){
            return NextResponse.json({
                message:"Something went wrong",
            },{status:400})
        }
        return NextResponse.json({
            message:"Faq added successfully",
        },{status:200})
    }catch(err){
        console.error("Error :",err);
        return NextResponse.json({
            message:"Internal server error",
        },{status:500})
    }
}