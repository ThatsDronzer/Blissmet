import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Product from '@/models/Product';

export async function GET(request: Request) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Get search parameters from the URL
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    // If an ID is provided, return that specific product
    if (id) {
      const product = await Product.findById(id).populate('vendor', 'name');
      
      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
      
      return NextResponse.json(product);
    }
    
    // Otherwise, return all products
    const products = await Product.find().populate('vendor', 'name');
    console.log(products);
    return NextResponse.json(products);
    
  } catch (error: any) {
    console.error('Database error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
