"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  BookOpen, 
  Utensils, 
  Grid, 
  CloudSun, 
  Compass
} from 'lucide-react';
import Image from 'next/image';

interface StateClientProps {
  stateData: any;
  info: any;
}

const fallbackLandmarkImage = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80";

export default function StateClient({ stateData, info }: StateClientProps) {
  const [activeTab, setActiveTab] = useState<'districts' | 'culture' | 'cuisine'>('districts');
  
  if (!stateData) {
    return (
      <div className="p-16 text-center text-xl bg-white border border-gray-100 rounded-3xl max-w-xl mx-auto mt-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">State Not Found</h2>
        <p className="text-gray-500 mb-6">We couldn't locate this state.</p>
        <Link href="/states" className="btn btn-primary">Back to States</Link>
      </div>
    );
  }

  const heroImage = stateData.images?.[0] || stateData.image || fallbackLandmarkImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="page-container p-4 md:p-8 max-w-7xl mx-auto"
    >
      {/* Back button */}
      <div className="mb-6 flex justify-between items-center">
        <Link href="/states" className="btn glass-panel inline-flex items-center gap-2 py-2 bg-white text-gray-700">
          <ArrowLeft size={18} /> All States
        </Link>
        <Link href="/" className="text-sm font-semibold text-accent-primary hover:underline flex items-center gap-1">
          <Compass size={16} /> Interactive Map
        </Link>
      </div>

      {/* Hero Banner Header */}
      <div className="relative rounded-3xl overflow-hidden mb-10 border border-gray-100 shadow-md h-80 md:h-[400px]">
        <Image 
          src={heroImage} 
          alt={stateData.name} 
          fill 
          priority
          sizes="100vw"
          className="object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallbackLandmarkImage;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent z-10 pointer-events-none"></div>
        
        {/* State Banner Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20 text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-md">{stateData.name}</h1>
          <p className="text-gray-200 text-sm md:text-base max-w-3xl drop-shadow-sm font-medium leading-relaxed">
            {stateData.description}
          </p>
        </div>
      </div>

      {/* Fast facts bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="glass-panel p-4 bg-white border-l-4 border-l-accent-primary rounded-xl shadow-sm">
          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider mb-1">Capital</span>
          <span className="font-extrabold text-gray-800 text-base flex items-center gap-1">
            <MapPin size={16} className="text-accent-primary shrink-0" />
            {info.capital}
          </span>
        </div>

        <div className="glass-panel p-4 bg-white border-l-4 border-l-accent-secondary rounded-xl shadow-sm">
          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider mb-1">Primary Language</span>
          <span className="font-extrabold text-gray-800 text-base">
            {info.language}
          </span>
        </div>

        <div className="glass-panel p-4 bg-white border-l-4 border-l-accent-tertiary rounded-xl shadow-sm">
          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider mb-1">Climate</span>
          <span className="font-extrabold text-gray-700 text-sm flex items-center gap-1">
            <CloudSun size={18} className="text-accent-tertiary shrink-0" />
            {info.climate}
          </span>
        </div>

        <div className="glass-panel p-4 bg-white border-l-4 border-l-orange-500 rounded-xl shadow-sm">
          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider mb-1">Top Festivals</span>
          <span className="font-extrabold text-gray-700 text-xs line-clamp-2">
            {info.festivals.join(", ")}
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-8 gap-4">
        <button
          onClick={() => setActiveTab('districts')}
          className={`pb-4 px-2 font-bold text-base md:text-lg flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'districts'
              ? 'border-accent-primary text-accent-primary'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          <Grid size={18} /> Districts ({stateData.districts.length})
        </button>

        <button
          onClick={() => setActiveTab('culture')}
          className={`pb-4 px-2 font-bold text-base md:text-lg flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'culture'
              ? 'border-accent-primary text-accent-primary'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          <BookOpen size={18} /> Heritage & Culture
        </button>

        <button
          onClick={() => setActiveTab('cuisine')}
          className={`pb-4 px-2 font-bold text-base md:text-lg flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'cuisine'
              ? 'border-accent-primary text-accent-primary'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          <Utensils size={18} /> Traditional Cuisines
        </button>
      </div>

      {/* Tab Panels */}
      <div className="mb-14">
        {activeTab === 'districts' && (
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800">Select a District to Explore Sights</h3>
              <p className="text-sm text-gray-500">Each district lists tourist monuments, temples, shopping, and real-time weather details.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {stateData.districts.map((district: any, index: number) => {
                const distImg = district.images?.[0] || district.image || fallbackLandmarkImage;
                return (
                  <Link href={`/district/${stateData.id}/${district.id}`} key={district.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (index % 12) * 0.03 }}
                      className="card glass-panel flex flex-col h-full overflow-hidden bg-white hover:-translate-y-1.5 transition-all duration-300 group border border-gray-100 shadow-sm"
                    >
                      <div className="h-40 overflow-hidden relative">
                        <Image 
                          src={distImg} 
                          alt={district.name} 
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = fallbackLandmarkImage;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 left-4 text-white font-extrabold text-lg drop-shadow-md">
                          {district.name}
                        </div>
                      </div>

                      <div className="p-4 flex flex-col flex-grow justify-between">
                        <p className="text-xs text-gray-500 font-medium mb-3">
                          Explore famous heritage sights, temples, and cultural monuments in {district.name}.
                        </p>

                        <div className="flex items-center justify-between text-xs font-bold text-accent-primary pt-2 border-t border-gray-100 group-hover:translate-x-1 transition-transform">
                          <span>View Attractions</span>
                          <span>→</span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'culture' && (
          <div className="glass-panel p-8 bg-white space-y-6 rounded-3xl border border-gray-100 shadow-sm">
            <div>
              <h3 className="text-2xl font-extrabold text-accent-primary mb-3">Historical Legacy</h3>
              <p className="text-gray-700 leading-relaxed font-medium text-base">{info.history}</p>
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-accent-secondary mb-3">Cultural Heritage & Art Forms</h3>
              <p className="text-gray-700 leading-relaxed font-medium text-base">{info.culture}</p>
            </div>
          </div>
        )}

        {activeTab === 'cuisine' && (
          <div className="glass-panel p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-extrabold text-accent-primary mb-4">Famous State Culinary Delights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {info.cuisines.map((dish: string, idx: number) => (
                <div key={idx} className="bg-orange-50/70 border border-orange-200/80 p-4 rounded-2xl flex items-center gap-3">
                  <span className="text-2xl">🍲</span>
                  <span className="font-bold text-gray-800 text-sm sm:text-base">{dish}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
