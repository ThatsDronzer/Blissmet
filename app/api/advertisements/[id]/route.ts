import { connectToDatabase} from "@/lib/db"
import mongoose from "mongoose"
import Advertisement from "@/models/Advertisement"
import { NextResponse, NextRequest } from "next/server"

export async function GET(req: NextRequest,{ params }: {params: { id: string}}) {
    try{
        const advertisementId = params.id;

        if(!mongoose.Types.ObjectId.isValid(advertisementId)){
            return NextResponse.json({
                message:"Advertisement Id should be an ObjectId"
            },{status:500})
        }
        await connectToDatabase();
        const advertisement = await Advertisement.findById(advertisementId);

        if(!advertisement){
            return NextResponse.json({
                message: `Advertisement not found with Id : ${advertisementId}`
            },{status: 404})
        }

        return NextResponse.json({
            advertisement,
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
        const advertisementId = params.id;
        if(!mongoose.Types.ObjectId.isValid(advertisementId)){
            return NextResponse.json({
                message:"Advertisement Id should be an ObjectId"
            })
        }
        const updateData = await req.json();
        await connectToDatabase();
        const updatedAdvertisement = await Advertisement.findByIdAndUpdate(advertisementId, updateData,{
            new: true,
            runValidators: true,
        })

        if(!updatedAdvertisement){
            return NextResponse.json({
                message: `Advertisement not found with Id : ${advertisementId}`,
            },{status: 404})
        }

        return NextResponse.json({
            updatedAdvertisement,
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
        const advertisementId = params.id;

        if(!mongoose.Types.ObjectId.isValid(advertisementId)){
            return NextResponse.json({
                message:"Advertisement Id should be an ObjectId"
            },{status:500})
        }
        await connectToDatabase();
        const deleted = await Advertisement.findByIdAndDelete(advertisementId);
        if(!deleted){
            return NextResponse.json({
                message: `Advertisement not found with Id : ${advertisementId}` 
            },{status:500})
        }
        return NextResponse.json({
            message:`Advertisement deleted successfully`,
        },{status: 200})
    }catch(err){
        console.error("Error :", err);
        return NextResponse.json({
            message: "Internal server error",
        },{status: 500})
    }
}