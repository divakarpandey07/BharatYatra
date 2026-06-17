"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Trash2, 
  MapPin, 
  Volume2, 
  VolumeX, 
  Compass, 
  Heart,
  ExternalLink 
} from 'lucide-react';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = JSON.parse(localStorage.getItem('bharatyatra_wishlist') || '[]');
      setWishlist(saved);
    }
  }, []);

  const handleRemove = (id: string) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    localStorage.setItem('bharatyatra_wishlist', JSON.stringify(updated));
    if (playingId === id) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
    }
  };

  const handlePlayAudio = (id: string, text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert("Voice narration is not supported in this browser.");
      return;
    }

    if (playingId === id) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
    } else {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/\[\d+\]/g, "");
      const utterance = new SpeechSynthesisUtterance(cleanText.substring(0, 300));
      utterance.rate = 0.95;
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);
      window.speechSynthesis.speak(utterance);
      setPlayingId(id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page-container p-4 md:p-8 max-w-7xl mx-auto"
    >
      {/* Navigation Header */}
      <div className="mb-6">
        <Link href="/" className="btn glass-panel inline-flex items-center gap-2 py-2.5 bg-white text-gray-700">
          <ArrowLeft size={18} /> Back to Map
        </Link>
      </div>

      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3.5 bg-red-50 text-red-500 rounded-2xl mb-4 border border-red-100 shadow-sm animate-pulse">
          <Heart size={36} fill="currentColor" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">My Saved Wishlist</h1>
        <p className="text-base text-gray-500 max-w-2xl mx-auto font-medium">
          Review your saved cultural monuments, tourist sites, and planning hubs. You can listen to their descriptions directly or open their active districts.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 glass-panel bg-white border border-gray-100 max-w-xl mx-auto rounded-3xl p-8">
          <Heart className="mx-auto text-gray-300 mb-4" size={48} />
          <h3 className="text-xl font-bold text-gray-700 mb-2">Your Wishlist is Empty</h3>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            Click the heart button on tourist place cards to bookmark your favorite temples, forts, and gardens.
          </p>
          <Link href="/states" className="btn btn-primary">
            Browse Heritage Sites
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {wishlist.map((place) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-panel h-full flex flex-col bg-white overflow-hidden border border-gray-100 hover:shadow-md transition-all"
              >
                {/* Place banner */}
                <div className="h-48 relative overflow-hidden bg-gray-100">
                  <Image 
                    src={place.image} 
                    alt={place.name} 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-black/60 text-white font-bold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider backdrop-blur-sm">
                    {place.districtName}
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 flex flex-col flex-grow">
                  <span className="text-[10px] text-accent-primary font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                    <MapPin size={11} /> {place.stateName}
                  </span>
                  <h3 className="text-lg font-extrabold text-gray-800 mb-2 line-clamp-1">{place.name}</h3>
                  
                  <p className="text-xs text-gray-500 font-medium leading-relaxed flex-grow line-clamp-3 mb-5">
                    {place.description}
                  </p>

                  <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-2 justify-between items-center mt-auto">
                    {/* Audio read */}
                    <button
                      onClick={() => handlePlayAudio(place.id, place.description)}
                      className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1 transition-all ${
                        playingId === place.id 
                          ? 'bg-red-500 border-red-500 text-white' 
                          : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      {playingId === place.id ? <VolumeX size={14} /> : <Volume2 size={14} />}
                      {playingId === place.id ? "Stop" : "AI Voice"}
                    </button>

                    <div className="flex gap-2">
                      {/* Delete */}
                      <button
                        onClick={() => handleRemove(place.id)}
                        className="p-2 bg-red-50 hover:bg-red-100 text-red-500 border border-red-100 rounded-xl transition-all"
                        title="Remove Bookmark"
                      >
                        <Trash2 size={14} />
                      </button>

                      {/* Explore district link */}
                      <Link 
                        href={`/district/${place.stateId}/${place.districtId}`}
                        className="btn-secondary px-3.5 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1"
                      >
                        <Compass size={12} /> Travel Hub <ExternalLink size={10} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
