import { connectToDatabase } from "@/lib/db"
import User from "@/models/Users"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    await connectToDatabase()

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        {
          exists: true,
          message: "User already exists",
        },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        {
          exists: false,
          message: "User does not exist",
        },
        { status: 200 }
      )
    }
  } catch (error) {
    console.error("Error checking user existence:", error)
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    )
  }
}