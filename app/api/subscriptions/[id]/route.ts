import { connectToDatabase } from "@/lib/db";
import Subscription from "@/models/Subscription";
import mongoose from "mongoose"
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, {params} : {params:{id:string}}) {
  try {
    const subId = params.id;
    if(!mongoose.Types.ObjectId.isValid(subId)){
      return NextResponse.json({
        message:"Subscription Id should be an ObjectId",
      },{status:400})
    }
    const db = await connectToDatabase();
    const subscription = await Subscription.findById(subId).lean();

    if (!subscription) {
      return NextResponse.json({
        message: "Subscription not found",
      },{status:404})
    }
    
    return NextResponse.json({
      subscription,
    },{status:200})
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PATCH(req:NextRequest, {params}:{params:{id:string}}){
  try{
    const subId = params.id;
    const data = await req.json();
    if(!mongoose.Types.ObjectId.isValid(subId)){
      return NextResponse.json({
        message:"Subscription Id should be an ObjectId",
      },{status:400})
    }
    const db = await connectToDatabase();
    const updatedSubscription = await Subscription.findByIdAndUpdate(subId, data, {new:true}).lean();

    if(!updatedSubscription){
      return NextResponse.json({
        message: `Subscription not found with id : ${subId}` 
      },{status:404}) 
    }
    return NextResponse.json({
      message: "Subscription updated successfully",
      updatedSubscription,
    },{status:200})
  }catch(error){
    console.error("Error :", error);
    return NextResponse.json({
      message: "Internal server error",
    },{status:500})
  }
}

export async function DELETE(req: NextRequest, {params} : {params:{id:string}}) {
    try{
        const subId = params.id;
        if(!mongoose.Types.ObjectId.isValid(subId)){
          return NextResponse.json({
            message:"Subscription Id should be an ObjectId",
          },{status:400})
        }
        await connectToDatabase();
        const deleted = await Subscription.findByIdAndDelete(subId);
        if(!deleted){
            return NextResponse.json({
                message: `Subscription not found with id : ${subId}` 
            },{status:404}) 
        }
        return NextResponse.json({
            message:`Subscription deleted successfuly with ID : ${subId}`,
            deletedSubscription: deleted,
        },{status: 200})
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}
    