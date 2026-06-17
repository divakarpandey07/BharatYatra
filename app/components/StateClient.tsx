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
  CalendarDays, 
  CloudSun, 
  Compass
} from 'lucide-react';
import RotatingImage from './RotatingImage';

interface StateClientProps {
  stateData: any;
  info: any;
}

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
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 pointer-events-none"></div>
        <RotatingImage 
          searchTerm={`${stateData.name}, India`}
          defaultImages={stateData.images || [stateData.image]} 
          alt={stateData.name} 
        />
        
        {/* State Banner Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20 text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-md">{stateData.name}</h1>
          <p className="text-gray-200 text-sm md:text-base max-w-3xl drop-shadow-sm font-medium">
            {stateData.description}
          </p>
        </div>
      </div>

      {/* Fast facts bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="glass-panel p-4 bg-white border-l-4 border-l-accent-primary">
          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider mb-1">Capital</span>
          <span className="font-extrabold text-gray-800 text-base flex items-center gap-1">
            <MapPin size={16} className="text-accent-primary shrink-0" />
            {info.capital}
          </span>
        </div>

        <div className="glass-panel p-4 bg-white border-l-4 border-l-accent-secondary">
          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider mb-1">Primary Language</span>
          <span className="font-extrabold text-gray-800 text-base">
            {info.language}
          </span>
        </div>

        <div className="glass-panel p-4 bg-white border-l-4 border-l-accent-tertiary">
          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider mb-1">Climate</span>
          <span className="font-extrabold text-gray-700 text-sm flex items-center gap-1">
            <CloudSun size={18} className="text-accent-tertiary shrink-0" />
            {info.climate}
          </span>
        </div>

        <div className="glass-panel p-4 bg-white border-l-4 border-l-orange-500">
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
              {stateData.districts.map((district: any, index: number) => (
                <Link href={`/district/${stateData.id}/${district.id}`} key={district.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (index % 12) * 0.03 }}
                    className="card glass-panel bg-white border border-gray-100 rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:shadow-md cursor-pointer flex flex-col group transition-all"
                  >
                    {/* Rotating District Famous Images */}
                    <div className="h-36 overflow-hidden relative bg-gray-50">
                      <RotatingImage 
                        searchTerm={`${district.name}, ${stateData.name}`}
                        defaultImages={district.images || [district.image]} 
                        alt={district.name} 
                      />
                    </div>
                    
                    {/* Card Text Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      <span className="text-[10px] text-accent-secondary font-bold uppercase tracking-wider mb-0.5">
                        District Explore
                      </span>
                      <h4 className="font-extrabold text-gray-800 text-base group-hover:text-accent-primary transition-colors flex justify-between items-center">
                        {district.name}
                        <span className="text-xs text-accent-primary font-bold group-hover:translate-x-0.5 transition-transform">→</span>
                      </h4>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'culture' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-8 space-y-6">
              <div className="glass-panel p-6 md:p-8 bg-white border-l-4 border-l-accent-primary">
                <h3 className="text-2xl font-extrabold text-gray-800 mb-4 flex items-center gap-2">
                  <BookOpen className="text-accent-primary" size={24} /> Historical Background
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium text-base mb-4">
                  {info.history}
                </p>
              </div>

              <div className="glass-panel p-6 md:p-8 bg-white border-l-4 border-l-accent-secondary">
                <h3 className="text-2xl font-extrabold text-gray-800 mb-4 flex items-center gap-2">
                  <Compass className="text-accent-secondary" size={24} /> Traditional & Cultural Artforms
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium text-base">
                  {info.culture}
                </p>
              </div>
            </div>

            <div className="md:col-span-4 glass-panel p-6 bg-gradient-to-br from-white to-[#FDFCF9] border border-accent-tertiary/30">
              <h4 className="font-extrabold text-gray-800 text-lg mb-4 flex items-center gap-2">
                <CalendarDays className="text-accent-tertiary" size={20} /> Major Festivals
              </h4>
              <ul className="space-y-3">
                {info.festivals.map((fest: string, idx: number) => (
                  <li key={idx} className="flex gap-2 items-center text-sm font-semibold text-gray-700 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-primary shrink-0"></span>
                    {fest}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'cuisine' && (
          <div className="glass-panel p-6 md:p-8 bg-white">
            <div className="flex gap-3 items-center mb-6">
              <div className="p-3 bg-accent-primary/10 text-accent-primary rounded-2xl">
                <Utensils size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-gray-800">Famous Regional Specialties</h3>
                <p className="text-sm text-gray-500">Traditional dishes, sweets, and beverages from {stateData.name}.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {info.cuisines.map((food: string, idx: number) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4 hover:shadow-sm hover:bg-white transition-all">
                  <div className="w-10 h-10 rounded-full bg-accent-secondary/10 text-accent-secondary flex items-center justify-center font-bold text-sm shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-gray-800 text-base">{food}</h4>
                    <span className="text-[10px] text-gray-400 uppercase font-semibold">Local Food Specialty</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </motion.div>
  );
}
