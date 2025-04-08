import React from "react";
import { Search, MessageSquare, Calendar, Truck, Smile } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search for Vendors",
    description: "Easily search for vendors by category, budget, or location to find the perfect match for your event.",
  },
  {
    icon: MessageSquare,
    title: "Compare & Connect",
    description: "View vendor profiles, read reviews, and directly message vendors to discuss your requirements.",
  },
  {
    icon: Calendar,
    title: "Book Your Vendor",
    description: "Secure your vendor by booking them for your event date and finalize the details.",
  },
  {
    icon: Truck,
    title: "We Manage the Rush",
    description: "Let us handle the logistics and coordination to ensure everything runs smoothly on the big day.",
  },
  {
    icon: Smile,
    title: "Enjoy Your Event",
    description: "Relax and enjoy your event while we ensure everything is executed perfectly.",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-6">How It Works</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover how we make event planning stress-free by connecting you with the best vendors and managing the details.
          </p>
        </div>

        {/* Steps Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white rounded-lg shadow-lg p-8 transition-transform transform hover:scale-105"
            >
              {/* Icon */}
              <div className="w-20 h-20 flex items-center justify-center bg-purple-500 text-white rounded-full shadow-md mb-6">
                <step.icon className="w-10 h-10" />
              </div>

              {/* Step Number */}
              <span className="text-4xl font-bold text-purple-500 mb-4">{index + 1}</span>

              {/* Title */}
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{step.title}</h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Ready to Plan Your Event?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of happy customers who have successfully planned their events with us.
          </p>
          <a
            href="/vendors"
            className="bg-purple-500 text-white px-10 py-4 rounded-full shadow-lg hover:bg-purple-600 transition-transform transform hover:scale-105"
          >
            Explore Vendors
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;