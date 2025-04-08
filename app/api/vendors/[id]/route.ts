import { connectToDatabase } from "@/lib/db"
import { NextResponse, NextRequest } from "next/server"
import mongoose from "mongoose"
import Vendor from "@/models/Vendor"

export async function GET(req: NextRequest, { params }: { params : { id : string}}){
    try{
        const vendorId = params.id;
        if(!mongoose.Types.ObjectId.isValid(vendorId)){
            return NextResponse.json({
                message: "Invalid vendor ID",
            },{status: 400})
        }
        await connectToDatabase();
        const vendor  = await Vendor.findById(vendorId);
        if(!vendor){
            return NextResponse.json({
                message:`Vendor not found with ID : ${ vendorId }`,
            },{status: 404})
        }
        return NextResponse.json({
            vendor
        },{status: 200})
    }catch(err){
        console.error("Error : ", err);
        return NextResponse.json({
            message:"Interanl server error",
        },{status: 500})
    }
}

export async function PATCH( req: NextRequest, { params } : { params : { id : string}}){
    try{
        const vendorId = params.id;
        if(!mongoose.Types.ObjectId.isValid(vendorId)){
            return NextResponse.json({
                message: "Invalid vendor ID",
            },{status: 400})
        }
        const updateData = await req.json();
        await connectToDatabase();
        const updatedVendor = await Vendor.findByIdAndUpdate(vendorId, updateData, {
            new: true,
            runValidators: true,
        });
        if(!updatedVendor){
            return NextResponse.json({
                message:`Vendor not found with ID : ${ vendorId }`,
            },{status: 404})
        }
        return NextResponse.json({
            message:`Vendor updated successfuly`,
            updatedVendor,
        },{status: 201})
    }catch(err){
        console.error("Error : ", err);
        return NextResponse.json({
            message:"Interanl server error",
        },{status: 500})
    }
}

export async function DELETE(req: NextRequest, { params } : { params: { id : string}}){
    try{
        const vendorId = params.id;
        if(!mongoose.Types.ObjectId.isValid(vendorId)){
            return NextResponse.json({
                message: "Invalid vendor ID",
            },{status: 400})
        }
        await connectToDatabase();
        const deleted = await  Vendor.findByIdAndDelete(vendorId);

        if(!deleted){
            return NextResponse.json({
                message:`Vendor not found with ID : ${ vendorId }`,
            },{status: 404})
        }
        return NextResponse.json({
            message:`Vendor deleted successfully`,
        },{status: 200})
    }catch(err){
        console.error("Error : ", err);
        return NextResponse.json({
            message:"Interanl server error",
        },{status: 500})
    }
}