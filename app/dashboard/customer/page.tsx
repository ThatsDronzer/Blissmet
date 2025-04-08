"use client"

import React, { useEffect, useState } from "react"
import DashboardLayout from "@/app/components/DashboardLayout"
import StatCard from "@/app/components/StatCard"
import { Calendar, MessageSquare, Star, MapPin, Heart, DollarSign, Settings, Search, Filter, Bell, Clock, CheckCircle, AlertCircle, XCircle, ChevronRight, Plus, Bookmark, ExternalLink, Download, Zap, Gift, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import axios from "axios"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const navItems = [
  { href: "/dashboard/customer", icon: Heart, label: "Dashboard" },
  { href: "/dashboard/customer/bookings", icon: Calendar, label: "My Bookings" },
  { href: "/dashboard/customer/messages", icon: MessageSquare, label: "Messages" },
  { href: "/dashboard/customer/wishlist", icon: Star, label: "Wishlist" },
  { href: "/dashboard/customer/map", icon: MapPin, label: "Nearby Vendors" },
]

// Status badge colors
const getStatusColor = (status) => {
  switch(status?.toLowerCase()) {
    case 'confirmed': return 'bg-[#4CAF50] text-white';
    case 'pending': return 'bg-[#FF9800] text-white';
    case 'cancelled': return 'bg-[#F44336] text-white';
    default: return 'bg-slate-200';
  }
};

// Sample data for demo purposes
const sampleVendors = [
  { id: 1, name: "Taj Banquet Hall", category: "Venue", location: "South Delhi", price: "₹₹₹", rating: 4.8, image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=200" },
  { id: 2, name: "Spice Route Caterers", category: "Caterer", location: "Gurgaon", price: "₹₹", rating: 4.7, image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=200" },
  { id: 3, name: "Memorable Moments Photography", category: "Photographer", location: "Noida", price: "₹₹₹", rating: 4.9, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=200" },
];

const sampleMessages = [
  { id: 1, sender: "Taj Banquet Hall", message: "Namaste! We have availability for your sangeet ceremony on the requested date.", time: "10:30 AM", unread: true },
  { id: 2, sender: "Spice Route Caterers", message: "We've sent the updated menu options with vegetarian and non-vegetarian choices as requested.", time: "Yesterday", unread: false },
];

const sampleReviews = [
  { id: 1, vendor: "Royal Decorators", event: "Wedding", date: "Oct 15, 2023", rating: null },
  { id: 2, vendor: "Dhol Baaje Entertainment", event: "Sangeet Night", date: "Nov 5, 2023", rating: null },
];

const samplePayments = [
  { id: 1, vendor: "Taj Banquet Hall", amount: "₹1,85,000", status: "Paid", date: "Oct 1, 2023" },
  { id: 2, vendor: "Spice Route Caterers", amount: "₹75,000", status: "Pending", date: "Nov 15, 2023" },
];

export default function CustomerDashboard() {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const uid = localStorage.getItem("uid")
        if (!uid) {
          router.push('/login')
          return
        }
        const response = await axios.get(`/api/users/getuserbyid/${uid}`)
        setUserData(response.data)
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchUserData()
  }, [router])

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-[#5A189A]/30 mb-4"></div>
          <div className="h-4 w-32 bg-[#5A189A]/30 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <DashboardLayout navItems={navItems} userType="customer">
      {/* Custom CSS Variables for theme */}
      <style jsx global>{`
        :root {
          --color-primary: #5A189A;
          --color-primary-light: #9D4EDD;
          --color-secondary: #FEC260;
          --color-background: #F7F7FA;
          --color-text: #333333;
          --color-text-muted: #777777;
          --color-success: #4CAF50;
          --color-warning: #FF9800;
          --color-error: #F44336;
        }
      `}</style>
      
      <div className="p-4 md:p-6 bg-[#F7F7FA]">
        {/* Welcome Section with Quick Task Summary */}
        <div className="mb-8 bg-gradient-to-r from-[#5A189A] to-[#9D4EDD] text-white p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Welcome, {userData?.name || 'Event Planner'}! 👋</h1>
              <p className="mt-1 text-white/80">Plan your perfect events effortlessly</p>
              
              <div className="mt-4 flex gap-3">
                <Button className="bg-white text-[#5A189A] hover:bg-[#FEC260] hover:text-white transition-all">
                  <Plus className="mr-2 h-4 w-4" /> Create New Event
                </Button>
                <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/20">
                  <Search className="mr-2 h-4 w-4" /> Find Vendors
                </Button>
              </div>
            </div>
            
            <div className="hidden md:block bg-white/10 backdrop-blur-sm p-3 rounded-lg">
              <h3 className="font-medium text-white flex items-center">
                <Clock className="h-4 w-4 mr-2" /> Pending Tasks
              </h3>
              <ul className="mt-2 text-sm">
                {userData?.tasks?.slice(0, 3).map((task, i) => (
                  <li key={i} className="flex items-center gap-2 mt-1">
                    <span className="h-2 w-2 rounded-full bg-[#FEC260]"></span>
                    <span>{task.title}</span>
                  </li>
                )) || 
                <>
                  <li className="flex items-center gap-2 mt-1">
                    <span className="h-2 w-2 rounded-full bg-[#FEC260]"></span>
                    <span>Confirm flower arrangements</span>
                  </li>
                  <li className="flex items-center gap-2 mt-1">
                    <span className="h-2 w-2 rounded-full bg-[#FEC260]"></span>
                    <span>Review catering menu options</span>
                  </li>
                </>
                }
              </ul>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-4">
          <StatCard 
            title="Upcoming Events" 
            value={userData?.events?.length || 2} 
            icon={Calendar} 
            trend="+1 this week"
            className="bg-white shadow-sm hover:shadow-md transition-shadow"
          />
          <StatCard 
            title="Unread Messages" 
            value={userData?.unreadMessages || 3} 
            icon={MessageSquare} 
            trend="2 new today"
            className="bg-white shadow-sm hover:shadow-md transition-shadow"
          />
          <StatCard 
            title="Saved Vendors" 
            value={userData?.wishlist?.length || 5} 
            icon={Heart} 
            trend=""
            className="bg-white shadow-sm hover:shadow-md transition-shadow"
          />
          <StatCard 
            title="Pending Payments" 
            value={userData?.pendingPayments || 1} 
            icon={DollarSign} 
            trend="₹75,000"
            className="bg-white shadow-sm hover:shadow-md transition-shadow"
          />
        </div>

        {/* Main Dashboard Sections */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - My Events + Payments */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Events Section */}
            <Card className="shadow-sm hover:shadow-md transition-all border-0">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-[#333333]">My Events</CardTitle>
                  <CardDescription>Plan and track your special occasions</CardDescription>
                </div>
                <Button className="bg-[#5A189A] hover:bg-[#9D4EDD]">
                  <Plus className="mr-2 h-4 w-4" /> Create Event
                </Button>
              </CardHeader>
              <CardContent>
                {userData?.events?.length || true ? (
                  <div className="space-y-4">
                    {/* Event Card */}
                    <div className="border rounded-xl p-4 bg-white shadow-sm hover:shadow transition-all">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-[#333333]">Sharma-Patel Wedding</h3>
                          <div className="flex items-center gap-2 text-sm text-[#777777] mt-1">
                            <Calendar className="h-4 w-4" /> June 15, 2024
                            <span className="h-1 w-1 rounded-full bg-[#777777]"></span>
                            <MapPin className="h-4 w-4" /> Taj Banquet Hall
                          </div>
                        </div>
                        <Badge className="bg-[#5A189A]">15 days left</Badge>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-[#777777] mb-1">
                          <span>Planning progress</span>
                          <span>75%</span>
                        </div>
                        <Progress value={75} className="h-2 bg-gray-100" indicatorClassName="bg-gradient-to-r from-[#5A189A] to-[#9D4EDD]" />
                      </div>
                      
                      <div className="mt-4 flex gap-2">
                        <Link href="/dashboard/customer/events/1">
                          <Button variant="outline" size="sm" className="text-[#5A189A] border-[#5A189A] hover:bg-[#5A189A] hover:text-white">
                            View Details
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="text-[#777777]">
                          <DollarSign className="h-4 w-4 mr-1" /> Budget
                        </Button>
                        <Button variant="outline" size="sm" className="text-[#777777]">
                          <Users className="h-4 w-4 mr-1" /> Guest List
                        </Button>
                      </div>
                    </div>
                    
                    {/* Event Card 2 */}
                    <div className="border rounded-xl p-4 bg-white shadow-sm hover:shadow transition-all">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-[#333333]">Annual Diwali Celebration</h3>
                          <div className="flex items-center gap-2 text-sm text-[#777777] mt-1">
                            <Calendar className="h-4 w-4" /> October 31, 2024
                            <span className="h-1 w-1 rounded-full bg-[#777777]"></span>
                            <MapPin className="h-4 w-4" /> ITC Grand Bharat
                          </div>
                        </div>
                        <Badge className="bg-[#FEC260] text-[#333333]">71 days left</Badge>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-[#777777] mb-1">
                          <span>Planning progress</span>
                          <span>40%</span>
                        </div>
                        <Progress value={40} className="h-2 bg-gray-100" indicatorClassName="bg-gradient-to-r from-[#5A189A] to-[#9D4EDD]" />
                      </div>
                      
                      <div className="mt-4 flex gap-2">
                        <Link href="/dashboard/customer/events/2">
                          <Button variant="outline" size="sm" className="text-[#5A189A] border-[#5A189A] hover:bg-[#5A189A] hover:text-white">
                            View Details
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="text-[#777777]">
                          <DollarSign className="h-4 w-4 mr-1" /> Budget
                        </Button>
                        <Button variant="outline" size="sm" className="text-[#777777]">
                          <Users className="h-4 w-4 mr-1" /> Guest List
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F7F7FA] mb-4">
                      <Calendar className="h-8 w-8 text-[#777777]" />
                    </div>
                    <h3 className="text-lg font-medium text-[#333333]">No events planned yet</h3>
                    <p className="text-[#777777] mt-1">Start planning your special occasion!</p>
                    <Button className="mt-4 bg-[#5A189A] hover:bg-[#9D4EDD]">
                      <Plus className="mr-2 h-4 w-4" /> Create Your First Event
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter className="text-sm text-[#777777] border-t pt-4">
                <Link href="/dashboard/customer/events" className="flex items-center hover:text-[#5A189A] transition-colors">
                  View all events <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>

            {/* Payment & Invoices Section */}
            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle className="text-xl text-[#333333]">Payments & Invoices</CardTitle>
                <CardDescription>Track your vendor payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {samplePayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-[#F7F7FA] flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-[#5A189A]" />
                        </div>
                        <div>
                          <div className="font-medium">{payment.vendor}</div>
                          <div className="text-sm text-[#777777]">{payment.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-medium">{payment.amount}</div>
                          <Badge className={payment.status === "Paid" ? "bg-[#4CAF50]" : "bg-[#FF9800]"}>
                            {payment.status}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#777777]">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between pt-3 border-t">
                  <div>
                    <div className="text-sm text-[#777777]">Total Paid</div>
                    <div className="font-semibold text-lg">₹1,85,000</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#777777]">Pending</div>
                    <div className="font-semibold text-lg text-[#FF9800]">₹75,000</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#777777]">Total Budget</div>
                    <div className="font-semibold text-lg">₹7,50,000</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add Payment Method
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Right Column - Vendors, Messages, Reviews */}
          <div className="space-y-6">
            {/* Vendor Discovery Panel */}
            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle className="text-xl text-[#333333]">Find Vendors</CardTitle>
                <CardDescription>Discover perfect partners for your event</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <div className="flex-1">
                    <Input placeholder="Search vendors..." className="w-full" />
                  </div>
                  <Button variant="outline" className="shrink-0">
                    <Filter className="h-4 w-4 mr-2" /> Filters
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {sampleVendors.map((vendor) => (
                    <div key={vendor.id} className="group rounded-xl border hover:border-[#5A189A] overflow-hidden transition-all">
                      <div className="flex">
                        <div className="w-20 h-20 bg-gray-100 overflow-hidden">
                          <img 
                            src={vendor.image} 
                            alt={vendor.name}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="p-3 flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-[#333333]">{vendor.name}</h3>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 fill-[#FEC260] text-[#FEC260]" />
                              <span className="text-sm ml-1">{vendor.rating}</span>
                            </div>
                          </div>
                          <div className="text-xs text-[#777777] mt-1 flex items-center">
                            <Badge className="bg-[#F7F7FA] text-[#777777] mr-2">{vendor.category}</Badge>
                            <MapPin className="h-3 w-3 mr-1" /> {vendor.location}
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-xs font-medium">{vendor.price}</span>
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                                <Heart className="h-4 w-4 text-[#777777] hover:text-[#F44336]" />
                              </Button>
                              <Button size="sm" className="h-7 text-xs bg-[#5A189A] hover:bg-[#9D4EDD]">
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="text-sm border-t pt-4">
                <Link href="/vendors" className="flex items-center hover:text-[#5A189A] transition-colors">
                  Browse all vendors <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>

            {/* Messages Preview */}
            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle className="text-xl text-[#333333]">Recent Messages</CardTitle>
                <CardDescription>Stay in touch with your vendors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {sampleMessages.map((message) => (
                    <div key={message.id} className={`p-3 rounded-lg border ${message.unread ? 'bg-[#F7F7FA] border-[#5A189A]/20' : 'bg-white'}`}>
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-[#5A189A] text-white">
                              {message.sender.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-medium text-[#333333]">{message.sender}</h4>
                              {message.unread && (
                                <Badge className="ml-2 bg-[#5A189A]">New</Badge>
                              )}
                            </div>
                            <p className="text-sm text-[#777777] line-clamp-1">{message.message}</p>
                          </div>
                        </div>
                        <span className="text-xs text-[#777777]">{message.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="text-sm border-t pt-4">
                <Link href="/dashboard/customer/messages" className="flex items-center hover:text-[#5A189A] transition-colors">
                  View all messages <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>

            {/* Reviews Section */}
            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle className="text-xl text-[#333333]">Pending Reviews</CardTitle>
                <CardDescription>Share your experience with vendors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sampleReviews.map((review) => (
                    <div key={review.id} className="p-3 rounded-lg border">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-[#333333]">{review.vendor}</h4>
                          <p className="text-sm text-[#777777]">{review.event} • {review.date}</p>
                        </div>
                        <Button size="sm" className="bg-[#5A189A] hover:bg-[#9D4EDD]">
                          <Star className="h-4 w-4 mr-1" /> Rate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tools & Inspiration Section */}
            <Card className="shadow-sm border-0 bg-gradient-to-br from-[#F7F7FA] to-white">
              <CardHeader>
                <CardTitle className="text-xl text-[#333333]">Tools & Inspiration</CardTitle>
                <CardDescription>Resources to make your event special</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="flex-col h-auto py-4 border-[#5A189A]/20 hover:border-[#5A189A] hover:bg-[#5A189A]/5">
                    <DollarSign className="h-5 w-5 mb-1 text-[#5A189A]" />
                    <span>Budget Calculator</span>
                  </Button>
                  <Button variant="outline" className="flex-col h-auto py-4 border-[#5A189A]/20 hover:border-[#5A189A] hover:bg-[#5A189A]/5">
                    <ExternalLink className="h-5 w-5 mb-1 text-[#5A189A]" />
                    <span>Indian Wedding Ideas</span>
                  </Button>
                  <Button variant="outline" className="flex-col h-auto py-4 border-[#5A189A]/20 hover:border-[#5A189A] hover:bg-[#5A189A]/5">
                    <Gift className="h-5 w-5 mb-1 text-[#5A189A]" />
                    <span>Share & Get ₹1000</span>
                  </Button>
                  <Button variant="outline" className="flex-col h-auto py-4 border-[#5A189A]/20 hover:border-[#5A189A] hover:bg-[#5A189A]/5">
                    <Zap className="h-5 w-5 mb-1 text-[#5A189A]" />
                    <span>Festival Season Tips</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

