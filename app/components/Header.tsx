"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Calendar, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/app/context/AuthContext";

export default function Header() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const categories = [
    { name: "Weddings", image: "/wedding_r.png" },
    { name: "Birthdays", image: "/cake_r.png" },
    { name: "Corporate Events", image: "/corp_r.png" },
    { name: "Photographer", image: "/camera.jpg" },
    { name: "DJ", image: "/speaker.jpg" },
    { name: "Florist", image: "/flower.jpg" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verifyToken(token).then((isValid) => {
        if (isValid) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("token");
        }
      });
    }
  }, [setIsLoggedIn]);

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch("/api/verify-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data.isValid;
    } catch (error) {
      console.error("Failed to verify token", error);
      return false;
    }
  };

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    localStorage.removeItem("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 shadow-lg rounded-full z-50 w-[90%] max-w-6xl">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-2">
          <Calendar className="h-8 w-8 text-white" />
          <span className="text-xl font-bold text-white">Blissmet</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6 relative">
          <Link
            href="/vendors"
            className="text-white hover:text-gray-200 transition-all"
          >
            Explore Vendors
          </Link>
          <Link
            href="/how-it-works"
            className="text-white hover:text-gray-200 transition-all"
          >
            How It Works
          </Link>
          <Link
            href="/about"
            className="text-white hover:text-gray-200 transition-all"
          >
            About Us
          </Link>

          {/* Categories Dropdown */}
          <div className="relative group">
            <button className="flex items-center text-white hover:text-gray-200 transition-all">
              Categories
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="absolute left-[-20px] top-[25px] hidden group-hover:flex flex-wrap bg-white rounded-lg shadow-lg p-4 w-64 z-50 group-hover:block">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={`/vendors`}
                  className="w-1/2 p-2 flex flex-col items-center text-center hover:bg-gray-100 rounded-lg transition-all"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-16 h-16 object-cover rounded-full mb-2"
                  />
                  <span className="text-sm text-gray-800">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <Button
              variant="outline"
              className="md:inline-flex px-4 py-2 rounded-full border-white text-back hover:bg-white hover:text-gray-800"
              onClick={handleLogout}
            >
              <User className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex px-4 py-2 rounded-full border-gray-300 text-gray-800 hover:bg-gray-100 hover:text-gray-900"
                >
                  <User className="mr-2 h-4 w-4 text-gray-800" />
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="px-6 py-2 bg-white text-indigo-500 rounded-full shadow-md hover:bg-gray-100 transition-all">
                  Become a Vendor
                </Button>
              </Link>
            </>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="md:hidden">
                <Menu className="h-6 w-6 text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/vendors">Explore Vendors</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/how-it-works">How It Works</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/about">About Us</Link>
              </DropdownMenuItem>
              {isLoggedIn ? (
                <DropdownMenuItem asChild>
                  <Button variant="ghost" onClick={handleLogout}>
                    Log Out
                  </Button>
                </DropdownMenuItem>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login">Log In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/signup">Sign Up</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

