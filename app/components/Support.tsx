import type React from "react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqItems = [
  {
    question: "How do I book a vendor?",
    answer:
      "To book a vendor, simply search for the type of vendor you need, compare options, and click 'Book Now' on the vendor's profile. Follow the prompts to complete your booking.",
  },
  {
    question: "What if I need to cancel or reschedule?",
    answer:
      "Each vendor has their own cancellation and rescheduling policy. Please check the vendor's profile or your booking confirmation for specific details. If you need further assistance, please contact our support team.",
  },
  {
    question: "How do I leave a review for a vendor?",
    answer:
      "After your event, you'll receive an email invitation to leave a review. You can also go to the vendor's profile and click on the 'Leave a Review' button.",
  },
  // Add more FAQ items as needed
]

const Support: React.FC = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Need Help?</h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible>
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-12 text-center">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-3">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Support

