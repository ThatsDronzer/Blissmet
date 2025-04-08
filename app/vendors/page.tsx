"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Star, Heart, MapPin } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import ResponsiveImage from "@/app/components/ResponsiveImage"
import { useVendors } from "@/app/context/vendorsContext"

const eventTypes = [
  "Weddings",
  "Birthdays",
  "Corporate Events",
  "Concerts",
  "Exhibitions",
  "Conferences",
  "Galas",
  "Graduations",
]

export default function ExploreVendors() {
  const { vendors, loading, error, filters, setFilters, applyFilters } = useVendors()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Handle filter change with debugging
  const handleFilterChange = (key: string, value: any) => {
    console.log(`Setting filter ${key} to:`, value);
    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        [key]: value,
      };
      console.log("New filters state:", newFilters);
      return newFilters;
    });
    
    // Track active filters for UI feedback
    setActiveFilters(prev => {
      if (value === undefined || value === "" || value === false || 
          (Array.isArray(value) && value.length === 0) || 
          (key === "minRating" && value === 0) ||
          (key === "priceRange" && value[0] === 0 && value[1] === 5000)) {
        return prev.filter(f => f !== key);
      } else if (!prev.includes(key)) {
        return [...prev, key];
      }
      return prev;
    });
  }

  // Apply filters when user clicks the button
  const handleApplyFilters = () => {
    console.log("Applying filters:", filters);
    applyFilters();
  }
  
  // Reset all filters
  const handleResetFilters = () => {
    console.log("Resetting all filters");
    setFilters({
      location: "",
      selectedEventTypes: [],
      minRating: 0,
      priceRange: [0, 5000],
      date: undefined,
      showVerifiedOnly: false,
    });
    setActiveFilters([]);
    applyFilters(); // Apply the reset immediately
  }

  return (
    <div className="min-h-screen bg-background bg-gradient-to-br from-blue-100 via-white to-purple-100">
      

      <div className="container mx-auto px-4 py-[70px] flex flex-col lg:flex-row">
        {/* Sidebar Filters */}
        <aside className={`lg:w-1/4 lg:pr-8 mb-8 lg:mb-0 ${isFilterOpen ? "block" : "hidden lg:block"}`}>
          <div className="bg-card rounded-lg shadow-lg p-6 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Filters</h2>
              {activeFilters.length > 0 && (
                <button 
                  onClick={handleResetFilters}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Reset All
                </button>
              )}
            </div>
            
            <div className="space-y-6">
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Location
                  {activeFilters.includes('location') && (
                    <span className="ml-2 text-green-500 text-xs">●</span>
                  )}
                </label>
                <Input
                  type="text"
                  placeholder="Enter city or zip code"
                  value={filters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                />
              </div>
              
              {/* Event Type Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Event Type
                  {activeFilters.includes('selectedEventTypes') && (
                    <span className="ml-2 text-green-500 text-xs">●</span>
                  )}
                </label>
                <div className="space-y-2">
                  {eventTypes.map((type) => (
                    <div key={type} className="flex items-center">
                      <Checkbox
                        id={type}
                        checked={filters.selectedEventTypes.includes(type)}
                        onCheckedChange={(checked) => {
                          const newSelectedTypes = checked 
                            ? [...filters.selectedEventTypes, type] 
                            : filters.selectedEventTypes.filter((t) => t !== type);
                          
                          handleFilterChange("selectedEventTypes", newSelectedTypes);
                        }}
                      />
                      <label htmlFor={type} className="ml-2 text-sm">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Minimum Rating
                  {activeFilters.includes('minRating') && (
                    <span className="ml-2 text-green-500 text-xs">●</span>
                  )}
                </label>
                <Select 
                  value={filters.minRating.toString()} 
                  onValueChange={(value) => handleFilterChange("minRating", Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select minimum rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any Rating</SelectItem>
                    <SelectItem value="3">3+ Stars</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Price Range
                  {activeFilters.includes('priceRange') && (
                    <span className="ml-2 text-green-500 text-xs">●</span>
                  )}
                </label>
                <Slider 
                  min={0} 
                  max={5000} 
                  step={100} 
                  value={filters.priceRange} 
                  onValueChange={(value) => handleFilterChange("priceRange", value)} 
                />
                <div className="flex justify-between mt-2 text-sm">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
              
              {/* Date Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Availability Date
                  {activeFilters.includes('date') && (
                    <span className="ml-2 text-green-500 text-xs">●</span>
                  )}
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn("w-full justify-start text-left font-normal", !filters.date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.date ? format(filters.date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar 
                      mode="single" 
                      selected={filters.date} 
                      onSelect={(date) => handleFilterChange("date", date)} 
                      initialFocus 
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Verified Only Filter */}
              <div className="flex items-center">
                <Checkbox
                  id="verifiedOnly"
                  checked={filters.showVerifiedOnly}
                  onCheckedChange={(checked) => handleFilterChange("showVerifiedOnly", !!checked)}
                />
                <label htmlFor="verifiedOnly" className="ml-2 text-sm">
                  Show verified vendors only
                  {activeFilters.includes('showVerifiedOnly') && (
                    <span className="ml-2 text-green-500 text-xs">●</span>
                  )}
                </label>
              </div>
              
              {/* Apply Filters Button */}
              <Button 
                className="w-full bg-indigo-600 hover:bg-indigo-700" 
                onClick={handleApplyFilters}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <div>
              {/* <h2 className="text-2xl font-semibold">Explore Vendors</h2> */}
              {activeFilters.length > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  {activeFilters.length} {activeFilters.length === 1 ? 'filter' : 'filters'} applied
                </p>
              )}
            </div>
            <Button variant="outline" className="lg:hidden" onClick={() => setIsFilterOpen(!isFilterOpen)}>
              Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
            </Button>
          </div>
          
          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Loading vendors...</p>
            </div>
          )}
          
          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-8 text-red-500">
              <p>{error}</p>
            </div>
          )}
          
          {/* Vendor Grid */}
          {!loading && !error && vendors.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendors.map((vendor) => (
                <div
                  key={vendor.id || vendor._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
                >
                  {/* Vendor Image */}
                  <div className="relative">
                    <ResponsiveImage
                      src={'/event.jpg'}
                      alt={vendor.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                      <Heart className="h-5 w-5 text-gray-500 hover:text-red-500" />
                    </button>
                  </div>

                  {/* Vendor Details */}
                  <div className="p-6">
                    {/* Vendor Name */}
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{vendor.name}</h3>

                    {/* Vendor Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {vendor.description || 'No description available.'}
                    </p>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-gray-800">
                        ${vendor.price || 0}
                      </div>
                      <Link href={`/vendors/${vendor.id || vendor._id}`} passHref>
                        <Button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* No Results */}
          {!loading && !error && vendors.length === 0 && (
            <div className="text-center py-8">
              <p className="text-xl text-muted-foreground">No vendors found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={handleResetFilters}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}