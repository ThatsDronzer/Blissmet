import type React from "react";
import { Search, MessageSquare, Calendar } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find the Best Vendors",
    description: "Search by category, budget, or location.",
  },
  {
    icon: MessageSquare,
    title: "Compare & Connect",
    description: "Read reviews, see pricing, and message vendors directly.",
  },
  {
    icon: Calendar,
    title: "Book & Celebrate",
    description: "Secure your vendor and plan the perfect event.",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-[40px] bg-gray-50">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center">
        {/* Left Section: Illustration */}
        <div className="lg:w-1/2 w-full mb-12 lg:mb-0">
          <div className="relative bg-purple-100 rounded-lg p-6 shadow-lg">
            {/* Icon */}
            <div className="absolute -top-6 -left-6 bg-purple-500 text-white rounded-full p-4 shadow-md">
              <Search className="w-8 h-8" />
            </div>

            {/* Task List */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h4 className="text-lg font-bold text-gray-800 mb-2">Tasks List</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                  <p className="text-sm text-gray-600">Find the Best Vendors</p>
                </li>
                <li className="flex items-center">
                  <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                  <p className="text-sm text-gray-600">Compare & Connect</p>
                </li>
                <li className="flex items-center">
                  <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                  <p className="text-sm text-gray-600">Book & Celebrate</p>
                </li>
              </ul>
            </div>

            {/* Graph */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h4 className="text-lg font-bold text-gray-800 mb-2">Progress</h4>
              <div className="h-2 bg-purple-200 rounded-full">
                <div className="h-2 bg-purple-500 rounded-full w-3/4"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Stats */}
        <div className="lg:w-1/2 w-full">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start">
                {/* Icon */}
                <div className="bg-purple-500 text-white rounded-full p-4 shadow-md mr-4">
                  <step.icon className="w-6 h-6" />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;