"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TicketingSystem() {
  const [tickets, setTickets] = useState([
    { id: 1, title: "Booking Issue", description: "I'm having trouble booking a vendor", status: "Open" },
    { id: 2, title: "Vendor Inquiry", description: "I need more information about a vendor", status: "Closed" },
  ])

  const [newTicket, setNewTicket] = useState({ title: "", description: "", status: "Open" })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewTicket((prev) => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (value: string) => {
    setNewTicket((prev) => ({ ...prev, status: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTickets((prev) => [...prev, { ...newTicket, id: prev.length + 1 }])
    setNewTicket({ title: "", description: "", status: "Open" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Support Tickets</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="space-y-4">
          <div>
            <Input
              name="title"
              placeholder="Ticket Title"
              value={newTicket.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Textarea
              name="description"
              placeholder="Describe your issue"
              value={newTicket.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Select onValueChange={handleStatusChange} value={newTicket.status}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Create Ticket</Button>
        </div>
      </form>
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="p-4 border rounded">
            <h3 className="text-lg font-semibold">{ticket.title}</h3>
            <p className="text-gray-600">{ticket.description}</p>
            <p className="mt-2">Status: {ticket.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

