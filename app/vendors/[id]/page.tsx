import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Star, MapPin, Heart, Share2 } from "lucide-react"
import ResponsiveImage from "@/app/components/ResponsiveImage"

export async function generateMetadata({ params }) {
  return {
    title: `Vendor: ${params.id}`,
  }
}

export default async function VendorDetails({ params }: { params: { id: string } }) {
  // Define default Indian vendor data
  const defaultIndianVendor = {
    name: "Sharma & Sons Wedding Creations",
    category: "Traditional Wedding Planner & Decorator",
    location: "Delhi, NCR Region & Pan India",
    description: "With over 20 years of experience, Sharma & Sons brings the magic of traditional Indian weddings with modern elegance. Our expert team specializes in elaborate decorations for all ceremonies from Haldi and Mehndi to Sangeet and Reception, incorporating regional customs from across India. We pride ourselves on creating unforgettable celebrations that honor your family traditions while adding contemporary touches.",
    rating: 4.9,
    reviewCount: 342,
    price: 125000,
    services: [
      { name: "Complete Wedding Package", price: 350000, description: "End-to-end planning and execution of all ceremonies with premium decor, catering coordination, and guest management", duration: "3-5 days" },
      { name: "Haldi & Mehndi Ceremony Setup", price: 75000, description: "Vibrant decor with marigold flowers, traditional seating, mehndi artists, and cultural entertainment arrangements", duration: "Full day" },
      { name: "Sangeet Night Arrangement", price: 95000, description: "Elegant stage setup, professional sound system, dance floor, themed decorations and performance coordination", duration: "Evening event" },
      { name: "Traditional Mandap Design", price: 125000, description: "Customized wedding mandap with floral arrangements, kaliras, traditional hangings and ceremonial elements based on regional traditions", duration: "Wedding day" },
      { name: "Reception Celebration", price: 145000, description: "Grand reception hall decoration with contemporary themes, royal entrance setup, stage backdrops and ambient lighting", duration: "Evening event" },
      { name: "Destination Wedding Planning", price: 450000, description: "Complete planning for destinations like Udaipur, Jaipur, Goa, Kerala or international locations with venue selection and logistics", duration: "4-7 days" }
    ],
    images: ["/indian-wedding-1.jpg", "/mandap-decor.jpg", "/mehndi-setup.jpg", "/reception-decor.jpg", "/haldi-ceremony.jpg"],
    faqs: [
      { question: "Do you handle different regional wedding traditions?", answer: "Yes, we specialize in various regional wedding styles including North Indian, South Indian, Bengali, Marwari, Gujarati, and Punjabi traditions. Our team includes experts from different cultural backgrounds to ensure authentic ceremonial arrangements." },
      { question: "Can you accommodate destination weddings?", answer: "Absolutely! We organize destination weddings across India in popular locations like Udaipur, Jaipur, Goa, Kerala backwaters, and international destinations. We handle all arrangements including venue selection, guest accommodation, and local vendor coordination." },
      { question: "Do you provide services for specific ceremonies only?", answer: "Yes, you can book us for individual ceremonies like Haldi, Mehndi, Sangeet, or Reception. Each package can be customized according to your preferences and budget." },
      { question: "What kind of décor styles do you offer?", answer: "We offer traditional themes like Royal Rajasthani, South Indian Temple, Punjabi Vibrance, as well as fusion themes like Indo-Western, Bohemian Indian, and Contemporary Minimalist designs." },
      { question: "Do you provide catering services?", answer: "We partner with premium caterers specializing in various cuisines including North Indian, South Indian, Mughlai, Rajasthani, Gujarati, Bengali, and international options. We can arrange for food tastings before finalizing." }
    ],
    reviews: [
      { id: 1, author: "Priya & Arjun Malhotra", rating: 5, comment: "Sharma ji and team created magic for our 3-day wedding celebration. The mandap decoration with traditional elements from both our Punjabi and Tamil backgrounds was absolutely breathtaking. Guests couldn't stop talking about the attention to detail!" },
      { id: 2, author: "Vikram & Meera Patel", rating: 5, comment: "Our destination wedding in Udaipur was handled flawlessly. From the lakeside mehndi ceremony to the palace reception, every event had its unique charm while maintaining our Gujarati traditions." },
      { id: 3, author: "Neha & Rahul Singhania", rating: 4, comment: "The team managed our last-minute changes with such grace. The sangeet night arrangement with the traditional folk dancers alongside our choreographed performances created the perfect blend of old and new." }
    ]
  };

  let vendor;
  
  try {
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const host = process.env.VERCEL_URL || 'localhost:3000';
    
    const response = await fetch(`${protocol}://${host}/api/vendors/${params.id}`, {
      next: { revalidate: 300 }
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch vendor");
    }
    
    const data = await response.json();
    // Use the API data or fallback to default data
    vendor = data.vendor || defaultIndianVendor;
  } catch (error) {
    console.error("Error fetching vendor:", error);
    // Use default data if API call fails
    vendor = defaultIndianVendor;
  }

  if (!vendor) {
    vendor = defaultIndianVendor;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[450px]">
        <ResponsiveImage
          src={"/decoration.jpg"}
          alt={vendor.name}
          width={1200}
          height={600}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30">
          <div className="container mx-auto h-full px-4">
            <div className="flex flex-col h-full justify-end pb-12">
              <div className="flex items-center text-white/70 mb-4">
                <a href="/" className="hover:text-white transition-colors">Home</a>
                <span className="mx-2">›</span>
                <a href="/vendors" className="hover:text-white transition-colors">Indian Vendors</a>
                <span className="mx-2">›</span>
                <span className="text-white">{vendor.name}</span>
              </div>
              <h1 className="text-5xl font-bold mb-3 text-white">{vendor.name}</h1>
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <p className="text-xl text-white/90">{vendor.category}</p>
                <div className="flex items-center bg-black/30 px-3 py-1 rounded-full">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" fill="currentColor" />
                  <span className="text-white">
                    {vendor.rating?.toFixed(1)} <span className="text-white/70">({vendor.reviewCount} reviews)</span>
                  </span>
                </div>
                <div className="flex items-center bg-black/30 px-3 py-1 rounded-full">
                  <MapPin className="h-4 w-4 text-white/70 mr-1" />
                  <span className="text-white/90">{vendor.location}</span>
                </div>
              </div>
              <div className="flex gap-3 mt-2">
                <Button className="bg-primary hover:bg-primary/90 transition-colors">
                  Book Now
                </Button>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors">
                  <Heart className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="lg:w-2/3">
            <div className="bg-card rounded-xl shadow-sm overflow-hidden mb-8">
              <Tabs defaultValue="about" className="w-full">
                <div className="px-6 pt-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="services">Services</TabsTrigger>
                    <TabsTrigger value="faqs">FAQs</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                </div>
                <div className="p-6">
                  <TabsContent value="about">
                    <h2 className="text-2xl font-semibold mb-4">About {vendor.name}</h2>
                    <p className="mb-4">{vendor.description}</p>
                    <div className="flex items-center mb-4">
                      <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                      <span>{vendor.location}</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {vendor.images?.map((image, index) => (
                        <ResponsiveImage
                          key={index}
                          src={image}
                          alt={`${vendor.name} image ${index + 1}`}
                          width={200}
                          height={150}
                          className="rounded-lg"
                        />
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="services">
                    <h2 className="text-2xl font-semibold mb-4">Services & Pricing</h2>
                    
                    {/* Service Categories */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                      <Button variant="outline" className="rounded-full" size="sm">All Services</Button>
                      <Button variant="outline" className="rounded-full" size="sm">Decoration</Button>
                      <Button variant="outline" className="rounded-full" size="sm">Planning</Button>
                      <Button variant="outline" className="rounded-full" size="sm">Catering</Button>
                      <Button variant="outline" className="rounded-full" size="sm">Photography</Button>
                    </div>
                    
                    {Array.isArray(vendor.services) ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {vendor.services.map((service, index) => (
                          <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold">{service.name}</h3>
                              <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm font-medium">
                                ₹{service.price.toLocaleString('en-IN')}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {service.description || `Professional ${service.name.toLowerCase()} services tailored to your specific wedding needs and preferences.`}
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-muted-foreground">
                                <span className="inline-flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                  </svg>
                                  {service.duration || "8-10 hours"}
                                </span>
                              </span>
                              <Button size="sm" variant="outline">Book Now</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="border rounded-lg p-6 text-center">
                        <span className="text-muted-foreground">No services information available</span>
                      </div>
                    )}
                    
                    {/* Popular Packages Section */}
                    <div className="mt-8">
                      <h3 className="text-xl font-medium mb-4 flex items-center">
                        <span className="bg-yellow-100 text-yellow-800 p-1 rounded-md mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        </span>
                        Popular Packages
                      </h3>
                      <div className="bg-gradient-to-r from-primary/5 to-primary/10 border rounded-lg p-4">
                        <h4 className="font-semibold text-lg mb-2">Complete Wedding Package</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          All-inclusive wedding planning and decoration package with premium services.
                        </p>
                        <ul className="space-y-2 mb-4">
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>Complete decoration for all ceremonies</span>
                          </li>
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>Premium photography and videography</span>
                          </li>
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>Full event coordination and management</span>
                          </li>
                        </ul>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold">₹350,000</span>
                          <Button>Get Quote</Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="faqs">
                    <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
                    
                    {/* FAQ Search & Categories */}
                    <div className="relative mb-6">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                      </div>
                      <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5" placeholder="Search FAQs..." />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium text-lg mb-2 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          Booking & Payments
                        </h3>
                        <p className="text-sm text-muted-foreground">Common questions about booking process and payment options</p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium text-lg mb-2 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Services & Packages
                        </h3>
                        <p className="text-sm text-muted-foreground">Questions about our service offerings and customization options</p>
                      </div>
                    </div>
                    
                    <Accordion type="single" collapsible className="w-full">
                      {vendor.faqs?.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border px-4 rounded-lg mb-2 data-[state=open]:bg-accent/30">
                          <AccordionTrigger className="text-left font-medium py-4">
                            <div className="flex items-start">
                              <span className="text-primary mr-3 text-xl font-semibold">Q:</span>
                              {faq.question}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-8 pb-4">
                            <div className="flex items-start">
                              <span className="text-primary mr-3 text-xl font-semibold">A:</span>
                              <p>{faq.answer}</p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                    
                    <div className="mt-6 bg-accent/20 rounded-lg p-4 flex items-center justify-between">
                      <p className="text-sm">Can't find the answer you're looking for?</p>
                      <Button variant="outline" size="sm">Contact Us</Button>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </main>
          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="bg-card rounded-xl shadow-sm p-6 sticky top-24 border border-border/30">
              <h2 className="text-2xl font-semibold mb-4">Book {vendor.name}</h2>
              <p className="mb-4">Starting at ₹{vendor.price.toLocaleString('en-IN')}</p>
              <Button className="w-full mb-4">Send Inquiry</Button>
              <Button variant="outline" className="w-full mb-4">
                Book Now
              </Button>
              <div className="flex justify-between">
                <Button variant="ghost" className="flex items-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Save
                </Button>
                <Button variant="ghost" className="flex items-center">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

