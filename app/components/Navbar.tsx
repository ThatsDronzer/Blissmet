"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col space-y-4 mt-4">
                <Link href="#" className="text-gray-600 hover:text-gray-900 px-4 py-2">
                  Solutions
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900 px-4 py-2">
                  Pricing
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900 px-4 py-2">
                  Resources
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900 px-4 py-2">
                  Enterprise
                </Link>
                <div className="pt-4 border-t border-gray-200">
                  <Button className="w-full mb-2">Get Started</Button>
                  <Button variant="outline" className="w-full">
                    Sign in
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary/10 p-1 rounded">
              <div className="w-6 h-6 border-2 border-primary rounded" />
            </div>
            <span className="text-xl font-bold text-primary">EventAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-600 hover:text-gray-900">
                Solutions <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>AI Matching</DropdownMenuItem>
                <DropdownMenuItem>Virtual Venue Tours</DropdownMenuItem>
                <DropdownMenuItem>Smart Budgeting</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Resources
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Enterprise
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost">Sign in</Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

