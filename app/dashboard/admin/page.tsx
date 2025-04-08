"use client";

import React from "react"
import DashboardLayout from "@/app/components/DashboardLayout"
import StatCard from "@/app/components/StatCard"
import { Users, DollarSign, AlertCircle, Settings } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/dashboard/admin", icon: Users, label: "Dashboard" },
  { href: "/dashboard/admin/users", icon: Users, label: "User Management" },
  { href: "/dashboard/admin/transactions", icon: DollarSign, label: "Transactions" },
  { href: "/dashboard/admin/support", icon: AlertCircle, label: "Support Tickets" },
  { href: "/dashboard/admin/content", icon: Settings, label: "Content Management" },
  { href: "/dashboard/admin/settings", icon: Settings, label: "Platform Settings" },
]

export default function AdminDashboard() {
  return (
    <DashboardLayout navItems={navItems} userType="admin">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value={10234} icon={Users} />
        <StatCard title="Total Revenue" value="$543,210" icon={DollarSign} />
        <StatCard title="Active Vendors" value={523} icon={Users} />
        <StatCard title="Pending Tickets" value={15} icon={AlertCircle} />
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Signups</CardTitle>
            <CardDescription>New users in the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-muted-foreground">Customer - Joined 2 days ago</p>
                </div>
                <Button variant="outline">View Profile</Button>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Elegant Events</p>
                  <p className="text-sm text-muted-foreground">Vendor - Joined 5 days ago</p>
                </div>
                <Button variant="outline">View Profile</Button>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Support Tickets</CardTitle>
            <CardDescription>Recent unresolved issues</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Payment Issue</p>
                  <p className="text-sm text-muted-foreground">Reported by user ID: 12345</p>
                </div>
                <Button variant="outline">View Ticket</Button>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Vendor Dispute</p>
                  <p className="text-sm text-muted-foreground">Between user ID: 67890 and vendor ID: 54321</p>
                </div>
                <Button variant="outline">View Ticket</Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

