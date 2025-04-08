"use client"

import React from "react"
import DashboardLayout from "@/app/components/DashboardLayout"
import { Calendar, MessageSquare, Star, MapPin, Heart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const navItems = [
  { href: "/dashboard/customer", icon: Heart, label: "Dashboard" },
  { href: "/dashboard/customer/bookings", icon: Calendar, label: "My Bookings" },
  { href: "/dashboard/customer/messages", icon: MessageSquare, label: "Messages" },
  { href: "/dashboard/customer/wishlist", icon: Star, label: "Wishlist" },
  { href: "/dashboard/customer/map", icon: MapPin, label: "Nearby Vendors" },
]

export default function CustomerMap() {
  return (
    <DashboardLayout navItems={navItems} userType="customer">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Nearby Vendors</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Find Local Vendors</CardTitle>
            <CardDescription>Discover event services in your area</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Map placeholder - would be replaced with actual map component */}
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Map view will be displayed here</p>
            </div>
            
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Vendors Near You</h3>
              <ul className="space-y-3">
                <li className="p-3 border rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium">Elegant Venues</p>
                    <p className="text-sm text-muted-foreground">3.2 miles away</p>
                  </div>
                  <MapPin className="h-5 w-5 text-primary" />
                </li>
                <li className="p-3 border rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium">Perfect Catering</p>
                    <p className="text-sm text-muted-foreground">1.5 miles away</p>
                  </div>
                  <MapPin className="h-5 w-5 text-primary" />
                </li>
                <li className="p-3 border rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium">Stunning Photography</p>
                    <p className="text-sm text-muted-foreground">4.7 miles away</p>
                  </div>
                  <MapPin className="h-5 w-5 text-primary" />
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
