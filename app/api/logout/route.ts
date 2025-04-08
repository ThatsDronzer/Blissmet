import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const response = NextResponse.json(
      {
        message: "Logged out successfully",
      },
      { status: 200 }
    )

    // Remove the token from cookies
    response.cookies.set("token", "", {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    })

    return response
  } catch (error) {
    console.error("Error during logout:", error)
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    )
  }
}
