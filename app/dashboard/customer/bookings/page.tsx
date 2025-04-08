"use client"

import React, { useEffect, useState } from "react"
import DashboardLayout from "@/app/components/DashboardLayout"
import { Calendar, MessageSquare, Star, MapPin, Heart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import axios from "axios"

const navItems = [
  { href: "/dashboard/customer", icon: Heart, label: "Dashboard" },
  { href: "/dashboard/customer/bookings", icon: Calendar, label: "My Bookings" },
  { href: "/dashboard/customer/messages", icon: MessageSquare, label: "Messages" },
  { href: "/dashboard/customer/wishlist", icon: Star, label: "Wishlist" },
  { href: "/dashboard/customer/map", icon: MapPin, label: "Nearby Vendors" },
]

export default function CustomerBookings() {
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
        <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
            <CardDescription>Manage your vendor engagements</CardDescription>
          </CardHeader>
          <CardContent>
            {userData?.bookings?.length ? (
              <ul className="space-y-4">
                {userData.bookings.map((booking, index) => (
                  <li key={index} className="p-4 border rounded-lg">
                    <p className="font-medium">{booking.vendorName}</p>
                    <p className="text-sm text-muted-foreground">Status: {booking.status}</p>
                    <p className="text-sm text-muted-foreground">Date: {booking.date}</p>
                    <p className="text-sm text-muted-foreground">Service: {booking.service}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>You don't have any bookings yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
