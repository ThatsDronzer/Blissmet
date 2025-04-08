import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectToDatabase } from "@/lib/db"
import User from "@/models/Users"

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || "your_jwt_secret"
export const config = {
  runtime: "nodejs", // Specify the Node.js runtime
}
export async function POST(req: NextRequest) {
  try {
    const { email, uid } = await req.json()
    await connectToDatabase()

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      )
    }

    // Generate JWT token
    const token = jwt.sign({ uid, email }, JWT_SECRET, { expiresIn: "1h" })

    const response = NextResponse.json(
      {
        token,
      },
      { status: 200 }
    )

    // Set the token in HTTP-only cookies
    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Error during login:", error)
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    )
  }
}