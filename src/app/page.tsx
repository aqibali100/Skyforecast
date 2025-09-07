'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import WeatherCard from '../components/WeatherCard';
import SearchBar from '../components/SearchBar';
import { Button } from '../components/ui/button';
import Link from 'next/link';

// Mock weather data
const mockWeatherData = {
  location: "New York, NY",
  temperature: 72,
  condition: "Sunny",
  humidity: 65,
  windSpeed: 8,
  visibility: 10,
  feelsLike: 75,
  uvIndex: 6,
  pressure: 30.15
};

const mockForecastData = [
  { day: 'Today', high: 75, low: 62, condition: 'Sunny', icon: '☀️' },
  { day: 'Tomorrow', high: 78, low: 65, condition: 'Partly Cloudy', icon: '⛅' },
  { day: 'Wednesday', high: 71, low: 58, condition: 'Rainy', icon: '🌧️' },
  { day: 'Thursday', high: 73, low: 60, condition: 'Cloudy', icon: '☁️' },
  { day: 'Friday', high: 76, low: 63, condition: 'Sunny', icon: '☀️' },
];


async function getUserLocation() {
  try {
    // Get coordinates from browser's Geolocation API
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });
    });

    const { latitude, longitude } = position.coords;

    // Fetch city and country using OpenStreetMap Nominatim API
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&accept-language=en`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }

    const data = await response.json();

    // Extract city and country from response
    const city = data.address.city || data.address.town || data.address.village || 'Unknown city';
    const country = data.address.country || 'Unknown country';

    return {
      latitude,
      longitude,
      city,
      country,
      error: null
    };
  } catch (error) {
    return {
      latitude: null,
      longitude: null,
      city: null,
      country: null,
      error: error.message || 'Unable to get location'
    };
  }
}

export default function Home() {
  const [currentWeather, setCurrentWeather] = useState(mockWeatherData);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);

  const handleLocationSelect = async (location: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCurrentWeather({
        ...mockWeatherData,
        location: location
      });
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    async function fetchLocation() {
      setIsLoading(true);
      const result = await getUserLocation();
      setLocation(result);
      setIsLoading(false);
    }
    fetchLocation();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-15 lg:py-25">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
              Your Weather,{' '}<br></br>
              <span className="bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
                Perfectly Forecast
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
              Get precise weather forecasts, real-time conditions, and severe weather alerts for any location worldwide.
            </p>

            {/* Search Bar */}
            <div className="animate-fade-in-up animation-delay-400">
              <SearchBar
                onLocationSelect={handleLocationSelect}
                placeholder="Search for any city or location..."
              />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 animate-fade-in-up animation-delay-600">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/30 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                <div className="text-blue-100">Accuracy Rate</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/30 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold text-white mb-2">10M+</div>
                <div className="text-blue-100">Daily Users</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/30 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-blue-100">Live Updates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Weather Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Current Weather Conditions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real-time weather data with detailed metrics for informed decision making
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {isLoading ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8 lg:p-10 text-center">
                <div className="animate-spin h-12 w-12 border-4 border-sky-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <div className="text-gray-600">Loading weather data...</div>
              </div>
            ) : (
              <WeatherCard data={currentWeather} isMain={true} />
            )}
          </div>
        </div>
      </section>

      {/* 5-Day Forecast */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              5-Day Weather Forecast
            </h2>
            <p className="text-xl text-gray-600">
              Plan ahead with our extended weather outlook
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {mockForecastData.map((day, index) => (
              <div
                key={day.day}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-gray-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-lg font-semibold text-gray-800 mb-3">{day.day}</div>
                <div className="text-4xl mb-4">{day.icon}</div>
                <div className="text-sm text-gray-600 mb-3 capitalize">{day.condition}</div>
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-gray-800">{day.high}°</span>
                  <span className="text-gray-500">{day.low}°</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href={"/7-day-forecast"}>
              <Button className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg">
                View 7-Day Forecast
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}