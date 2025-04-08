"use client";

import React from "react"
import DashboardLayout from "@/app/components/DashboardLayout"
import StatCard from "@/app/components/StatCard"
import { Calendar, DollarSign, Star, MessageSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/dashboard/vendor", icon: Calendar, label: "Dashboard" },
  { href: "/dashboard/vendor/listings", icon: Calendar, label: "Manage Listings" },
  { href: "/dashboard/vendor/bookings", icon: Calendar, label: "Bookings" },
  { href: "/dashboard/vendor/earnings", icon: DollarSign, label: "Earnings" },
  { href: "/dashboard/vendor/messages", icon: MessageSquare, label: "Messages" },
  { href: "/dashboard/vendor/reviews", icon: Star, label: "Reviews" },
  { href: "/dashboard/vendor/subscription", icon: Star, label: "Subscription" },
  { href: "/dashboard/vendor/support", icon: MessageSquare, label: "Support" },
]

export default function VendorDashboard() {
  return (
    <DashboardLayout navItems={navItems} userType="vendor">
      <h1 className="text-3xl font-bold mb-6">Welcome, Elegant Events!</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Upcoming Bookings" value={5} icon={Calendar} />
        <StatCard title="Total Earnings" value="$12,345" icon={DollarSign} />
        <StatCard title="Average Rating" value={4.8} icon={Star} />
        <StatCard title="Unread Messages" value={3} icon={MessageSquare} />
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Your latest event bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Wedding Planning</p>
                  <p className="text-sm text-muted-foreground">Scheduled for 20th Aug 2023</p>
                </div>
                <Button variant="outline">View Details</Button>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Corporate Event</p>
                  <p className="text-sm text-muted-foreground">Scheduled for 5th Sep 2023</p>
                </div>
                <Button variant="outline">View Details</Button>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
            <CardDescription>Latest feedback from your clients</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                </div>
                <p className="text-sm mt-1">"Excellent service! Made our wedding day perfect."</p>
                <p className="text-xs text-muted-foreground">- Sarah J., Wedding</p>
              </li>
              <li>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <Star className="h-5 w-5 text-gray-300 mr-1" />
                </div>
                <p className="text-sm mt-1">"Great organization for our company event."</p>
                <p className="text-xs text-muted-foreground">- John D., Corporate Event</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

