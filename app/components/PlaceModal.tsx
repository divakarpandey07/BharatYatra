"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Clock, MapPin, IndianRupee, Sun, Star, Camera, Info, Home, Utensils, ExternalLink, Compass, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

const fallbackLandmarkImage = "https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=1200&q=80";

export default function PlaceModal({ place, onClose }: { place: any, onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: 'Overview & History', icon: <Info size={16} /> },
    { id: 'travel', label: 'Travel & Route Guide', icon: <Compass size={16} /> },
    { id: 'stay_food', label: 'Hotels, Dharamshalas & Food', icon: <Home size={16} /> },
    { id: 'gallery', label: 'Landmark Gallery & Tips', icon: <Camera size={16} /> },
  ];

  const mapsSearchUrl = `https://www.google.com/maps/search/${encodeURIComponent(place.name + " hotels dharamshala stay")}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      >
        <div className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />
        
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl max-h-[92vh] glass-panel rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-white/20 z-10 bg-white"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors backdrop-blur-md border border-white/20 shadow-lg"
            title="Close Modal"
          >
            <X size={20} />
          </button>

          {/* Header Landmark Image */}
          <div className="relative h-64 sm:h-80 w-full shrink-0">
            <Image 
              src={place.image || fallbackLandmarkImage} 
              alt={place.name} 
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = fallbackLandmarkImage;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full pr-16">
              <span className="inline-block bg-accent-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-white/20 shadow-sm">
                {place.type || 'Landmark Attraction'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-2 leading-tight drop-shadow-md">{place.name}</h2>
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-200">
                <span className="flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full backdrop-blur-md text-white font-semibold">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" /> {place.ratings?.Overall || 4.9}/5 Rating
                </span>
                <span className="flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full backdrop-blur-md text-white font-semibold">
                  <MapPin size={14} /> {place.distance || 'Central Landmark'}
                </span>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex overflow-x-auto border-b border-gray-200 bg-gray-50 shrink-0 no-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-xs sm:text-sm font-bold whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id 
                    ? 'border-accent-primary text-accent-primary bg-white shadow-sm' 
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar bg-white text-gray-800">
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-400">
                <div>
                  <h3 className="text-xl font-bold text-accent-primary mb-3 flex items-center gap-2 border-b pb-2 border-gray-100">
                    <Info className="text-accent-primary" size={20} /> Why Is It Famous? (Detailed)
                  </h3>
                  <div className="text-gray-700 font-medium leading-relaxed space-y-4 whitespace-pre-line text-sm sm:text-base">
                    {place.whyFamous || place.description}
                  </div>
                </div>
                
                {place.story && (
                  <div className="bg-orange-50/80 p-6 sm:p-7 rounded-2xl border border-orange-200/80 shadow-sm">
                    <h3 className="text-xl font-bold text-orange-950 mb-3 flex items-center gap-2 border-b pb-2 border-orange-200">
                      📜 Complete Historical & Mythological Story
                    </h3>
                    <div className="text-gray-800 font-medium leading-relaxed space-y-4 whitespace-pre-line text-sm sm:text-base">
                      {place.story}
                    </div>
                  </div>
                )}

                {place.interestingFact && (
                  <div className="bg-blue-50 border border-blue-200/80 p-6 rounded-2xl shadow-sm">
                    <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2 text-base sm:text-lg">
                      💡 Fascinating Fact
                    </h4>
                    <p className="text-blue-950 font-semibold leading-relaxed text-sm sm:text-base">{place.interestingFact}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'travel' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-400">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-5 rounded-2xl flex items-start gap-4 border border-gray-200/70 shadow-sm">
                    <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                      <Sun size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">Best Season to Visit</h4>
                      <p className="text-gray-700 font-semibold text-sm mt-1">{place.bestSeason || 'October to March (Pleasant Weather)'}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-2xl flex items-start gap-4 border border-gray-200/70 shadow-sm">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">Opening Timings</h4>
                      <p className="text-gray-700 font-semibold text-sm mt-1">{place.openingTime || 'Open 24 Hours / Sunrise to Sunset'}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-2xl flex items-start gap-4 border border-gray-200/70 shadow-sm">
                    <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                      <IndianRupee size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">Entry Fee Details</h4>
                      <p className="text-gray-700 font-semibold text-sm mt-1">{place.entryFee || 'Free Entry'}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-2xl flex items-start gap-4 border border-gray-200/70 shadow-sm">
                    <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                      <Compass size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">Recommended Time Required</h4>
                      <p className="text-gray-700 font-semibold text-sm mt-1">{place.timeRequired || '2 - 3 Hours'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <ShieldCheck className="text-accent-primary" size={20} /> How to Reach & Insider Travel Tips
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-gray-700 font-medium text-sm sm:text-base">
                      <span className="text-green-600 font-bold mt-0.5">✔</span> 
                      <span><strong>Best Timing:</strong> {place.bestTimeToVisit || 'Early morning sunrise or golden hour sunset.'}</span>
                    </li>
                    {place.travelTips?.map((tip: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700 font-medium text-sm sm:text-base">
                        <span className="text-green-600 font-bold mt-0.5">✔</span> 
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'stay_food' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-400">
                {/* Stay & Hotels Section */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b pb-3 border-gray-200">
                    <h3 className="text-xl font-bold text-accent-primary flex items-center gap-2">
                      <Home size={22} /> Recommended Hotels & Dharamshalas
                    </h3>
                    <a
                      href={mapsSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all shadow-md hover:shadow-lg"
                    >
                      <MapPin size={16} /> Open Hotels & Dharamshalas on Google Maps <ExternalLink size={14} />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 shadow-sm">
                      <h4 className="font-bold text-emerald-950 mb-3 text-base flex items-center justify-between">
                        <span>Budget & Dharamshala</span>
                        <span className="text-xs bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-bold">Pocket Friendly</span>
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-800 font-semibold">
                        {place.hotels?.budget?.map((h: string, i: number) => <li key={i}>• {h}</li>) || (
                          <>
                            <li>• Local Pilgrims Dharamshala</li>
                            <li>• Government Tourist Lodge</li>
                            <li>• Verified Heritage Guesthouse</li>
                          </>
                        )}
                      </ul>
                    </div>

                    <div className="bg-blue-50/70 p-5 rounded-2xl border border-blue-200 shadow-sm">
                      <h4 className="font-bold text-blue-950 mb-3 text-base flex items-center justify-between">
                        <span>Mid-Range Hotels</span>
                        <span className="text-xs bg-blue-200 text-blue-900 px-2 py-0.5 rounded-full font-bold">Comfort Stay</span>
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-800 font-semibold">
                        {place.hotels?.midRange?.map((h: string, i: number) => <li key={i}>• {h}</li>) || (
                          <>
                            <li>• Standard City Center Hotel</li>
                            <li>• Riverview Boutique Stay</li>
                            <li>• Family Heritage Lodge</li>
                          </>
                        )}
                      </ul>
                    </div>

                    <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 shadow-sm">
                      <h4 className="font-bold text-amber-950 mb-3 text-base flex items-center justify-between">
                        <span>Premium Luxury Resorts</span>
                        <span className="text-xs bg-amber-200 text-amber-950 px-2 py-0.5 rounded-full font-bold">Luxury</span>
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-800 font-semibold">
                        {place.hotels?.premium?.map((h: string, i: number) => <li key={i}>• {h}</li>) || (
                          <>
                            <li>• Taj Heritage Property</li>
                            <li>• 5-Star Riverfront Palace Resort</li>
                            <li>• Luxury Boutique Villa</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Food Section */}
                <div className="bg-orange-50/80 p-6 rounded-2xl border border-orange-200 shadow-sm">
                  <h3 className="text-xl font-bold text-orange-950 mb-4 flex items-center gap-2">
                    <Utensils size={22} className="text-orange-600" /> Famous Local Food & Specialties
                  </h3>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {place.food?.map((item: string, idx: number) => (
                      <span key={idx} className="bg-white border border-orange-300 text-orange-900 font-bold px-4 py-2 rounded-xl text-sm shadow-sm flex items-center gap-2">
                        <span>🍽️</span> {item}
                      </span>
                    )) || (
                      <span className="bg-white border border-orange-300 text-orange-900 font-bold px-4 py-2 rounded-xl text-sm shadow-sm">
                        🍽️ Authentic Regional Thali & Local Sweets
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-orange-900 font-semibold bg-orange-100/80 p-3.5 rounded-xl border border-orange-200">
                    💡 <strong>Foodie Tip:</strong> Always enjoy street food from bustling, hygienic local halwai shops and renowned heritage eateries near the main market square.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-400">
                {/* Photography Tips */}
                <div>
                  <h3 className="text-xl font-bold text-accent-primary mb-4 flex items-center gap-2">
                    <Camera size={22} /> Photography & Scenic Spot Guide
                  </h3>
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                    <ul className="space-y-3">
                      {place.photographyTips?.map((tip: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-3 text-gray-800 font-semibold text-sm sm:text-base">
                          <Camera size={18} className="text-accent-primary shrink-0" /> {tip}
                        </li>
                      )) || (
                        <li className="text-gray-700 font-semibold text-sm sm:text-base flex items-center gap-2">
                          <Camera size={18} className="text-accent-primary shrink-0" /> Capture sunrise landscapes and ancient architectural details.
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Landmark Photo Gallery */}
                {place.images && place.images.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-accent-primary mb-4">
                      Landmark Photo Gallery (Click to Zoom)
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {place.images.map((img: string, idx: number) => (
                        <div 
                          key={idx} 
                          onClick={() => setLightboxImage(img)}
                          className="relative rounded-2xl overflow-hidden h-44 sm:h-52 cursor-pointer group shadow-md border border-gray-200"
                        >
                          <Image 
                            src={img} 
                            alt={`${place.name} Landmark ${idx + 1}`} 
                            fill 
                            sizes="(max-width: 768px) 50vw, 33vw" 
                            className="object-cover group-hover:scale-110 transition-transform duration-500" 
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = fallbackLandmarkImage;
                            }}
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs gap-1.5 backdrop-blur-[2px]">
                            <Camera size={16} /> View HD Photo
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Fullscreen Lightbox Modal */}
        {lightboxImage && (
          <div 
            className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button 
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 text-white bg-white/20 p-3 rounded-full backdrop-blur-md hover:bg-white/40 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="relative w-full max-w-5xl h-[80vh]">
              <Image 
                src={lightboxImage} 
                alt="Enlarged Landmark View" 
                fill 
                className="object-contain" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = fallbackLandmarkImage;
                }}
              />
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
