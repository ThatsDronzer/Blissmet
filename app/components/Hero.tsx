"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Search } from "lucide-react";

const processCards = [
  {
    id: 1,
    title: "Search Vendors",
    description: "Find the best vendors for your event.",
    icon: "🔍",
    bgColor: "bg-blue-100",
  },
  {
    id: 2,
    title: "Compare & Book",
    description: "Compare vendors and book instantly.",
    icon: "📋",
    bgColor: "bg-yellow-100",
  },
  {
    id: 3,
    title: "Enjoy Your Event",
    description: "Relax and enjoy your perfectly planned event.",
    icon: "🎉",
    bgColor: "bg-green-100",
  },
];

const suggestions = [
  { id: 1, name: "The Gourmet Kitchen", category: "Catering" },
  { id: 2, name: "Elegant Events", category: "Event Planning" },
  { id: 3, name: "Party Rentals Co.", category: "Rentals" },
];

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const suggestionBoxRef = useRef(null);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      setFilteredSuggestions(
        suggestions.filter((s) =>
          s.name.toLowerCase().includes(query.toLowerCase())
        )
      );
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name);
    setShowSuggestions(false);
  };

  const handleClickOutside = (event) => {
    if (
      suggestionBoxRef.current &&
      !suggestionBoxRef.current.contains(event.target)
    ) {
      setShowSuggestions(false);
    }
  };

  const detectUserLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsDetectingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        // Reverse geocoding to get location name
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await response.json();
          setLocationName(data.city || data.locality || "Current Location");
        } catch (error) {
          console.error("Error fetching location name:", error);
          setLocationName("Current Location");
        }

        setIsDetectingLocation(false);
      },
      (error) => {
        setIsDetectingLocation(false);
        alert(`Failed to get your location: ${error.message}`);
      }
    );
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-purple-100 pt-16 overflow-hidden">
      {/* Background Detailing */}
      <div className="absolute inset-0">
        {/* Left Wavy Background */}
        <svg
          className="absolute left-0 top-0 h-full w-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 1440"
          fill="none"
        >
          <path
            fillOpacity="0.1"
            d="M64,0L85.3,48C107,96,149,192,165.3,288C181,384,171,480,165.3,576C160,672,160,768,154.7,864C149,960,139,1056,138.7,1152C139,1248,149,1344,154.7,1392L160,1440L0,1440L0,1392C0,1344,0,1248,0,1152C0,1056,0,960,0,864C0,768,0,672,0,576C0,480,0,384,0,288C0,192,0,96,0,48L0,0Z"
            fill="#000"
          />
        </svg>

        {/* Right Wavy Background */}
        <svg
          className="absolute right-0 top-0 h-full w-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 1440"
          fill="none"
        >
          <path
            fillOpacity="0.1"
            d="M256,0L234.7,48C213,96,171,192,154.7,288C139,384,149,480,154.7,576C160,672,160,768,165.3,864C171,960,181,1056,181.3,1152C181,1248,171,1344,165.3,1392L160,1440L320,1440L320,1392C320,1344,320,1248,320,1152C320,1056,320,960,320,864C320,768,320,672,320,576C320,480,320,384,320,288C320,192,320,96,320,48L320,0Z"
            fill="#000"
          />
        </svg>
      </div>

      {/* Heading */}
      <h1 className="relative z-10 text-4xl md:text-6xl font-extrabold text-gray-800 text-center leading-tight mb-4">
        Find the Best Vendors <br /> for Your All Events
      </h1>

      {/* Subheading */}
      <p className="relative z-10 text-lg md:text-xl text-gray-600 text-center mb-8">
        Search from 10,000+ verified vendors for weddings, birthdays, and corporate events.
      </p>

      {/* Man Image */}
      <div className="absolute top-20 right-60 transform translate-x-1/2 ">
        <img
          src="/trusted_m.png"
          alt="Celebration Man"
          className="w-48 h-auto"
        />
      </div>

      {/* Woman Image */}
      <div className="absolute top-0 left-0 transform translate-x-1 ">
        <img
          src="/woman_p.png"
          alt="Celebration Woman"
          className="w-58 h-auto"
        />
      </div>

      {/* Bottom-Left Card */}
      <div className="absolute bottom-10 left-10 z-10">
        <div className="bg-white shadow-lg rounded-lg p-4 transform rotate-[-5deg]">
          <div className="bg-gray-100 p-2 rounded-md mb-2">
            <p className="text-sm font-medium text-gray-800">Catering Services</p>
            <p className="text-xs text-gray-600">Delicious food for your guests.</p>
          </div>
          <div className="bg-gray-100 p-2 rounded-md">
            <p className="text-sm font-medium text-gray-800">Event Decorations</p>
            <p className="text-xs text-gray-600">Beautiful decor for any theme.</p>
          </div>
        </div>
      </div>

      {/* Bottom-Right Card */}
      <div className="absolute bottom-10 right-10 z-10">
        <div className="bg-white shadow-lg rounded-lg p-4 transform rotate-[5deg]">
          <div className="bg-gray-100 p-2 rounded-md mb-2">
            <p className="text-sm font-medium text-gray-800">Photography</p>
            <p className="text-xs text-gray-600">Capture every special moment.</p>
          </div>
          <div className="bg-gray-100 p-2 rounded-md">
            <p className="text-sm font-medium text-gray-800">Music & DJs</p>
            <p className="text-xs text-gray-600">Set the mood with great music.</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative z-10 w-full max-w-3xl" ref={suggestionBoxRef}>
        <div
          className="relative bg-white/30 backdrop-blur-md rounded-full shadow-lg p-4 flex items-center"
          style={{ border: "1px solid rgba(255, 255, 255, 0.2)" }}
        >
          <div className="flex-1 flex items-center relative">
            <Search className="h-5 w-5 text-gray-500 absolute left-4" />
            <input
              type="text"
              placeholder={userLocation ? `Search near ${locationName}` : "Search for vendors or services"}
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setShowSuggestions(true)}
              className="flex-1 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none pl-12 pr-10"
            />

            {/* Location Button */}
            <button
              type="button"
              onClick={detectUserLocation}
              className="absolute right-0 p-2 text-gray-500 hover:text-indigo-600 transition-colors duration-200 focus:outline-none"
              title="Use current location"
            >
              <MapPin className={`h-5 w-5 ${userLocation ? "text-indigo-600" : "text-gray-500"}`} />
              {isDetectingLocation && (
                <span className="absolute top-0 right-0 h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                </span>
              )}
            </button>
          </div>

          <button className="ml-4 bg-primary text-white px-6 py-2 rounded-full shadow-md hover:bg-primary/90 transition-all flex items-center">
            <Search className="h-4 w-4 mr-2" />
            Search
          </button>
        </div>

        {/* Location Chip */}
        {userLocation && (
          <div className="absolute -top-10 left-4 bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 text-sm flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {locationName}
            <button
              className="ml-2 text-indigo-600 hover:text-indigo-800"
              onClick={() => {
                setUserLocation(null);
                setLocationName("");
              }}
            >
              &times;
            </button>
          </div>
        )}

        {/* Suggestion Box */}
        {showSuggestions && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-2 z-50">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="p-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <p className="font-bold text-gray-800">{suggestion.name}</p>
                  <p className="text-sm text-gray-600">{suggestion.category}</p>
                </div>
              ))
            ) : (
              <div className="p-4 text-gray-600">No results found</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

