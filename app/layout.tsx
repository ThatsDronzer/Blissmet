import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Button } from "@/components/ui/button"
import type React from "react"
import Link from "next/link"
import { VendorsProvider } from "@/app/context/vendorsContext"
import { AuthProvider } from "@/app/context/AuthContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EventPro - Find Your Perfect Event Vendors",
  description: "Discover and book top-rated event professionals for your special day",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <VendorsProvider>
            {children}
          </VendorsProvider>
          <Footer />
        </AuthProvider>
        {/* <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-between items-center">
          <Button className="bg-gold hover:bg-gold/90 text-white">Find a Vendor</Button>
          <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white">
            Become a Vendor
          </Button>
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border py-2 px-4 flex justify-between items-center">
          <Link href="/vendors" passHref>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Find a Vendor</Button>
          </Link>
          <Link href="/become-vendor" passHref>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Become a Vendor
            </Button>
          </Link>
        </div> */}
      </body>
    </html>
  )
}

