"use client"

import { useState } from "react"
import Link from "next/link"
import { AuthForm } from "@/app/components/AuthForm"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"

export default function SignUpPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={`min-h-screen flex ${isDarkMode ? "dark" : ""}`}>
      <div className="flex-1 hidden  relative">
        {/* <img
          src="/placeholder.svg?height=1080&width=1920&text=Event+Image"
          alt="Event"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40" /> */}
      </div>
      <div className="flex-1 flex flex-col justify-center items-center p-8  pt-24 bg-background dark:bg-gray-900">
        <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="text-center">
            {/* <Link href="/">
              <img src="/placeholder.svg?height=100&width=100&text=Logo" alt="Logo" className="mx-auto h-12 w-auto" />
            </Link> */}
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">Create your account</h2>
          </div>
          <AuthForm mode="signup" />
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:text-primary/80">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <motion.button
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800"
        onClick={toggleDarkMode}
        whileTap={{ scale: 0.95 }}
      >
        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </motion.button>
    </div>
  )
}

