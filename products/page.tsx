import React from 'react';

// Static data for products and vendors
const products = [
	{
		_id: '1',
		name: 'Product 1',
		price: 1000,
		vendor: { name: 'Vendor 1' }
	},
	{
		_id: '2',
		name: 'Product 2',
		price: 2000,
		vendor: { name: 'Vendor 2' }
	},
	{
		_id: '3',
		name: 'Product 3',
		price: 3000,
		vendor: { name: 'Vendor 3' }
	}
];

export default function ProductsPage() {
	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Products</h1>
			<ul className="space-y-4">
				{products.map((product) => (
					<li key={product._id} className="bg-white shadow rounded p-4 flex items-center justify-between">
						<div>
							<h2 className="text-xl font-semibold">{product.name}</h2>
							<p className="text-gray-600">{product.vendor.name}</p>
						</div>
						<span className="text-lg font-medium text-green-600">₹{product.price}</span>
					</li>
				))}
			</ul>
		</div>
	);
}
