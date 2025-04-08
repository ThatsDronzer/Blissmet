"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="mt-28 text-center">Loading products...</div>;
  }

  if (error) {
    return <div className="mt-28 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="mt-28 flex flex-wrap justify-center gap-3">
      {products.length === 0 ? (
        <p className="text-center">No products found.</p>
      ) : (
        products.map((product: any) => (
          <div key={product._id} className="relative flex w-full sm:w-2/5 md:w-1/4 lg:w-1/5 xl:w-1/6 p-2">
            <div className="flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg w-full transition-all hover:shadow-2xl">
              <div className="border relative overflow-hidden rounded-t-xl h-40">
                <img 
                  src={product.image || 'https://via.placeholder.com/300'}
                  alt={product.name} 
                  className="object-cover w-full h-full transition-transform hover:scale-110"
                />
              </div>
              <div className="p-3">
                <h5 className="mb-1 block font-sans text-base font-semibold leading-snug tracking-normal text-gray-900 antialiased">
                  {product.name}
                </h5>
                <p className="block font-sans text-xs font-light leading-relaxed text-gray-600 antialiased">
                  {product.vendor?.name || 'Unknown Vendor'}
                </p>
              </div>
              <div className="p-3 pt-0 flex justify-between items-center">
                <span className="text-base font-medium text-green-600">₹{product.price}</span>
                <Link 
                  href={`/products/${product._id}`} 
                  className="select-none rounded-lg bg-indigo-500 py-1.5 px-3 text-center text-xs font-medium uppercase text-white shadow-md transition-all hover:shadow-lg hover:bg-indigo-600 focus:opacity-[0.85] active:opacity-[0.85]"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
