'use client';

import { useState } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, Eye, Thermometer, MapPin } from 'lucide-react';

interface WeatherData {
    location: string;
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    visibility: number;
    feelsLike: number;
    uvIndex: number;
    pressure: number;
}

interface WeatherCardProps {
    data: WeatherData;
    isMain?: boolean;
}

const WeatherCard = ({ data, isMain = false }: WeatherCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const getWeatherIcon = (condition: string) => {
        switch (condition.toLowerCase()) {
            case 'sunny':
            case 'clear':
                return <Sun className="h-12 w-12 text-orange-400" />;
            case 'cloudy':
            case 'overcast':
                return <Cloud className="h-12 w-12 text-gray-400" />;
            case 'rainy':
            case 'rain':
                return <CloudRain className="h-12 w-12 text-blue-400" />;
            default:
                return <Sun className="h-12 w-12 text-orange-400" />;
        }
    };

    return (
        <div
            className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-white/90 ${isMain ? 'p-8 lg:p-10' : 'p-6'
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Location Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-sky-500" />
                    <h2 className={`font-bold text-gray-800 ${isMain ? 'text-2xl' : 'text-xl'}`}>
                        {data.location}
                    </h2>
                </div>
                <div className={`transition-transform duration-300 ${isHovered ? 'rotate-12' : ''}`}>
                    {getWeatherIcon(data.condition)}
                </div>
            </div>

            {/* Main Temperature */}
            <div className="text-center mb-8">
                <div className={`font-bold text-gray-800 ${isMain ? 'text-6xl lg:text-7xl' : 'text-5xl'} mb-2`}>
                    {data.temperature}°
                </div>
                <div className="text-gray-600 text-lg capitalize font-medium">
                    {data.condition}
                </div>
                <div className="text-gray-500 text-sm mt-1">
                    Feels like {data.feelsLike}°
                </div>
            </div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center transition-all duration-200 hover:scale-105">
                    <Droplets className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                    <div className="text-sm text-gray-600 mb-1">Humidity</div>
                    <div className="font-bold text-gray-800">{data.humidity}%</div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center transition-all duration-200 hover:scale-105">
                    <Wind className="h-6 w-6 text-green-500 mx-auto mb-2" />
                    <div className="text-sm text-gray-600 mb-1">Wind Speed</div>
                    <div className="font-bold text-gray-800">{data.windSpeed} mph</div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center transition-all duration-200 hover:scale-105">
                    <Eye className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                    <div className="text-sm text-gray-600 mb-1">Visibility</div>
                    <div className="font-bold text-gray-800">{data.visibility} mi</div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center transition-all duration-200 hover:scale-105">
                    <Sun className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                    <div className="text-sm text-gray-600 mb-1">UV Index</div>
                    <div className="font-bold text-gray-800">{data.uvIndex}</div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 text-center transition-all duration-200 hover:scale-105">
                    <Thermometer className="h-6 w-6 text-red-500 mx-auto mb-2" />
                    <div className="text-sm text-gray-600 mb-1">Pressure</div>
                    <div className="font-bold text-gray-800">{data.pressure} inHg</div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center transition-all duration-200 hover:scale-105">
                    <Cloud className="h-6 w-6 text-gray-500 mx-auto mb-2" />
                    <div className="text-sm text-gray-600 mb-1">Cloud Cover</div>
                    <div className="font-bold text-gray-800">42%</div>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;