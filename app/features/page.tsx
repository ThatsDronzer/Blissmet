import type { Metadata } from "next"
import Image from "next/image"
import { Users, Calendar, Star, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "Our Key Features",
  description: "Discover the key features that make EventPro the best choice for event planning.",
}

const features = [
  {
    icon: Users,
    title: "Diverse Vendor Network",
    description:
      "Connect with a wide range of professional event vendors, from caterers to photographers, all in one place.",
  },
  {
    icon: Calendar,
    title: "Easy Scheduling",
    description:
      "Our intuitive scheduling system makes it simple to coordinate with vendors and manage your event timeline.",
  },
  {
    icon: Star,
    title: "Verified Reviews",
    description: "Make informed decisions with authentic customer feedback and ratings for each vendor.",
  },
  {
    icon: TrendingUp,
    title: "Trend Insights",
    description: "Stay updated with the latest event planning trends and get inspiration for your next event.",
  },
]

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Why Choose EventPro</h1>

      {features.map((feature, index) => (
        <div
          key={feature.title}
          className={`flex flex-col md:flex-row items-center gap-8 mb-16 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
        >
          <div className="w-full md:w-1/2">
            <feature.icon className="w-16 h-16 text-primary mb-4" />
            <h2 className="text-2xl font-semibold mb-4">{feature.title}</h2>
            <p className="text-gray-600">{feature.description}</p>
          </div>
          <div className="w-full md:w-1/2">
            <Image
              src={`/placeholder.svg?height=300&width=400&text=${feature.title}`}
              alt={feature.title}
              width={400}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

