"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Clock, MapPin, IndianRupee, Sun, Star, Camera, Info, Home, Coffee } from 'lucide-react';
import { useState } from 'react';

const fallbackLocalImage = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200";

export default function PlaceModal({ place, onClose }: { place: any, onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Info size={16} /> },
    { id: 'travel', label: 'Travel Guide', icon: <MapPin size={16} /> },
    { id: 'stay_food', label: 'Stay & Food', icon: <Home size={16} /> },
    { id: 'tips', label: 'Tips & Gallery', icon: <Camera size={16} /> },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl max-h-[90vh] glass-panel rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-white/10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-md"
          >
            <X size={20} />
          </button>

          {/* Header Image */}
          <div className="relative h-64 sm:h-80 w-full shrink-0">
            <Image 
              src={place.image || (place.thumbnail ? place.thumbnail.source : fallbackLocalImage)} 
              alt={place.name} 
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = fallbackLocalImage;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 sm:p-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">{place.name}</h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-200">
                <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                  <Star size={14} className="text-yellow-400" /> {place.ratings?.Overall || 4.5}/5
                </span>
                <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                  <MapPin size={14} /> {place.distance || 'Local'}
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto border-b border-gray-200 bg-gray-50 shrink-0 no-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id 
                    ? 'border-accent-primary text-accent-primary bg-white' 
                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar bg-white">
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h3 className="text-xl font-bold text-accent-primary mb-3 flex items-center gap-2">
                    Why Is It Famous?
                  </h3>
                  <p className="text-gray-700 font-medium leading-relaxed">{place.whyFamous || place.description}</p>
                </div>
                
                {place.story && (
                  <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                    <h3 className="text-xl font-bold text-accent-primary mb-3">The Story (Detailed)</h3>
                    <p className="text-gray-700 font-medium leading-relaxed whitespace-pre-line">{place.story}</p>
                  </div>
                )}

                {place.interestingFact && (
                  <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl">
                    <h4 className="font-bold text-blue-600 mb-2 flex items-center gap-2">
                      <Info size={18} /> Interesting Fact
                    </h4>
                    <p className="text-gray-700 font-medium">{place.interestingFact}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'travel' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-5 rounded-xl flex items-start gap-4 border border-gray-100">
                    <Sun className="text-accent-primary mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-gray-900">Best Season to Visit</h4>
                      <p className="text-gray-600 font-medium text-sm mt-1">{place.bestSeason || 'Year Round'}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-xl flex items-start gap-4 border border-gray-100">
                    <Clock className="text-accent-primary mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-gray-900">Opening Timings</h4>
                      <p className="text-gray-600 font-medium text-sm mt-1">{place.openingTime || 'Open 24/7'}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-xl flex items-start gap-4 border border-gray-100">
                    <IndianRupee className="text-accent-primary mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-gray-900">Entry Fee</h4>
                      <p className="text-gray-600 font-medium text-sm mt-1">{place.entryFee || 'Free'}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-xl flex items-start gap-4 border border-gray-100">
                    <MapPin className="text-accent-primary mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-gray-900">Time Required</h4>
                      <p className="text-gray-600 font-medium text-sm mt-1">{place.timeRequired || '1-2 Hours'}</p>
                    </div>
                  </div>
                </div>

                {place.travelTips && place.travelTips.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-accent-primary mb-4">Travel Tips</h3>
                    <ul className="space-y-3">
                      {place.travelTips.map((tip: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-700 font-medium">
                          <span className="text-green-500 mt-0.5">✔</span> {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'stay_food' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h3 className="text-xl font-bold text-accent-primary mb-4 flex items-center gap-2">
                    <Home size={20} /> Nearby Hotels
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                      <h4 className="font-bold text-gray-900 mb-3">Budget</h4>
                      <ul className="space-y-2 text-sm text-gray-600 font-medium">
                        {place.hotels?.budget?.map((h: string, i: number) => <li key={i}>• {h}</li>) || <li>• Local Guest Houses</li>}
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                      <h4 className="font-bold text-gray-900 mb-3">Mid-Range</h4>
                      <ul className="space-y-2 text-sm text-gray-600 font-medium">
                        {place.hotels?.midRange?.map((h: string, i: number) => <li key={i}>• {h}</li>) || <li>• Standard Hotels</li>}
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                      <h4 className="font-bold text-gray-900 mb-3">Premium</h4>
                      <ul className="space-y-2 text-sm text-gray-600 font-medium">
                        {place.hotels?.premium?.map((h: string, i: number) => <li key={i}>• {h}</li>) || <li>• Luxury Stays nearby</li>}
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-accent-primary mb-4 flex items-center gap-2">
                    <Coffee size={20} /> Local Food Experience
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {place.food?.map((item: string, idx: number) => (
                      <span key={idx} className="bg-orange-50 border border-orange-200 text-orange-700 font-bold px-4 py-2 rounded-full text-sm">
                        {item}
                      </span>
                    )) || <span className="text-gray-500 font-medium">Local restaurants available nearby.</span>}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tips' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h3 className="text-xl font-bold text-accent-primary mb-4">Photography Guide</h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <ul className="space-y-3">
                      {place.photographyTips?.map((tip: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-3 text-gray-700 font-medium">
                          <Camera size={16} className="text-accent-secondary" /> {tip}
                        </li>
                      )) || <li className="text-gray-500 font-medium">Great spots for photography available.</li>}
                    </ul>
                  </div>
                </div>

                {place.images && place.images.length > 1 && (
                  <div>
                    <h3 className="text-xl font-bold text-accent-primary mb-4">Gallery</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {place.images.map((img: string, idx: number) => (
                        <div key={idx} className="rounded-xl overflow-hidden h-40">
                          <Image src={img} alt={`${place.name} ${idx}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover hover:scale-110 transition-transform duration-500" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
