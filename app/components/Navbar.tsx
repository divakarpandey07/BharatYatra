"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchBar from './SearchBar';
import { Map, Compass, Bot, Heart, Layers } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full glass-panel border-x-0 border-t-0 rounded-none px-6 py-4 sticky top-0 z-50 flex items-center justify-between bg-white/95 transition-all duration-300">
      <Link href="/" className="flex items-center gap-2">
        <Compass className="text-accent-primary animate-pulse" size={30} />
        <span className="text-2xl font-black text-gradient tracking-wide">भारत<span className="text-[var(--accent-primary)] font-serif">Yatra</span></span>
      </Link>
      
      {/* Centered Search Bar */}
      <div className="flex-1 mx-8 max-w-md hidden lg:block">
        <SearchBar />
      </div>

      {/* Nav Menu */}
      <div className="flex items-center gap-5 text-sm font-bold text-gray-600">
        <Link 
          href="/states" 
          className={`flex items-center gap-1.5 hover:text-accent-primary transition-colors hover:scale-105 transform ${pathname === '/states' ? 'text-accent-primary' : ''}`}
        >
          <Map size={16} /> States
        </Link>
        
        <Link 
          href="/wishlist" 
          className={`flex items-center gap-1.5 hover:text-accent-primary transition-colors hover:scale-105 transform ${pathname === '/wishlist' ? 'text-accent-primary' : ''}`}
        >
          <Heart size={16} /> Wishlist
        </Link>

        <Link 
          href="/compare" 
          className={`flex items-center gap-1.5 hover:text-accent-primary transition-colors hover:scale-105 transform ${pathname === '/compare' ? 'text-accent-primary' : ''}`}
        >
          <Layers size={16} /> Compare
        </Link>
      </div>
    </nav>
  );
}

