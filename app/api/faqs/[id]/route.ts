import { connectToDatabase } from "@/lib/db"
import Faq from "@/models/Faq"
import mongoose from "mongoose"
import { NextResponse, NextRequest } from "next/server"

export async function GET(req: NextRequest,{params } : {params:{id: string}}){
    try{
        const faqId = params.id;
        if(!mongoose.Types.ObjectId.isValid(faqId)){
            return NextResponse.json({
                message:"Faq Id should be an ObjectId",
            },{status:500})
        }
        await connectToDatabase();
        const faq = await Faq.findById(faqId);
        if(!faq){
            return NextResponse.json({
                message:`faq with with id : ${faqId} not found`
            },{status:404})
        }
        return NextResponse.json({
            faq,
        },{status:200})
    }catch(err){
        console.error("Error : ", err);
        return NextResponse.json({
            message:"Internal server error",
        },{status:500})
    }
}

export async function PATCH(req: NextRequest, {params}:{params:{id:string}}){
    try{
        const updateData = await req.json();
        const faqId = params.id;
        if(!mongoose.Types.ObjectId.isValid(faqId)){
            return NextResponse.json({
                message:"Faq Id should be an ObjectId",
            },{status:500})
        }
        await connectToDatabase();
        const updatedFaq = await Faq.findByIdAndUpdate(faqId, updateData, {
            new: true,
            runValidators: true,
        })

        if(!updatedFaq){
            return NextResponse.json({
                message:`faq with with id : ${faqId} not found`
            },{status:404})
        }
        return NextResponse.json({
            message:`faq updated successfully`,
            updatedFaq,
        },{status:200})
    }catch(err){
        console.error("Error :", err);
        return NextResponse.json({
            message:`Internal server error`,
        },{status:500})
    }
}

export async function DELETE(req: NextRequest,{params} : {params: {id: string}}){
    try{
        const faqId = params.id;
        if(!mongoose.Types.ObjectId.isValid(faqId)){
            return NextResponse.json({
                message:"Faq Id should be an ObjectId",
            },{status:500})
        }
        await connectToDatabase();
        const deleted = await Faq.findByIdAndDelete(faqId);
        if(!deleted){
            return NextResponse.json({
                message:`faq with with id : ${faqId} not found`
            },{status:404})
        }
        return NextResponse.json({
            message:"faq deleted successfully",
        },{status:200})
    }catch(err){
        console.error("Error :", err);
        return NextResponse.json({
            message:"Internal server error",
        },{status:500})
    }
}
