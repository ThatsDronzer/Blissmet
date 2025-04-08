import { connectToDatabase } from "@/lib/db";
import Subscription from "@/models/Subscription";
import { NextResponse, NextRequest } from "next/server";

// Get all subscriptions with pagination
export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);

        const skip = (page - 1) * limit;

        const subscriptions = await Subscription.find().skip(skip).limit(limit);
        const totalSubscriptions = await Subscription.countDocuments();

        return NextResponse.json({
            subscriptions,
            totalPages: Math.ceil(totalSubscriptions / limit),
            currentPage: page,
        });
    } catch (err) {
        console.error("Error:", err);
        return NextResponse.json({
            message: "Internal server error",
        }, { status: 500 });
    }
}

// Create a new subscription
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        await connectToDatabase();

        const newSubscription = new Subscription(body);
        const saved = await newSubscription.save();
        if(!saved){
            return NextResponse.json({
                message: "Something went wrong",
            }, { status: 400 });
        }
        return NextResponse.json({
            message: "Subscription created successfully",
            subscription: newSubscription,
        }, { status: 201 });
    } catch (err) {
        console.error("Error:", err);
        return NextResponse.json({
            message: "Internal server error",
        }, { status: 500 });
    }
}
