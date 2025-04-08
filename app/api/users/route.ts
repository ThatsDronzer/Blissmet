import { hashPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/Users"
import "@/models/Vendor"
import "@/models/Venue"
import "@/models/Bookings"
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest){
    try{
        await connectToDatabase();
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);
        const result = await User.find().skip((page - 1)*limit).limit(limit)
            .populate("bookings")
            .populate("favorites.vendors")
            .populate("favorites.venues");
        const totalUsers = await User.countDocuments();
        if(!result){
            return NextResponse.json({
                message:"something went wrong",
            },{status:500})
        }
        return NextResponse.json({
            totalPages: Math.ceil(totalUsers/ limit),
            current_page:page,
            result,
        },{status: 200})
    }catch(error){
        console.error("Error GET - api/users : ", error);
        return NextResponse.json({
            message:"Internal server error",
        },{status : 500})
    }
}

export async function POST(req: Request){
    try{
        const user:any = await req.json();
        await connectToDatabase();
        const existingUser = await User
            .findOne({email: user.email});
        
        // Handle login vs registration based on the request purpose
        if (user.isLogin) {
            // This is a login request
            if (!existingUser) {
                return NextResponse.json({
                    message: "User not found",
                }, {status: 404})
            }
            
            // Return user data for successful login
            return NextResponse.json({
                message: "Login successful",
                user: {
                    id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email,
                    role: existingUser.role
                },
                redirect: '/',  // Specify redirect URL for client
            }, {status: 200})
        } 
        
        // This is a registration request
        if(existingUser){
                return NextResponse.json({
                    message:"User already exists",
                },{status: 400})
        }
        
        var hashedPassword = "";
        if(user.password){
            hashedPassword = await hashPassword(user.password);
        }
        
        const newUser =  new User({
            name:user.name,
            email: user.email,
            phone: user.phone ? user.phone : "",
            uid: user.uid || "",
            provider: user.provider || "",
            password: hashedPassword || "",
            role: user.role,
        });
        const saved = await newUser.save();
        if(!saved){
            return NextResponse.json({
                message:"user cannot not be saved",
            },{status: 500})
        }
        return NextResponse.json({
            message:"User saved successfuly",
            saved,
        },{status: 200})

    }catch(error:any){
        console.error("Error POST - api/users/ :", error);
        return NextResponse.json({
            message:"internal server error",
            error:error.errors,
        },{status:500})
    }
}