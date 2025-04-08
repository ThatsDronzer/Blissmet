"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProductDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${params.id}`);
        
        if (!res.ok) {
          if (res.status === 404) {
            router.push('/404');
            return;
          }
          throw new Error('Failed to fetch product');
        }
        
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Error loading product:', error);
        setError('Failed to load product details. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [params.id, router]);

  if (loading) {
    return <div className="mt-28 text-center">Loading product details...</div>;
  }

  if (error) {
    return <div className="mt-28 text-center text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="mt-28 text-center">Product not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-28 px-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/2">
            <img 
              className="h-96 w-full object-cover md:h-full" 
              src={product.image || 'https://via.placeholder.com/300'} 
              alt={product.name} 
            />
          </div>
          <div className="p-8 md:w-1/2">
            <Link 
              href="/products" 
              className="text-indigo-500 hover:text-indigo-600 text-sm font-medium mb-6 inline-block"
            >
              ← Back to Products
            </Link>
            
            <div className="flex justify-between items-start">
              <div>
                <h1 className="mt-4 text-3xl font-bold text-gray-900">{product.name}</h1>
                <p className="mt-2 text-gray-600">{product.vendor?.name || 'Unknown Vendor'}</p>
              </div>
              <p className="text-2xl font-bold text-green-600">₹{product.price}</p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900">Description</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                {product.description || 'No description available'}
              </p>
            </div>
            
            <div className="mt-10 flex space-x-4">
              <button 
                className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-md transition-colors font-medium"
              >
                Add to Cart
              </button>
              <button 
                className="border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-6 rounded-lg shadow-sm transition-colors font-medium"
              >
                Save for Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}