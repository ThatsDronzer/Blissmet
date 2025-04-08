"use client"

import React, { useEffect, useState } from "react"
import DashboardLayout from "@/app/components/DashboardLayout"
import { Calendar, MessageSquare, Star, MapPin, Heart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import axios from "axios"

const navItems = [
  { href: "/dashboard/customer", icon: Heart, label: "Dashboard" },
  { href: "/dashboard/customer/bookings", icon: Calendar, label: "My Bookings" },
  { href: "/dashboard/customer/messages", icon: MessageSquare, label: "Messages" },
  { href: "/dashboard/customer/wishlist", icon: Star, label: "Wishlist" },
  { href: "/dashboard/customer/map", icon: MapPin, label: "Nearby Vendors" },
]

export default function CustomerWishlist() {
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
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout navItems={navItems} userType="customer">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Saved Vendors</CardTitle>
            <CardDescription>Vendors you're interested in working with</CardDescription>
          </CardHeader>
          <CardContent>
            {userData?.wishlist?.length ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {userData.wishlist.map((vendor, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="h-48 bg-gray-200"></div>
                    <CardContent className="p-4">
                      <h3 className="font-bold">{vendor.name}</h3>
                      <p className="text-sm text-muted-foreground">{vendor.category}</p>
                      <p className="text-sm mt-2">{vendor.description}</p>
                      <div className="flex justify-between mt-4">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button size="sm">Contact</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p>You haven't saved any vendors to your wishlist yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
