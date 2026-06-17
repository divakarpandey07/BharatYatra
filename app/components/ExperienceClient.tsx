"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, ArrowLeft } from 'lucide-react';

export default function ExperienceClient({ data }: { data: any }) {
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-secondary)] pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Experience Not Found</h1>
          <Link href="/" className="text-[var(--accent-primary)] hover:underline flex items-center justify-center gap-2">
            <ArrowLeft size={20} /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] pt-20 pb-24">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <Image 
          src={data.heroImage} 
          alt={data.title} 
          fill
          priority
          className="object-cover absolute inset-0"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight drop-shadow-lg"
          >
            {data.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-2xl drop-shadow-md font-medium"
          >
            {data.description}
          </motion.p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-black text-gray-900">Featured Destinations</h2>
          <Link href="/" className="text-gray-500 hover:text-[var(--accent-primary)] flex items-center gap-2 transition-colors font-medium">
            <ArrowLeft size={18} /> Back
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.destinations.map((dest: any, i: number) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
            >
              <Link href={`/states/${dest.slug}`} className="group relative block h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg">
                <Image 
                  src={dest.img} 
                  alt={dest.title || dest.name} 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                
                {/* Tag */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                  {dest.tag}
                </div>

                <div className="absolute bottom-0 left-0 p-6 w-full transform transition-transform duration-300 group-hover:-translate-y-2">
                  <h3 className="text-white text-3xl font-black mb-2 tracking-tight">{dest.name}</h3>
                  <p className="text-gray-300 text-sm flex items-center gap-1 font-medium">
                    <MapPin size={16} className="text-[var(--accent-primary)]" /> 
                    {dest.state}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
