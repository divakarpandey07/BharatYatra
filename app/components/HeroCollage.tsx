"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const IMAGES = {
  center: [
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80", // Taj Mahal (Only one)
    "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80", // Hawa Mahal, Jaipur
    "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80", // Munnar Tea Gardens
    "https://images.unsplash.com/photo-1589136777351-fdc9c9cb1563?auto=format&fit=crop&w=800&q=80", // Gateway of India, Mumbai
    "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80", // Varanasi Ghats
    "https://images.unsplash.com/photo-1585506942812-e72e4d78b0d1?auto=format&fit=crop&w=800&q=80", // Red Fort, Delhi
  ],
  topLeft: [
    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80", // Kerala Backwaters
    "https://images.unsplash.com/photo-1514222325258-751bd0b54e79?auto=format&fit=crop&w=600&q=80", // Rishikesh
    "https://images.unsplash.com/photo-1615966650071-855b15fba696?auto=format&fit=crop&w=600&q=80", // Goa Beach
    "https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=600&q=80", // Darjeeling toy train/hills
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80", // Hampi Ruins
    "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=600&q=80", // Udaipur Lake Palace
  ],
  bottomRight: [
    "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80", // Rajasthan Desert / Camel
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80", // Leh Ladakh
    "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80", // Golden Temple, Amritsar
    "https://images.unsplash.com/photo-1513346940221-6f673d962e97?auto=format&fit=crop&w=600&q=80", // Charminar, Hyderabad
    "https://images.unsplash.com/photo-1571536802807-3cab46e14af4?auto=format&fit=crop&w=600&q=80", // Sikkim Mountains
    "https://images.unsplash.com/photo-1523365922096-7c70c0cbf837?auto=format&fit=crop&w=600&q=80", // Mysore Palace illuminated
  ]
};

export default function HeroCollage() {
  const [index, setIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const rafRef = useRef<number | null>(null);

  // Rotate images every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.center.length);
    }, 4000);
    return () => {
      clearInterval(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Handle mouse movement for parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    
    if (rafRef.current) return;
    
    rafRef.current = requestAnimationFrame(() => {
      setMousePos({ x, y });
      rafRef.current = null;
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 }); 
  };

  return (
    <div 
      className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center overflow-visible"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Decorative Blob */}
      <motion.div
        animate={{ 
          x: mousePos.x * 20, 
          y: mousePos.y * 20 
        }}
        transition={{ type: 'spring', damping: 50, stiffness: 100 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[var(--accent-primary)] rounded-full blur-3xl opacity-20 -z-10 pointer-events-none"
      ></motion.div>

      {/* Top Left Image Sequence */}
      <motion.div
        onMouseEnter={() => setHoveredImage('topLeft')}
        onMouseLeave={() => setHoveredImage(null)}
        animate={{ 
          x: mousePos.x * -30, 
          y: mousePos.y * -30,
          rotate: hoveredImage === 'topLeft' ? 0 : -10 + (mousePos.x * 5),
          scale: hoveredImage === 'topLeft' ? 1.1 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 80 }}
        className="absolute w-40 h-48 md:w-56 md:h-64 top-8 md:top-12 left-4 md:left-12 drop-shadow-xl cursor-pointer"
        style={{ 
          transformOrigin: 'center',
          zIndex: hoveredImage === 'topLeft' ? 50 : 20
        }}
      >
        <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white bg-gray-100 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={IMAGES.topLeft[index]}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full object-cover absolute inset-0"
              alt="India Travel"
              onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80" }}
            />
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Bottom Right Image Sequence */}
      <motion.div
        onMouseEnter={() => setHoveredImage('bottomRight')}
        onMouseLeave={() => setHoveredImage(null)}
        animate={{ 
          x: mousePos.x * 40, 
          y: mousePos.y * 40,
          rotate: hoveredImage === 'bottomRight' ? 0 : 8 - (mousePos.x * 5),
          scale: hoveredImage === 'bottomRight' ? 1.1 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 90 }}
        className="absolute w-44 h-52 md:w-56 md:h-64 bottom-8 md:bottom-12 right-4 md:right-12 drop-shadow-xl cursor-pointer"
        style={{ 
          transformOrigin: 'center',
          zIndex: hoveredImage === 'bottomRight' ? 50 : 20
        }}
      >
        <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white bg-gray-100 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={IMAGES.bottomRight[index]}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full object-cover absolute inset-0"
              alt="India Travel"
              onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80" }}
            />
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Center Main Image Sequence */}
      <motion.div
        onMouseEnter={() => setHoveredImage('center')}
        onMouseLeave={() => setHoveredImage(null)}
        animate={{ 
          x: mousePos.x * 15, 
          y: mousePos.y * 15,
          rotate: hoveredImage === 'center' ? 0 : -2 + (mousePos.x * 2),
          scale: hoveredImage === 'center' ? 1.1 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 100 }}
        className="absolute w-48 h-64 md:w-64 md:h-80 drop-shadow-2xl cursor-pointer"
        style={{ 
          transformOrigin: 'center',
          zIndex: hoveredImage === 'center' ? 50 : 30
        }}
      >
        <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white bg-gray-100 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={IMAGES.center[index]}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full object-cover absolute inset-0"
              alt="India Travel"
              onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80" }}
            />
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
