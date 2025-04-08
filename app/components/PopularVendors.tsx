"use client";

const popularVendors = [
  {
    name: "Elegant Events",
    description: "Top-notch event planners for weddings, birthdays, and corporate events.",
    image: "/event.jpg", // Replace with the actual image path
  },
  {
    name: "Gourmet Catering",
    description: "Delicious catering services for all types of celebrations.",
    image: "/catering.jpg", // Replace with the actual image path
  },
  {
    name: "Bloom Florists",
    description: "Beautiful floral arrangements to make your event unforgettable.",
    image: "/flowers.jpg", // Replace with the actual image path
  },
];

export default function PopularVendors() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Most Popular</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {popularVendors.map((vendor, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Vendor Image */}
              <img
                src={vendor.image}
                alt={vendor.name}
                className="w-full h-48 object-cover"
              />

              {/* Vendor Details */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-lg font-bold text-white">{vendor.name}</h3>
                <p className="text-sm text-gray-300">{vendor.description}</p>
              </div>

              {/* Bookmark Icon */}
              <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-800"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 3v18l7-5 7 5V3H5z"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}