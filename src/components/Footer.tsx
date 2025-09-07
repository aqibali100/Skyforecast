'use client';

import { Cloud, Sun, Twitter, Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-slate-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 group">
                            <div className="relative">
                                <Cloud className="h-8 w-8 text-sky-400 group-hover:scale-110 transition-transform duration-300" />
                                <Sun className="h-4 w-4 absolute -top-1 -right-1 text-orange-400 group-hover:rotate-90 transition-transform duration-300" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-xl text-white">SkyForecast</span>
                                <span className="text-xs text-gray-400">Weather Intelligence</span>
                            </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                            Professional weather forecasting service providing accurate, real-time weather information and alerts to help you plan your day with confidence.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-sky-400 transition-colors duration-200 hover:scale-110 transform">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-sky-400 transition-colors duration-200 hover:scale-110 transform">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-sky-400 transition-colors duration-200 hover:scale-110 transform">
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white border-b border-sky-400 pb-2">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-gray-300 hover:text-sky-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">Current Weather</a></li>
                            <li><a href="/forecast" className="text-gray-300 hover:text-sky-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">7-Day Forecast</a></li>
                            <li><a href="/radar" className="text-gray-300 hover:text-sky-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">Weather Radar</a></li>
                            <li><a href="/alerts" className="text-gray-300 hover:text-sky-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">Weather Alerts</a></li>
                            <li><a href="/historical" className="text-gray-300 hover:text-sky-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">Historical Data</a></li>
                        </ul>
                    </div>

                    {/* Weather Resources */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white border-b border-sky-400 pb-2">Resources</h3>
                        <ul className="space-y-2">
                            <li><a href="/weather-guide" className="text-gray-300 hover:text-sky-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">Weather Guide</a></li>
                            <li><a href="/climate-data" className="text-gray-300 hover:text-sky-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">Climate Data</a></li>
                            <li><a href="/weather-api" className="text-gray-300 hover:text-sky-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">Weather API</a></li>
                            <li><a href="/mobile-app" className="text-gray-300 hover:text-sky-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">Mobile App</a></li>
                            <li><a href="/support" className="text-gray-300 hover:text-sky-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">Support Center</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white border-b border-sky-400 pb-2">Contact Us</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-gray-300">
                                <Mail className="h-4 w-4 text-sky-400" />
                                <span>support@skyforecast.com</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-300">
                                <Phone className="h-4 w-4 text-sky-400" />
                                <span>1-800-WEATHER</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-300">
                                <MapPin className="h-4 w-4 text-sky-400" />
                                <span>Weather Center, USA</span>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-sky-600 to-blue-600 p-4 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">Weather Alerts</h4>
                            <p className="text-sm text-blue-100">Subscribe to get severe weather alerts and notifications delivered directly to your device.</p>
                            <button className="mt-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm transition-all duration-200 hover:scale-105">
                                Subscribe Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-sm text-gray-400 mb-4 md:mb-0">
                        © 2024 SkyForecast. All rights reserved. | Weather data provided by multiple meteorological sources.
                    </div>
                    <div className="flex space-x-6 text-sm">
                        <a href="/privacy" className="text-gray-400 hover:text-sky-400 transition-colors duration-200">Privacy Policy</a>
                        <a href="/terms" className="text-gray-400 hover:text-sky-400 transition-colors duration-200">Terms of Service</a>
                        <a href="/cookies" className="text-gray-400 hover:text-sky-400 transition-colors duration-200">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;