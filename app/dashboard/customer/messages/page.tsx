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

export default function CustomerMessages() {
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
        <h1 className="text-3xl font-bold mb-6">Messages</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Conversations</CardTitle>
            <CardDescription>Stay in touch with your vendors</CardDescription>
          </CardHeader>
          <CardContent>
            {userData?.messages?.length ? (
              <ul className="space-y-4">
                {userData.messages.map((message, index) => (
                  <li key={index} className="p-4 border rounded-lg">
                    <p className="font-medium">From: {message.sender}</p>
                    <p className="text-sm text-muted-foreground">Subject: {message.subject}</p>
                    <p className="mt-2">{message.content}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(message.timestamp).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>You don't have any messages yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
