'use client';

import { useState, useEffect } from 'react';
import { Search, Menu, X, Cloud, Sun, MapPin, Calendar, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import Link from 'next/link';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Handle search functionality
            console.log('Searching for:', searchQuery);
        }
    };

    return (
        <header className={`sticky top-0 z-100 transition-all duration-300 ${scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200/20'
            : 'bg-gradient-to-r from-sky-400 to-blue-500'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link href={"/"}>
                        <div className="flex cursor-pointer items-center space-x-2 group">
                            <div className="relative">
                                <Cloud className={`h-8 w-8 transition-all duration-300 ${scrolled ? 'text-sky-500' : 'text-white'
                                    } group-hover:scale-110`} />
                                <Sun className={`h-4 w-4 absolute -top-1 -right-1 transition-all duration-300 ${scrolled ? 'text-orange-400' : 'text-yellow-300'
                                    } group-hover:rotate-90`} />
                            </div>
                            <div className="flex flex-col">
                                <span className={`font-bold text-xl transition-colors duration-300 ${scrolled ? 'text-gray-800' : 'text-white'
                                    }`}>
                                    SkyForecast
                                </span>
                                <span className={`text-xs transition-colors duration-300 ${scrolled ? 'text-gray-500' : 'text-blue-100'
                                    }`}>
                                    Weather Intelligence
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="/" className={`font-medium transition-all duration-200 hover:scale-105 ${scrolled
                            ? 'text-gray-700 hover:text-sky-600'
                            : 'text-white hover:text-blue-100'
                            }`}>
                            Home
                        </a>
                        <a href="/7-day-forecast" className={`font-medium transition-all duration-200 hover:scale-105 ${scrolled
                            ? 'text-gray-700 hover:text-sky-600'
                            : 'text-white hover:text-blue-100'
                            }`}>
                            7-Day Forecast
                        </a>
                        <a href="/radar" className={`font-medium transition-all duration-200 hover:scale-105 ${scrolled
                            ? 'text-gray-700 hover:text-sky-600'
                            : 'text-white hover:text-blue-100'
                            }`}>
                            Weather Radar
                        </a>
                        <a href="/alerts" className={`font-medium transition-all duration-200 hover:scale-105 ${scrolled
                            ? 'text-gray-700 hover:text-sky-600'
                            : 'text-white hover:text-blue-100'
                            }`}>
                            Alerts
                        </a>
                    </nav>

                    {/* Search Bar */}
                    <div className="hidden lg:flex items-center">
                        <form onSubmit={handleSearch} className="relative">
                            <div className={`flex items-center transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''
                                }`}>
                                <div className="relative">
                                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-200 ${scrolled ? 'text-gray-400' : 'text-blue-200'
                                        }`} />
                                    <Input
                                        type="text"
                                        placeholder="Search location..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onFocus={() => setIsSearchFocused(true)}
                                        onBlur={() => setIsSearchFocused(false)}
                                        className={`pl-10 outline-none border-none pr-4 py-2 w-64 rounded-full border-0 transition-all duration-300 focus:ring-2 focus:ring-orange-400 ${scrolled
                                            ? 'bg-gray-100 text-gray-800 placeholder-gray-500'
                                            : 'bg-white/20 text-white placeholder-blue-100 backdrop-blur-sm'
                                            }`}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="ml-2 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-2 transition-all duration-200 hover:scale-105 shadow-lg"
                                >
                                    Search
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`md:hidden p-2 rounded-lg transition-all duration-200 hover:scale-110 ${scrolled
                            ? 'text-gray-600 hover:bg-gray-100'
                            : 'text-white hover:bg-white/20'
                            }`}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

            </div>

            {/* Mobile Menu Overlay */}
            <div className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}>
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsMenuOpen(false)}
                />

                {/* Sidebar */}
                <div className={`absolute top-0 left-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-sky-500 to-blue-600 shadow-2xl transform transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}>
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/20">
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <Cloud className="h-8 w-8 text-white" />
                                <Sun className="h-4 w-4 absolute -top-1 -right-1 text-yellow-300" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-xl text-white">SkyForecast</span>
                                <span className="text-xs text-blue-100">Weather Intelligence</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 rounded-lg text-white hover:bg-white/20 transition-colors duration-200"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col h-full overflow-y-auto">
                        {/* Mobile Search */}
                        <div className="p-6 border-b border-white/10">
                            <form onSubmit={handleSearch}>
                                <div className="relative mb-4">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-200" />
                                    <Input
                                        type="text"
                                        placeholder="Search location..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 pr-4 py-3 w-full rounded-full bg-white/20 text-white placeholder-blue-100 border-0 focus:ring-2 focus:ring-orange-400 backdrop-blur-sm"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3 transition-all duration-200 hover:scale-105"
                                >
                                    Search Weather
                                </Button>
                            </form>
                        </div>

                        {/* Mobile Navigation */}
                        <nav className="flex-1 p-6">
                            <div className="space-y-2">
                                <a
                                    href="/"
                                    className="flex items-center py-3 px-4 text-white hover:bg-white/20 rounded-xl transition-all duration-200 hover:translate-x-2 group"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <MapPin className="h-5 w-5 mr-3 group-hover:text-orange-300 transition-colors duration-200" />
                                    Home
                                </a>
                                <a
                                    href="/forecast"
                                    className="flex items-center py-3 px-4 text-white hover:bg-white/20 rounded-xl transition-all duration-200 hover:translate-x-2 group"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Calendar className="h-5 w-5 mr-3 group-hover:text-orange-300 transition-colors duration-200" />
                                    7-Day Forecast
                                </a>
                                <a
                                    href="/radar"
                                    className="flex items-center py-3 px-4 text-white hover:bg-white/20 rounded-xl transition-all duration-200 hover:translate-x-2 group"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Cloud className="h-5 w-5 mr-3 group-hover:text-orange-300 transition-colors duration-200" />
                                    Weather Radar
                                </a>
                                <a
                                    href="/alerts"
                                    className="flex items-center py-3 px-4 text-white hover:bg-white/20 rounded-xl transition-all duration-200 hover:translate-x-2 group"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <AlertTriangle className="h-5 w-5 mr-3 group-hover:text-orange-300 transition-colors duration-200" />
                                    Weather Alerts
                                </a>
                            </div>

                            {/* Quick Weather Info */}
                            <div className="mt-8 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                <h3 className="text-white font-semibold mb-3">Quick Weather</h3>
                                <div className="flex items-center justify-between text-white">
                                    <div className="flex items-center space-x-2">
                                        <Sun className="h-5 w-5 text-orange-300" />
                                        <span className="text-sm">New York</span>
                                    </div>
                                    <span className="text-lg font-bold">72°F</span>
                                </div>
                            </div>
                        </nav>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/10">
                            <div className="text-center text-blue-100 text-sm">
                                © 2024 SkyForecast
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;