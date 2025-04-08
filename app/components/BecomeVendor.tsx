import type React from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

const BecomeVendor: React.FC = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Become a Vendor</h2>
          <p className="text-xl mb-8">
            Join our platform to showcase your services, increase bookings, and connect with premium clients.
          </p>
          <Button className="bg-background hover:bg-background/90 text-foreground text-lg px-8 py-3">
            Join as a Vendor
          </Button>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4">Increased Visibility</h3>
              <p>Reach a wider audience of potential clients looking for your services.</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4">Easy Booking Management</h3>
              <p>Streamline your booking process and manage client interactions efficiently.</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4">Grow Your Business</h3>
              <p>Access tools and insights to help you expand your event services business.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BecomeVendor

