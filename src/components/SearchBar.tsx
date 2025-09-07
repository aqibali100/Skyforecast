'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Clock } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

interface SearchSuggestion {
    id: string;
    name: string;
    region: string;
    country: string;
    isRecent?: boolean;
}

interface SearchBarProps {
    onLocationSelect: (location: string) => void;
    placeholder?: string;
}

const SearchBar = ({ onLocationSelect, placeholder = "Search for a city..." }: SearchBarProps) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Mock recent searches and suggestions
    const recentSearches: SearchSuggestion[] = [
        { id: '1', name: 'New York', region: 'NY', country: 'USA', isRecent: true },
        { id: '2', name: 'Los Angeles', region: 'CA', country: 'USA', isRecent: true },
        { id: '3', name: 'London', region: 'England', country: 'UK', isRecent: true },
    ];

    const popularCities: SearchSuggestion[] = [
        { id: '4', name: 'Tokyo', region: 'Tokyo', country: 'Japan' },
        { id: '5', name: 'Paris', region: 'Île-de-France', country: 'France' },
        { id: '6', name: 'Sydney', region: 'NSW', country: 'Australia' },
        { id: '7', name: 'Dubai', region: 'Dubai', country: 'UAE' },
        { id: '8', name: 'Singapore', region: 'Singapore', country: 'Singapore' },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = async (searchQuery: string) => {
        if (searchQuery.length < 2) {
            setSuggestions([]);
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            const filtered = popularCities.filter(city =>
                city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                city.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
                city.country.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSuggestions(filtered);
            setIsLoading(false);
        }, 300);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        setIsOpen(true);
        handleSearch(value);
    };

    const handleSuggestionClick = (suggestion: SearchSuggestion) => {
        const locationString = `${suggestion.name}, ${suggestion.region}, ${suggestion.country}`;
        setQuery(locationString);
        setIsOpen(false);
        onLocationSelect(locationString);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onLocationSelect(query);
            setIsOpen(false);
        }
    };

    return (
        <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-sky-500 transition-colors duration-200" />
                    <Input
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        onFocus={() => setIsOpen(true)}
                        placeholder={placeholder}
                        className="pl-12 text-black pr-20 py-6 text-lg rounded-2xl border-2 border-gray-200 bg-white/90 backdrop-blur-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all duration-200 hover:bg-white/95"
                    />
                    <Button
                        type="submit"
                        className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-6 py-2 transition-all duration-200 hover:scale-105"
                    >
                        Search
                    </Button>
                </div>
            </form>

            {/* Suggestions Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl z-50 max-h-96 overflow-y-auto">
                    {isLoading ? (
                        <div className="p-4 text-center text-gray-500">
                            <div className="animate-spin h-5 w-5 border-2 border-sky-500 border-t-transparent rounded-full mx-auto"></div>
                            <span className="mt-2 block">Searching...</span>
                        </div>
                    ) : (
                        <div className="py-2">
                            {query.length === 0 && (
                                <>
                                    {/* Recent Searches */}
                                    {recentSearches.length > 0 && (
                                        <div className="px-4 py-2">
                                            <h3 className="text-sm font-semibold text-gray-600 mb-2 flex items-center">
                                                <Clock className="h-4 w-4 mr-2" />
                                                Recent Searches
                                            </h3>
                                            {recentSearches.map((item) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => handleSuggestionClick(item)}
                                                    className="w-full cursor-pointer text-left px-3 py-2 hover:bg-sky-50 rounded-lg transition-colors duration-150 flex items-center group"
                                                >
                                                    <MapPin className="h-4 w-4 text-gray-400 mr-3 group-hover:text-sky-500" />
                                                    <div>
                                                        <div className="font-medium text-gray-800">{item.name}</div>
                                                        <div className="text-sm text-gray-500">{item.region}, {item.country}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Popular Cities */}
                                    <div className="px-4 py-2 border-t border-gray-100">
                                        <h3 className="text-sm font-semibold text-gray-600 mb-2">Popular Cities</h3>
                                        {popularCities.slice(0, 5).map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => handleSuggestionClick(item)}
                                                className="w-full cursor-pointer text-left px-3 py-2 hover:bg-sky-50 rounded-lg transition-colors duration-150 flex items-center group"
                                            >
                                                <MapPin className="h-4 w-4 text-gray-400 mr-3 group-hover:text-sky-500" />
                                                <div>
                                                    <div className="font-medium text-gray-800">{item.name}</div>
                                                    <div className="text-sm text-gray-500">{item.region}, {item.country}</div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Search Results */}
                            {query.length > 0 && suggestions.length > 0 && (
                                <div className="px-4 py-2">
                                    <h3 className="text-sm font-semibold text-gray-600 mb-2">Search Results</h3>
                                    {suggestions.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => handleSuggestionClick(item)}
                                            className="w-full text-left px-3 py-2 hover:bg-sky-50 rounded-lg transition-colors duration-150 flex items-center group"
                                        >
                                            <MapPin className="h-4 w-4 text-gray-400 mr-3 group-hover:text-sky-500" />
                                            <div>
                                                <div className="font-medium text-gray-800">{item.name}</div>
                                                <div className="text-sm text-gray-500">{item.region}, {item.country}</div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* No Results */}
                            {query.length > 0 && suggestions.length === 0 && !isLoading && (
                                <div className="px-4 py-8 text-center text-gray-500">
                                    <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                                    <div className="font-medium">No locations found</div>
                                    <div className="text-sm">Try searching for a different city or location</div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;