import { connectToDatabase } from "@/lib/db";
import Review from "@/models/Review";
import { NextResponse, NextRequest } from "next/server";

// Get all reviews with pagination
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);
        await connectToDatabase();

        const skip = (page - 1) * limit;

        const reviews = await Review.find().skip(skip).limit(limit);
        const totalReviews = await Review.countDocuments();
        if(!reviews){
            return NextResponse.json({
                message:`Something went wrong`,
            },{status: 500})
        }
        return NextResponse.json({
            reviews,
            total_pages: Math.ceil(totalReviews / limit),
            total_reviews: totalReviews,
            page,
        },{status:200});
    } catch (err) {
        console.error("Error:", err);
        return NextResponse.json({
            message: "Internal server error",
        }, { status: 500 });
    }
}

// Create a new review
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        await connectToDatabase();

        const newReview = new Review(body);
        const saved = await newReview.save();
        if(!saved){
            return NextResponse.json({
                message:`Something went wrong`,
            },{status: 400})
        }
        return NextResponse.json({
            message: "Review created successfully",
            review: newReview,
        }, { status: 201 });
    } catch (err) {
        console.error("Error:", err);
        return NextResponse.json({
            message: "Internal server error",
        }, { status: 500 });
    }
}