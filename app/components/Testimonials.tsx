"use client";

import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Bride",
    image: "/placeholder.svg?height=100&width=100",
    quote: "EventPro made planning my wedding a breeze. I found the perfect vendors all in one place!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Corporate Event Planner",
    image: "/placeholder.svg?height=100&width=100",
    quote: "As a professional event planner, I rely on EventPro for all my vendor needs. It's a game-changer!",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Birthday Party Host",
    image: "/placeholder.svg?height=100&width=100",
    quote: "I planned an amazing birthday party thanks to EventPro. The vendors were top-notch!",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
            >
              {/* Profile Image */}
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={80}
                height={80}
                className="rounded-full mb-4"
              />

              {/* Name and Role */}
              <h3 className="text-lg font-bold text-gray-800">{testimonial.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{testimonial.role}</p>

              {/* Quote */}
              <p className="text-sm text-gray-600 italic mb-4">"{testimonial.quote}"</p>

              {/* Rating */}
              <div className="flex items-center justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

