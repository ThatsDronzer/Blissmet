import { connectToDatabase } from "@/lib/db"
import { NextResponse, NextRequest } from "next/server"
import Vendor from "@/models/Vendor"
import { hashPassword } from "@/lib/auth";

export async function GET(req: NextRequest){
    try{
        // Debug the request
        const { searchParams } = new URL(req.url);
        console.log("Received vendor request with params:", Object.fromEntries(searchParams.entries()));
        
        // Connect to database first to make sure we have a connection
        await connectToDatabase();
        
        const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
        const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '100', 10)));
        
        // Extract filter parameters with validation
        const location = searchParams.get('location') || '';
        let category = searchParams.get('category') || '';
        const minRating = parseFloat(searchParams.get('minRating') || '0');
        const minPrice = parseFloat(searchParams.get('minPrice') || '0');
        const maxPrice = parseFloat(searchParams.get('maxPrice') || '999999');
        const verifiedOnly = searchParams.get('verifiedOnly') === 'true';
        const date = searchParams.get('date');
        
        console.log("Processing filters:", { 
            location, category, minRating, minPrice, maxPrice, verifiedOnly, date 
        });
        
        // Build query object with type safety
        const query: Record<string, any> = {};
        
        // Only add filters if they have values
        if (location && location.trim()) {
            query.location = { $regex: location.trim(), $options: 'i' };
            console.log("Added location filter:", query.location);
        }
        
        if (category && category.trim()) {
            try {
                // For category, we need to handle JSON array
                if (category.startsWith('[') && category.endsWith(']')) {
                    const parsedCategories = JSON.parse(category);
                    if (Array.isArray(parsedCategories) && parsedCategories.length > 0) {
                        // Using $in operator for array of categories
                        query.category = { $in: parsedCategories.filter(c => typeof c === 'string') };
                        console.log("Added category filter (multiple):", query.category);
                    }
                } else {
                    // Single category
                    query.category = category.trim();
                    console.log("Added category filter (single):", query.category);
                }
            } catch (e) {
                console.error("Error parsing category:", e);
                // Fallback to direct string match
                if (category.trim()) {
                    query.category = category.trim();
                    console.log("Added category filter (fallback):", query.category);
                }
            }
        }
        
        if (!isNaN(minRating) && minRating > 0) {
            query.rating = { $gte: minRating };
            console.log("Added rating filter:", query.rating);
        }
        
        // Price range filter
        if (!isNaN(minPrice) && minPrice > 0 || !isNaN(maxPrice) && maxPrice < 999999) {
            query.price = {};
            if (!isNaN(minPrice) && minPrice > 0) {
                query.price.$gte = minPrice;
            }
            if (!isNaN(maxPrice) && maxPrice < 999999) {
                query.price.$lte = maxPrice;
            }
            console.log("Added price filter:", query.price);
        }
        
        if (verifiedOnly) {
            query.isVerified = true;
            console.log("Added verified filter:", query.isVerified);
        }
        
        if (date) {
            try {
                const parsedDate = new Date(date);
                if (!isNaN(parsedDate.getTime())) {
                    // Check for availability field in schema
                    query.availability = true; // Simplified - adjust based on your schema
                    console.log("Added date filter for:", parsedDate);
                }
            } catch (error) {
                console.error("Invalid date format:", date);
            }
        }
        
        console.log("Final query:", JSON.stringify(query));
        
        try {
            // Check fields in the first vendor to see what's available
            const sampleVendor = await Vendor.findOne().lean();
            if (sampleVendor) {
                console.log("Sample vendor fields:", Object.keys(sampleVendor));
                
                // Check for field existence
                for (const key of Object.keys(query)) {
                    if (key !== 'availability' && !(key in sampleVendor)) {
                        console.warn(`WARNING: Query field "${key}" doesn't exist in vendor schema`);
                    }
                }
            }
            
            // Execute query with pagination
            const skip = (page - 1) * limit;
            const vendors = await Vendor.find(query).skip(skip).limit(limit).lean();
            const totalVendors = await Vendor.countDocuments(query);
            
            console.log(`Query returned ${vendors.length} vendors out of ${totalVendors} total matches`);
            
            return NextResponse.json({
                total_pages: Math.ceil(totalVendors / limit),
                current_page: page,
                total_results: totalVendors,
                vendors,
                filters_applied: Object.keys(query).length > 0 ? query : "none",
            }, {status: 200});
            
        } catch (dbError) {
            console.error("Database query error:", dbError);
            return NextResponse.json({
                message: "Error processing database query",
                error: (dbError as Error).message
            }, {status: 500});
        }
    } catch(error){
        console.error("General error:", error);
        return NextResponse.json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error" 
        }, {status: 500});
    }
}

export async function POST(req: NextRequest){
    try{
        await connectToDatabase();
        
        // Parse request body safely
        let vendor;
        try {
            vendor = await req.json();
        } catch (parseError) {
            return NextResponse.json({
                message: "Invalid JSON payload",
                error: (parseError as Error).message
            }, {status: 400});
        }
        
        // Validate required fields
        if (!vendor || !vendor.name || !vendor.email || !vendor.password) {
            return NextResponse.json({
                message: "Missing required fields: name, email, and password are required",
            }, {status: 400});
        }
        
        // Check if vendor with same email already exists
        const existingVendor = await Vendor.findOne({ email: vendor.email });
        if (existingVendor) {
            return NextResponse.json({
                message: "A vendor with this email already exists",
            }, {status: 409}); // 409 Conflict
        }
        
        const hashedPassword = await hashPassword(vendor.password);
        
        // Create new vendor with validation
        const newVendor = new Vendor({
            name: vendor.name,
            email: vendor.email,
            phone: vendor.phone || "",
            password: hashedPassword,
            // Set defaults for required fields if not provided
            category: vendor.category || "Other",
            rating: vendor.rating || 0,
            price: vendor.price || 0,
            location: vendor.location || "Unknown"
        });
        
        const saved = await newVendor.save();
        
        return NextResponse.json({
            message: "New vendor created successfully",
            vendor: {
                id: saved._id,
                name: saved.name,
                email: saved.email,
                // Don't include sensitive fields like password
            }
        }, {status: 201}); // 201 Created
    } catch(error){
        console.error("Error creating vendor:", error);
        
        // Handle mongoose validation errors
        if (error instanceof Error && 'name' in error && error.name === 'ValidationError') {
            return NextResponse.json({
                message: "Validation error",
                error: error.message
            }, {status: 400});
        }
        
        return NextResponse.json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error"
        }, {status: 500});
    }
}