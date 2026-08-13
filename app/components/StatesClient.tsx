"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Compass, Search, Globe } from 'lucide-react';
import Image from 'next/image';

interface StateData {
  id: string;
  name: string;
  description: string;
  districtsCount: number;
  image: string;
  images?: string[];
}

interface StatesClientProps {
  statesData: StateData[];
}

const fallbackLandmarkImage = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80";

export default function StatesClient({ statesData }: StatesClientProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const stateRegions: Record<string, string> = {
    "andaman-and-nicobar-islands": "south", "andhra-pradesh": "south", "arunachal-pradesh": "east",
    "assam": "east", "bihar": "east", "chandigarh": "north", "chhattisgarh": "central",
    "dadra-and-nagar-haveli-and-daman-and-diu": "west", "delhi": "north", "goa": "west",
    "gujarat": "west", "haryana": "north", "himachal-pradesh": "north", "jammu-and-kashmir": "north",
    "jharkhand": "east", "karnataka": "south", "kerala": "south", "ladakh": "north",
    "lakshadweep": "south", "madhya-pradesh": "central", "maharashtra": "west", "manipur": "east",
    "meghalaya": "east", "mizoram": "east", "nagaland": "east", "odisha": "east",
    "puducherry": "south", "punjab": "north", "rajasthan": "west", "sikkim": "east",
    "tamil-nadu": "south", "telangana": "south", "tripura": "east", "uttar-pradesh": "north",
    "uttarakhand": "north", "west-bengal": "east"
  };

  const getCapitalName = (state: string) => {
    const capitals: Record<string, string> = {
      "Maharashtra": "Mumbai", "Rajasthan": "Jaipur", "Karnataka": "Bengaluru", 
      "Uttar Pradesh": "Lucknow", "Tamil Nadu": "Chennai", "Gujarat": "Gandhinagar",
      "Kerala": "Thiruvananthapuram", "West Bengal": "Kolkata", "Goa": "Panaji",
      "Uttarakhand": "Dehradun", "Himachal Pradesh": "Shimla", "Bihar": "Patna",
      "Madhya Pradesh": "Bhopal", "Punjab": "Chandigarh", "Andhra Pradesh": "Amaravati",
      "Telangana": "Hyderabad", "Odisha": "Bhubaneswar", "Jammu and Kashmir": "Srinagar"
    };
    return capitals[state] || "State Capital";
  };

  const filteredStates = statesData.filter((state: StateData) => {
    const region = stateRegions[state.id] || 'other';
    const matchesRegion = selectedRegion === 'all' || region === selectedRegion;
    const matchesSearch = state.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page-container p-4 md:p-8"
    >
      {/* Back navigation */}
      <div className="mb-6">
        <Link href="/" className="btn glass-panel inline-flex items-center gap-2 py-2.5 bg-white text-gray-700">
          <ArrowLeft size={18} /> Back to Map
        </Link>
      </div>

      <div className="page-header text-center mb-12">
        <h1 className="page-title text-gradient text-5xl font-extrabold mb-4">Explore Incredible India</h1>
        <p className="page-subtitle text-lg text-gray-500 max-w-2xl mx-auto">
          Select a state or union territory to discover its distinct capital, cultural landmarks, and districts.
        </p>
      </div>

      {/* Search and Filters Hub */}
      <div className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative w-full md:w-80 flex items-center bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 focus-within:border-accent-tertiary transition-colors">
          <Search className="text-gray-400 mr-2" size={18} />
          <input 
            type="text" 
            placeholder="Search state..." 
            className="bg-transparent border-none outline-none text-gray-700 w-full placeholder-gray-400 text-sm font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
          {['all', 'north', 'south', 'east', 'west', 'central'].map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                selectedRegion === region
                  ? 'bg-accent-secondary border-accent-secondary text-white shadow-md'
                  : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100'
              }`}
            >
              {region === 'all' ? 'All India' : region}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of States */}
      {filteredStates.length === 0 ? (
        <div className="text-center p-16 text-gray-400 glass-panel bg-white">
          No states found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStates.map((state: StateData, index: number) => {
            const stateImg = state.images?.[0] || state.image || fallbackLandmarkImage;
            return (
              <Link href={`/states/${state.id}`} key={state.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index % 12) * 0.04 }}
                  className="card glass-panel h-full flex flex-col hover:-translate-y-2 transition-all duration-300 overflow-hidden bg-white group"
                >
                  <div className="h-48 overflow-hidden relative">
                    <Image 
                      src={stateImg} 
                      alt={state.name} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = fallbackLandmarkImage;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                      <Globe size={11} className="text-accent-tertiary" />
                      {stateRegions[state.id]?.toUpperCase() || 'INDIA'}
                    </div>
                    <div className="absolute bottom-3 left-4 text-white font-extrabold text-lg drop-shadow-md">
                      {state.name}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div className="flex gap-2 mb-3 text-[11px] text-gray-600 font-semibold flex-wrap">
                      <span className="flex items-center gap-0.5 bg-gray-100 px-2.5 py-1 rounded-md">
                        Capital: {getCapitalName(state.name)}
                      </span>
                      <span className="flex items-center gap-0.5 bg-accent-primary/10 text-accent-primary px-2.5 py-1 rounded-md">
                        {state.districtsCount} Districts
                      </span>
                    </div>

                    <p className="text-gray-500 text-xs line-clamp-2 mb-4 leading-relaxed font-medium">
                      {state.description}
                    </p>

                    <div className="flex items-center justify-between text-xs font-bold text-accent-primary pt-3 border-t border-gray-100 group-hover:translate-x-1 transition-transform">
                      <span>Explore Districts & Monuments</span>
                      <span>→</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
