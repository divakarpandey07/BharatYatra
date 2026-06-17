"use client";

import Link from 'next/link';
import { Compass, Twitter, Facebook, Instagram, Youtube, Map, Heart, Mail, Send, ChevronRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full relative mt-20 overflow-hidden text-gray-100 border-t border-gray-800">
      {/* Background Image - Kerala Backwaters */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1920&q=80')" }}
      ></div>
      
      {/* Light Overlay - Kept the brighter 30% version with glass blur */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[6px]"></div>

      {/* Decorative gradient glowing orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-[var(--accent-primary)] opacity-30 blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-4">
            <Link href="/" className="flex items-center gap-2 mb-6 group inline-flex">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--accent-primary)] to-orange-400 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-shadow">
                <Compass className="text-white" size={24} />
              </div>
              <span className="text-2xl font-black text-white tracking-wide">भारत<span className="text-[var(--accent-primary)] font-serif">Yatra</span></span>
            </Link>
            <p className="text-sm text-gray-400 mb-8 leading-relaxed pr-4">
              Your ultimate intelligent travel companion. Discover the heritage, vibrant cultures, and majestic landscapes of Incredible India like never before.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "https://www.instagram.com/_bairagii/" },
                { icon: Youtube, href: "#" }
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <a key={i} href={item.href} target={item.href !== "#" ? "_blank" : undefined} rel={item.href !== "#" ? "noopener noreferrer" : undefined} className="w-10 h-10 rounded-full bg-gray-900/60 border border-gray-800/80 backdrop-blur-md flex items-center justify-center text-gray-300 hover:text-white hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/20">
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-2 md:col-start-6">
            <h4 className="text-white font-bold mb-6 tracking-wide">Explore</h4>
            <ul className="flex flex-col gap-4 text-sm">
              {[
                { name: 'All States', icon: Map, href: '/states' },
                { name: 'AI Itinerary', icon: Compass, href: '/planner' },
                { name: 'Compare Places', icon: Map, href: '/compare' },
                { name: 'My Wishlist', icon: Heart, href: '/wishlist' },
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="group flex items-center gap-2 text-gray-400 hover:text-[var(--accent-primary)] transition-colors">
                    <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[var(--accent-primary)]" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white font-bold mb-6 tracking-wide">Themes</h4>
            <ul className="flex flex-col gap-4 text-sm">
              {['Spiritual Journeys', 'Heritage Monuments', 'Nature & Wildlife', 'Adventure Trails'].map((theme, i) => (
                <li key={i}>
                  <Link href="#" className="group flex items-center gap-2 text-gray-400 hover:text-[var(--accent-primary)] transition-colors">
                    <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[var(--accent-primary)]" />
                    <span>{theme}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1 md:col-span-3">
            <h4 className="text-white font-bold mb-6 tracking-wide">Stay Updated</h4>
            <p className="text-sm text-gray-400 mb-6">
              Subscribe to get the latest travel tips and hidden gems of India directly in your inbox.
            </p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-gray-900 border border-gray-800 text-white text-sm rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all placeholder:text-gray-600"
              />
              <button className="absolute right-2 top-2 w-8 h-8 rounded-lg bg-gradient-to-tr from-[var(--accent-primary)] to-orange-400 flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                <Send size={14} className="ml-1" />
              </button>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-800/50 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} भारतYatra. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
