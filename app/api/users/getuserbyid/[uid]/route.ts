import { connectToDatabase } from "@/lib/db"
import User from "@/models/Users"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest,{params}: {params: {uid: string}}) {
  try {
    const uid  = params.uid
    await connectToDatabase()
    console.log("uid", uid)
    const user = await User.findOne({ uid })
    // .populate("bookings").populate("messages")
    console.log("user", user)
    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      )
    }

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    console.error("Error fetching user data:", error)
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    )
  }
}