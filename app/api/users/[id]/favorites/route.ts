import { NextRequest, NextResponse } from "next/server";
import {connectToDatabase} from "@/lib/db"
import mongoose from "mongoose"
import User from "@/models/Users"

export async function GET( req: NextRequest, { params } : {params: { id: string }} ){
    try{
        const userId = params.id;
        if(!mongoose.Types.ObjectId.isValid(userId)){
            return NextResponse.json({
                message: "User id should be an ObjectId",
            },{status: 400})
        }
        const {searchParams} = new URL(req.url);
        const page = parseInt(searchParams.get("page") || '1', 10);
        const limit = parseInt(searchParams.get("limit") || '10', 10);
        await connectToDatabase();
        const user = await User.findById(userId).select("favorites").populate({
            path:"favorites.vendors",
            options:{ limit, skip:(page - 1)*limit}
        }).populate({
            path:"favorites.venues",
            options:{ limit, skip:(page - 1)*limit },

        });
        const totalFavorites = await User.findById(userId).select("favorites").countDocuments();
        const favorites = user.favorites;
        if(!user){
            return NextResponse.json({
                message:`User not found with id : ${userId}`,
            },{status: 404})
        }

        return NextResponse.json({
            page,
            total_pages: Math.ceil(totalFavorites/limit),
            total_favorites: totalFavorites,
            favorites,
        },{status: 200})
    }catch(error){
        console.error("Error :", error);
        return NextResponse.json({
            message:`Internal server error`,
        },{status: 500})
    }
}

export async function PUT( req : NextRequest , { params } : { params: { id : string}}){
    try{
        const userId = params.id;
        const updateData = await req.json(); // JSON payload from the request

        await connectToDatabase();

        // Ensure `favorites` exists in the request body
        if (!updateData.favorites || (!updateData.favorites.vendors && !updateData.favorites.venues)) {
            return NextResponse.json({ message: "No valid favorites data provided" }, { status: 400 });
        }

        // Use `$addToSet` to add new vendors or venues without duplicates
        const updateQuery: any = {};
        if (updateData.favorites.vendors) {
            updateQuery["favorites.vendors"] = { $each: updateData.favorites.vendors };
        }
        if (updateData.favorites.venues) {
            updateQuery["favorites.venues"] = { $each: updateData.favorites.venues };
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: updateQuery }, // Ensures unique additions
            { new: true, runValidators: true }
        );

        if(updatedUser){
            return NextResponse.json({
                message:`user updated`,
                updatedUser,
            },{status: 200})
        }else{
            return NextResponse.json({
                message:`User not found with id : ${ userId }`,
            },{status: 404})
        }
    }catch(error){
        console.error("Error :", error);
        return NextResponse.json({
            message: "Internal server error",
        },{status: 500})
    }
}
