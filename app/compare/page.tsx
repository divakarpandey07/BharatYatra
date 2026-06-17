"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Layers, 
  Trash2, 
  ExternalLink, 
  MapPin, 
  Clock, 
  Calendar, 
  DollarSign 
} from 'lucide-react';

export default function ComparePage() {
  const [compareList, setCompareList] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = JSON.parse(localStorage.getItem('bharatyatra_compare') || '[]');
      setCompareList(saved);
    }
  }, []);

  const handleRemove = (id: string) => {
    const updated = compareList.filter(item => item.id !== id);
    setCompareList(updated);
    localStorage.setItem('bharatyatra_compare', JSON.stringify(updated));
  };

  const handleClearAll = () => {
    setCompareList([]);
    localStorage.setItem('bharatyatra_compare', JSON.stringify([]));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page-container p-4 md:p-8 max-w-7xl mx-auto"
    >
      {/* Back Navigation */}
      <div className="mb-6 flex justify-between items-center">
        <Link href="/" className="btn glass-panel inline-flex items-center gap-2 py-2.5 bg-white text-gray-700">
          <ArrowLeft size={18} /> Back to Map
        </Link>
        {compareList.length > 0 && (
          <button 
            onClick={handleClearAll}
            className="text-xs font-bold text-red-500 hover:underline"
          >
            Clear Comparison Grid
          </button>
        )}
      </div>

      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3.5 bg-accent-tertiary/10 text-accent-tertiary rounded-2xl mb-4 border border-accent-tertiary/20 shadow-sm">
          <Layers size={36} />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">Compare Destinations</h1>
        <p className="text-base text-gray-500 max-w-2xl mx-auto font-medium">
          Compare up to 3 travel destinations side-by-side to review their entry fees, visiting hours, best seasons, and select the best fit for your itinerary.
        </p>
      </div>

      {compareList.length === 0 ? (
        <div className="text-center py-20 glass-panel bg-white border border-gray-100 max-w-xl mx-auto rounded-3xl p-8">
          <Layers className="mx-auto text-gray-300 mb-4" size={48} />
          <h3 className="text-xl font-bold text-gray-700 mb-2">Comparison Grid is Empty</h3>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            Click the comparison layers icon on any tourist place card under district pages to select and compare them.
          </p>
          <Link href="/states" className="btn btn-primary">
            Find Attractions
          </Link>
        </div>
      ) : (
        <div className="glass-panel p-6 bg-white overflow-x-auto border border-gray-100 shadow-sm rounded-3xl">
          
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                {/* Specs label column */}
                <th className="w-1/4 pb-6 text-left text-xs uppercase font-extrabold text-gray-400 tracking-wider">Specifications</th>
                
                {/* Destination columns */}
                {compareList.map((place) => (
                  <th key={place.id} className="w-1/4 pb-6 px-4 text-left">
                    <div className="relative rounded-2xl overflow-hidden h-32 mb-3 bg-gray-100">
                      <Image 
                        src={place.image} 
                        alt={place.name} 
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                      <button 
                        onClick={() => handleRemove(place.id)}
                        className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-red-500 text-white rounded-lg transition-all"
                        title="Remove"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <h3 className="font-extrabold text-gray-800 text-base line-clamp-1">{place.name}</h3>
                    <span className="text-[10px] text-gray-400 uppercase font-bold">{place.districtName}, {place.stateName}</span>
                  </th>
                ))}
                
                {/* Fill empty columns up to 3 */}
                {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                  <th key={i} className="w-1/4 pb-6 px-4 text-center text-gray-300">
                    <div className="border-2 border-dashed border-gray-100 rounded-2xl h-32 mb-3 flex items-center justify-center text-xs font-semibold">
                      + Column Empty
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            
            <tbody>
              
              {/* Location spec */}
              <tr className="border-b border-gray-50">
                <td className="py-5 font-bold text-sm text-gray-400 flex items-center gap-1.5">
                  <MapPin size={16} className="text-accent-primary" /> Region Coordinates
                </td>
                {compareList.map((place) => (
                  <td key={place.id} className="py-5 px-4 text-sm font-semibold text-gray-700">
                    {place.districtName} District, {place.stateName}
                  </td>
                ))}
                {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                  <td key={i} className="py-5 px-4 text-gray-300 text-sm font-medium">-</td>
                ))}
              </tr>

              {/* Timing spec */}
              <tr className="border-b border-gray-50">
                <td className="py-5 font-bold text-sm text-gray-400 flex items-center gap-1.5">
                  <Clock size={16} className="text-accent-secondary" /> Visiting Hours
                </td>
                {compareList.map((place) => (
                  <td key={place.id} className="py-5 px-4 text-sm font-semibold text-gray-700">
                    {place.timing || "09:00 AM - 05:30 PM"}
                  </td>
                ))}
                {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                  <td key={i} className="py-5 px-4 text-gray-300 text-sm font-medium">-</td>
                ))}
              </tr>

              {/* Season spec */}
              <tr className="border-b border-gray-50">
                <td className="py-5 font-bold text-sm text-gray-400 flex items-center gap-1.5">
                  <Calendar size={16} className="text-accent-tertiary" /> Best Time to Visit
                </td>
                {compareList.map((place) => (
                  <td key={place.id} className="py-5 px-4 text-sm font-semibold text-gray-700">
                    {place.bestTime || "October to March"}
                  </td>
                ))}
                {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                  <td key={i} className="py-5 px-4 text-gray-300 text-sm font-medium">-</td>
                ))}
              </tr>

              {/* Entry Fees spec */}
              <tr className="border-b border-gray-50">
                <td className="py-5 font-bold text-sm text-gray-400 flex items-center gap-1.5">
                  <DollarSign size={16} className="text-green-600" /> Entrance Tickets
                </td>
                {compareList.map((place) => (
                  <td key={place.id} className="py-5 px-4 text-sm font-semibold text-gray-700">
                    {place.fee || "Nominal entry charge"}
                  </td>
                ))}
                {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                  <td key={i} className="py-5 px-4 text-gray-300 text-sm font-medium">-</td>
                ))}
              </tr>

              {/* Description spec */}
              <tr className="border-b border-gray-50">
                <td className="py-5 font-bold text-sm text-gray-400">Cultural Description</td>
                {compareList.map((place) => (
                  <td key={place.id} className="py-5 px-4 text-xs font-semibold text-gray-500 leading-relaxed max-w-xs">
                    {place.description}
                  </td>
                ))}
                {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                  <td key={i} className="py-5 px-4 text-gray-300 text-sm font-medium">-</td>
                ))}
              </tr>

              {/* Navigation Actions */}
              <tr>
                <td className="py-5"></td>
                {compareList.map((place) => (
                  <td key={place.id} className="py-5 px-4">
                    <Link 
                      href={`/district/${place.stateId}/${place.districtId}`}
                      className="btn-secondary px-4 py-2 rounded-xl text-xs font-bold text-white inline-flex items-center gap-1"
                    >
                      Travel Hub <ExternalLink size={12} />
                    </Link>
                  </td>
                ))}
                {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                  <td key={i} className="py-5 px-4"></td>
                ))}
              </tr>

            </tbody>
          </table>

        </div>
      )}
    </motion.div>
  );
}
