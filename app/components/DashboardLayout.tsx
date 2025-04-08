"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Header from "./Header";

interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
  userType: "customer" | "vendor" | "admin";
}

export default function  sDashboardLayout({ children, navItems, userType }: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header with higher z-index */}
      <Header />
      
      <div className="flex flex-1 flex-col md:flex-row pt-[80px]">
        {/* Sidebar navigation with lower z-index and limited height */}
        <aside className="bg-white shadow-sm md:w-64 md:fixed md:top-20 md:bottom-16 md:overflow-y-auto z-10">
          <div className="p-4">
            <h2 className="text-xl font-semibold capitalize mb-4">{userType} Dashboard</h2>
            <nav className="space-y-1">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={index} 
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                      isActive 
                        ? "bg-primary text-white" 
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon && <item.icon className="mr-3 h-5 w-5" />}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>
        
        {/* Main content area with appropriate margin and padding for footer */}
        <main className="flex-1 md:ml-64 pb-16">
          {children}
        </main>
      </div>
      
      {/* Simple footer placeholder - adjust as needed */}
      <footer className="bg-white shadow-md py-4 px-6 text-center text-sm text-gray-600 fixed bottom-0 w-full z-20">
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </footer>
    </div>
  );
}
