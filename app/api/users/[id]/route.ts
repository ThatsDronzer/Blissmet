import { connectToDatabase } from "@/lib/db";
import User from "@/models/Users";
import mongoose from "mongoose"
import { NextRequest, NextResponse } from "next/server";

type dParams = {
    params: {
        id: string;
    }
}

export async function GET( req : NextRequest, { params } : dParams ) {
    try{
        const userId = params.id;
        if(!mongoose.Types.ObjectId.isValid(userId)){
            return NextResponse.json({
                message: "User id should be an ObjectId",
            },{status:500})
        }
        await connectToDatabase();
        const user = await User.findById(userId);
        if(!user){
            return NextResponse.json({
                message:`User not found with userId : ${ userId }`,
            },{status: 404});
        }
        return NextResponse.json({
            user,
        },{status: 200})
    }catch(err){
        console.error("error ", err);
        return NextResponse.json({
            message: "Internal server error",
        }, { status : 500});
    }
}

export async function PATCH( req : NextRequest , { params } : dParams){
    try{
        const userId = params.id;
        if(!mongoose.Types.ObjectId.isValid(userId)){
            return NextResponse.json({
                message: "User id should be an ObjectId",
            },{status:500})
        }
        await connectToDatabase();
        const updateData = await req.json();

        const updatedUser = await User.findByIdAndUpdate(userId, updateData , {
            new: true,
            runValidators: true,
        });

        if(!updatedUser){
            return NextResponse.json({
                message:`User not found with id : ${userId}`,
            },{status: 404})
        }
        return NextResponse.json({
            message:`User with userId : ${userId} upadated!`,
            updatedUser
        },{status : 200})

    }catch(error){
        console.error("Error : ", error);
        return NextResponse.json({
            message:"Internal server error",
        },{status: 500})
    }
}

export async function DELETE( req: NextRequest, { params } : dParams){
    try{
        const userId = params.id;
        if(!mongoose.Types.ObjectId.isValid(userId)){
            return NextResponse.json({
                message: "User id should be an ObjectId",
            },{status:500})
        }
        await connectToDatabase();
        const deletedUser = await User.findByIdAndDelete(userId);
        if(!deletedUser){
            return NextResponse.json({
                message:`User not found with id : ${userId}`,
            },{status: 404})
        }
        return NextResponse.json({
            message:`User deleted successfuly with ID : ${userId}`,
            deletedUser,
        },{status: 200})
    }catch(error){
        console.error("Error :",error);
        return NextResponse.json({
            message:"Internal server error",
        },{status: 500})
    }
}