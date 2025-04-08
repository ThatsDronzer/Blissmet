import { Shield, Calendar, Gift, PenToolIcon as Tool } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Curated Top Vendors",
    description: "Verified event planners, caterers, decorators, and photographers.",
  },
  {
    icon: Calendar,
    title: "Seamless Booking",
    description: "Browse, compare, and book effortlessly.",
  },
  {
    icon: Gift,
    title: "Exclusive Discounts",
    description: "Special vendor offers and cashback deals.",
  },
  {
    icon: Tool,
    title: "Event Planning Tools",
    description: "Budget calculators, reminders, and checklists.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-16">
          Why Choose Us?
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              {/* Number */}
              <div
                className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white flex items-center justify-center text-lg font-bold shadow-md`}
              >
                {`0${index + 1}`}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <feature.icon className="h-8 w-8 text-yellow-600" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

