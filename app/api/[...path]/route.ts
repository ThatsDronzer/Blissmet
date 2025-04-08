import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    return handleUnknownMethod(req);
}

export async function POST(req: NextRequest) {
    return handleUnknownMethod(req);
}

export async function PUT(req: NextRequest) {
    return handleUnknownMethod(req);
}

export async function DELETE(req: NextRequest) {
    return handleUnknownMethod(req);
}

// Handle other HTTP methods (PATCH, OPTIONS, etc.)
export async function HEAD(req: NextRequest) {
    return handleUnknownMethod(req);
}

export async function OPTIONS(req: NextRequest) {
    return handleUnknownMethod(req);
}

// ✅ Common handler function for unknown routes
function handleUnknownMethod(req: NextRequest) {
    return NextResponse.json(
        {
            message: "API route not found",
            method: req.method,
            requestedPath: req.nextUrl.pathname,
        },
        { status: 404 }
    );
}
