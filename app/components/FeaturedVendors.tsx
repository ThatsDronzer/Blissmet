"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  {
    name: "DJ Services",
    description: "Professional DJs to make your event lively and memorable.",
    image: "/dj.jpg", // Replace with the actual image path
  },
  {
    name: "Photography Experts",
    description: "Capture your special moments with our expert photographers.",
    image: "/photography.jpg", // Replace with the actual image path
  },
];

export default function FeaturedVendors() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Adjust scroll amount as needed
      const newScrollPosition =
        direction === "left"
          ? Math.max(scrollPosition - scrollAmount, 0)
          : Math.min(
              scrollPosition + scrollAmount,
              scrollContainerRef.current.scrollWidth -
                scrollContainerRef.current.clientWidth
            );

      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });

      setScrollPosition(newScrollPosition);
    }
  };

  const isAtStart = scrollPosition === 0;
  const isAtEnd =
    scrollContainerRef.current &&
    scrollPosition >=
      scrollContainerRef.current.scrollWidth -
        scrollContainerRef.current.clientWidth;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Featured Vendors
        </h2>
        <div className="relative">
          {/* Left Arrow */}
          {!isAtStart && (
            <button
              onClick={() => handleScroll("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 z-10"
            >
              <ChevronLeft className="h-6 w-6 text-gray-800" />
            </button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto overflow-hidden scroll-smooth scrollbar-hide"
          >
            {popularVendors.map((vendor, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Vendor Image */}
                <img
                  src={vendor.image}
                  alt={vendor.name}
                  className="w-full h-48 object-cover"
                />

                {/* Vendor Details */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {vendor.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {vendor.description}
                  </p>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          {!isAtEnd && (
            <button
              onClick={() => handleScroll("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 z-10"
            >
              <ChevronRight className="h-6 w-6 text-gray-800" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

