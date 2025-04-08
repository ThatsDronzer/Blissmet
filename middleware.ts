import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET || "your_jwt_secret")

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  console.log("Token:", token)
 
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    const uid = payload.uid

    const response = NextResponse.next()
    response.headers.set("x-uid", uid)

    return response
  } catch (error) {
    console.error("JWT verification error:", error)
    return NextResponse.redirect(new URL("/login", req.url))
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
}