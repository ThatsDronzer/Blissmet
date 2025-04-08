"use client";
import Link from "next/link";
import { Camera, Music, Utensils, Flower, Disc, Home, Cake, Car } from "lucide-react";

const categories = [
  { name: "Photographers", icon: Camera, bgColor: "bg-blue-100" },
  { name: "Musicians", icon: Music, bgColor: "bg-yellow-100" },
  { name: "Caterers", icon: Utensils, bgColor: "bg-green-100" },
  { name: "Florists", icon: Flower, bgColor: "bg-pink-100" },
  { name: "DJs", icon: Disc, bgColor: "bg-purple-100" },
  { name: "Venues", icon: Home, bgColor: "bg-orange-100" },
  { name: "Cake Designers", icon: Cake, bgColor: "bg-teal-100" },
  { name: "Transportation", icon: Car, bgColor: "bg-red-100" },
];

export default function CategorySection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/vendors?category=${category.name.toLowerCase()}`}
              className="flex flex-row items-center bg-gray-100 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Icon Section */}
              <div
                className={`w-1/3 h-full flex items-center justify-center ${category.bgColor}`}
              >
                <category.icon className="h-12 w-12 text-gray-700" />
              </div>

              {/* Text Section */}
              <div className="w-2/3 p-4">
                <p className="text-xs text-gray-500 mb-1 uppercase">New Arrival</p>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{category.name}</h3>
                <p className="text-sm text-primary font-medium hover:underline">
                  Discover Now
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}