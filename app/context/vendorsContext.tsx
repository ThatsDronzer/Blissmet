"use client"
import React, { createContext, useContext, useState, useEffect, useCallback } from "react"

interface Vendor {
  id: string
  _id?: string
  name: string
  category: string
  rating: number
  image: string
  price: number
  location: string
  isVerified: boolean
}

interface VendorFilters {
  location: string
  selectedEventTypes: string[]
  minRating: number
  priceRange: [number, number]
  date?: Date
  showVerifiedOnly: boolean
}

interface VendorsContextProps {
  vendors: Vendor[]
  loading: boolean
  error: string | null
  filters: VendorFilters
  setFilters: React.Dispatch<React.SetStateAction<VendorFilters>>
  applyFilters: () => void
}

// Default filters - empty to get all vendors initially
const defaultFilters: VendorFilters = {
  location: "",
  selectedEventTypes: [],
  minRating: 0,
  priceRange: [0, 5000],
  date: undefined,
  showVerifiedOnly: false,
}

const VendorsContext = createContext<VendorsContextProps | undefined>(undefined)

export const VendorsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<VendorFilters>(defaultFilters)
  
  // Function to fetch vendors with filters
  const fetchVendors = useCallback(async (appliedFilters: VendorFilters) => {
    setLoading(true)
    try {
      console.log("Fetching vendors with filters:", appliedFilters);
      
      // Build query parameters - only include non-empty filters
      const params = new URLSearchParams()
      
      if (appliedFilters.location && appliedFilters.location.trim() !== '') {
        params.append('location', appliedFilters.location.trim())
      }
      
      if (appliedFilters.selectedEventTypes && appliedFilters.selectedEventTypes.length > 0) {
        params.append('category', JSON.stringify(appliedFilters.selectedEventTypes))
      }
      
      if (appliedFilters.minRating > 0) {
        params.append('minRating', appliedFilters.minRating.toString())
      }
      
      // Only include price range if it's different from the default
      if (appliedFilters.priceRange[0] > 0) {
        params.append('minPrice', appliedFilters.priceRange[0].toString())
      }
      
      if (appliedFilters.priceRange[1] < 5000) {
        params.append('maxPrice', appliedFilters.priceRange[1].toString())
      }
      
      if (appliedFilters.date) {
        params.append('date', appliedFilters.date.toISOString().split('T')[0])
      }
      
      if (appliedFilters.showVerifiedOnly) {
        params.append('verifiedOnly', 'true')
      }
      
      const queryString = params.toString()
      const url = `/api/vendors${queryString ? `?${queryString}` : ''}`
      
      console.log("Fetching from URL:", url);
      
      const response = await fetch(url)
      const result = await response.json()
      
      console.log("API Response:", result);
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch vendors')
      }
      
      if (!result.vendors || !Array.isArray(result.vendors)) {
        console.error("Invalid response format:", result);
        throw new Error('Invalid response format from API');
      }
      
      // Process vendors to ensure consistent ID field
      const processedVendors = result.vendors.map((vendor: any) => ({
        ...vendor,
        id: vendor._id || vendor.id, // Ensure id is available no matter what format backend returns
        // Provide defaults for missing fields
        name: vendor.name || 'Unnamed Vendor',
        category: vendor.category || 'Other',
        rating: vendor.rating || 0,
        price: vendor.price || 0,
        location: vendor.location || 'Unknown',
        image: vendor.image || 'https://via.placeholder.com/400x300',
        isVerified: !!vendor.isVerified
      }));
      
      setVendors(processedVendors)
      setError(null)
    } catch (err: any) {
      console.error("Error fetching vendors:", err);
      setError(err.message || "Failed to fetch vendors")
      setVendors([])
    } finally {
      setLoading(false)
    }
  }, []);
  
  // Apply filters function
  const applyFilters = useCallback(() => {
    console.log("Applying filters...", filters);
    fetchVendors(filters);
  }, [fetchVendors, filters]);
  
  // Initial vendor fetch with no filters to get all vendors
  useEffect(() => {
    console.log("Initial vendor fetch with default filters");
    fetchVendors(defaultFilters);
  }, [fetchVendors]);

  return (
    <VendorsContext.Provider value={{ vendors, loading, error, filters, setFilters, applyFilters }}>
      {children}
    </VendorsContext.Provider>
  )
}

export const useVendors = () => {
  const context = useContext(VendorsContext)
  if (context === undefined) {
    throw new Error("useVendors must be used within a VendorsProvider")
  }
  return context
}