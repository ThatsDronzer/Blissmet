import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about EventPro and our mission.",
}

export default function AboutUsSection() {
  return (
    <section className="py-24 bg-gray-50 bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">About Us</h1>
            <h2 className="text-xl text-purple-600 font-medium mb-6">
              Simplifying Event Planning, One Step at a Time
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              At EventPro, we are passionate about connecting event planners with top-quality vendors to create
              unforgettable experiences. Our mission is to simplify the event planning process by offering a seamless
              platform that ensures every detail is handled with care and precision.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              With a commitment to quality, innovation, and customer satisfaction, we strive to be the trusted partner
              for all your event planning needs. Whether it's a wedding, corporate event, or private celebration, we
              make your vision a reality.
            </p>
            <a
              href="/about"
              className="inline-block bg-purple-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-600 transition"
            >
              Learn More
            </a>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <img
              src="/team.jpg"
              alt="Team working together"
              className="rounded-lg shadow-lg w-full max-w-md lg:max-w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

