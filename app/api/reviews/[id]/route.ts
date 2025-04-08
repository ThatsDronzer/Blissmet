import {connectToDatabase} from "@/lib/db"
import Review from "@/models/Review"
import mongoose from "mongoose"
import { NextResponse, NextRequest } from "next/server"

export async function GET(req: NextRequest,{ params }: { params: { id: string } }) {
    try {
        const reviewId = params.id;
        if(!mongoose.Types.ObjectId.isValid(reviewId)){
            return NextResponse.json({
                message: "Review id should be an ObjectId",
            },{status: 400})
        }
        await connectToDatabase();
        const review = await Review.findById(reviewId);

        if(!review) {
            return NextResponse.json({
                message: "Review not found",
            }, { status: 404 });
        }
        return NextResponse.json({
            review,
        },{status:200});
    } catch (err) {
        console.error("Error:", err);
        return NextResponse.json({
            message: "Internal server error",
        }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const reviewId = params.id;
        if(!mongoose.Types.ObjectId.isValid(reviewId)){
            return NextResponse.json({
                message: "Review id should be an ObjectId",
            },{status: 400})
        }
        const body = await req.json();

        await connectToDatabase();

        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!updatedReview) {
            return NextResponse.json({
                message: "Review not found",
            }, { status: 404 });
        }
        return NextResponse.json({
            message: "Review updated successfully",
            review: updatedReview,
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
        const reviewId = params.id;
        if(!mongoose.Types.ObjectId.isValid(reviewId)){
            return NextResponse.json({
                message: "Review id should be an ObjectId",
            },{status: 400})
        }
        await connectToDatabase();

        const deletedReview = await Review.findByIdAndDelete(reviewId);

        if(!deletedReview) {
            return NextResponse.json({
                message: "Review not found",
            }, { status: 404 });
        }
        return NextResponse.json({
            message: "Review deleted successfully",
            review: deletedReview,
        },{status:200});
    } catch (err) {
        console.error("Error:", err);
        return NextResponse.json({
            message: "Internal server error",
        }, { status: 500 });
    }
}
