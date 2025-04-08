import { Users, Calendar, Star, TrendingUp } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Diverse Vendor Network",
    description: "Connect with a wide range of professional event vendors",
  },
  {
    icon: Calendar,
    title: "Easy Scheduling",
    description: "Effortlessly coordinate and schedule with your chosen vendors",
  },
  {
    icon: Star,
    title: "Verified Reviews",
    description: "Make informed decisions with authentic customer feedback",
  },
  {
    icon: TrendingUp,
    title: "Trend Insights",
    description: "Stay updated with the latest event planning trends",
  },
]

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

