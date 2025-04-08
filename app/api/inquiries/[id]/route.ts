import { connectToDatabase } from "@/lib/db";
import Inquiry from "@/models/Inquiry";
import mongoose from "mongoose";
import { NextResponse, NextRequest } from "next/server"

export async function GET(req: NextRequest,{params}:{params:{id:string}}){
    try{
      const inquiryId = params.id;
      if(!mongoose.Types.ObjectId.isValid(inquiryId)){
        return NextResponse.json({
              message:"Inquiry Id should be an ObjectId",
          },{status:500})
      }
      await connectToDatabase();
      const inquiry = await Inquiry.findById(inquiryId);
      if(inquiry){
        return NextResponse.json({
          message:"Inquiry not found",
      },{status:404})
      }
      return NextResponse.json({
        inquiry,
      },{status:200})
    }catch(err){
        console.error("Error :", err);
        return NextResponse.json({
            message:"Internal server error",
        },{status:500})
    }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const inquiryId = params.id;
    if(!mongoose.Types.ObjectId.isValid(inquiryId)){
      return NextResponse.json({
            message:"Inquiry Id should be an ObjectId",
        },{status:500})
    }
    const body = await req.json();

    await connectToDatabase();
    
    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      inquiryId,
      { $set: body },
      { new: true, runValidators: true }
    );

    if(!updatedInquiry) {
      return NextResponse.json({
        message: "Inquiry not found",
      }, { status: 404 });
    }
    return NextResponse.json({
      message: "Inquiry updated successfully",
      inquiry: updatedInquiry,
    },{status:200});
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({
      message: "Internal server error",
    }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest,{ params }: { params: { id: string } }) {
    try {
      const inquiryId = params.id;
      if(!mongoose.Types.ObjectId.isValid(inquiryId)){
          return NextResponse.json({
              message:"Inquiry Id should be an ObjectId",
          },{status:500})
      }
      await connectToDatabase();
      
      const deletedInquiry = await Inquiry.findByIdAndDelete(inquiryId);

      if(!deletedInquiry) {
        return NextResponse.json({
          message: "Inquiry not found",
      }, { status: 404 });
      }
      return NextResponse.json({
        message: "Inquiry deleted successfully",
        inquiry: deletedInquiry,
      },{status:200});
    } catch (err) {
        console.error("Error:", err);
        return NextResponse.json({
            message: "Internal server error",
        }, { status: 500 });
    }
}