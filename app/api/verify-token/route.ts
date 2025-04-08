import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET || "your-secret-key"

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          isValid: false,
          message: "No token provided",
        },
        { status: 401 }
      )
    }

    const token = authHeader.split(" ")[1]

    try {
      jwt.verify(token, SECRET_KEY)
      return NextResponse.json(
        {
          isValid: true,
          message: "Token is valid",
        },
        { status: 200 }
      )
    } catch (error) {
      return NextResponse.json(
        {
          isValid: false,
          message: "Invalid token",
        },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error("Error verifying token:", error)
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    )
  }
}
