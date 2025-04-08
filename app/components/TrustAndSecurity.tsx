import type React from "react"
import Image from "next/image"
import { Shield, CreditCard, Award } from "lucide-react"

const TrustAndSecurity: React.FC = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Trust & Security</h2>
        <div className="flex flex-wrap justify-center items-center mb-12">
          <Image
            src="/placeholder.svg?height=40&width=120&text=Forbes"
            alt="Forbes"
            width={120}
            height={40}
            className="m-4"
          />
          <Image
            src="/placeholder.svg?height=40&width=120&text=Eventbrite"
            alt="Eventbrite"
            width={120}
            height={40}
            className="m-4"
          />
          <Image
            src="/placeholder.svg?height=40&width=120&text=WeddingWire"
            alt="WeddingWire"
            width={120}
            height={40}
            className="m-4"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <Shield className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p className="text-muted-foreground">Your transactions are protected with industry-standard encryption.</p>
          </div>
          <div className="text-center">
            <CreditCard className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Refund Protection</h3>
            <p className="text-muted-foreground">Our refund policy ensures you're covered in case of cancellations.</p>
          </div>
          <div className="text-center">
            <Award className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Vendor Verification</h3>
            <p className="text-muted-foreground">All vendors are thoroughly vetted to ensure quality service.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustAndSecurity

