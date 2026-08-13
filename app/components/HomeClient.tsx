"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { MapPin, ArrowRight, TrendingUp, Compass, Palette } from 'lucide-react';
import indiaMapData from '@svg-maps/india';
import dynamic from 'next/dynamic';
const AITravelArchitect = dynamic(() => import('./AITravelArchitect'), {
  loading: () => <div className="animate-pulse bg-zinc-800/50 rounded-2xl h-96 w-full flex items-center justify-center border border-white/5"><div className="text-zinc-500">Loading AI Assistant...</div></div>,
  ssr: false
});
import HeroCollage from './HeroCollage';

interface StateHoverInfo {
  id: string;
  name: string;
  description: string;
  districtsCount: number;
}

interface TrendingState {
  id: string;
  name: string;
  districtsCount: number;
}

interface HomeClientProps {
  hoverStatesData: StateHoverInfo[];
  trendingStates: TrendingState[];
}

export default function HomeClient({ hoverStatesData, trendingStates }: HomeClientProps) {
  const router = useRouter();
  const [hoveredState, setHoveredState] = useState<any>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [theme, setTheme] = useState('default');

  useEffect(() => {
    if (theme === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const handleStateClick = (stateName: string) => {
    const normalizedMapName = stateName.toLowerCase().trim();
    const matchedState = hoverStatesData.find(s => {
      const normalStateName = s.name.toLowerCase().trim();
      return normalStateName === normalizedMapName || 
             normalStateName.includes(normalizedMapName) || 
             normalizedMapName.includes(normalStateName);
    });

    if (matchedState) {
      router.push(`/states/${matchedState.id}`);
    } else {
      const fallbackId = stateName.toLowerCase().replace(/[\s&]+/g, '-').replace(/-+/g, '-');
      router.push(`/states/${fallbackId}`);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent, stateName: string) => {
    const normalizedMapName = stateName.toLowerCase().trim();
    const matchedState = hoverStatesData.find(s => {
      const normalStateName = s.name.toLowerCase().trim();
      return normalStateName === normalizedMapName || 
             normalStateName.includes(normalizedMapName) || 
             normalizedMapName.includes(normalStateName);
    });

    const info = matchedState ? {
      name: matchedState.name,
      districtsCount: matchedState.districtsCount,
      description: matchedState.description,
      capital: getCapitalName(matchedState.name)
    } : {
      name: stateName,
      districtsCount: 0,
      description: "Discover the heritage of this region.",
      capital: "N/A"
    };

    setHoveredState(info);
  };

  const rafId = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (rafId.current) return;
    const x = e.clientX;
    const y = e.clientY;
    rafId.current = requestAnimationFrame(() => {
      setMousePos({ x, y });
      rafId.current = null;
    });
  };

  const handleMouseLeave = () => {
    setHoveredState(null);
  };

  const getCapitalName = (state: string) => {
    const capitals: Record<string, string> = {
      "Maharashtra": "Mumbai", "Rajasthan": "Jaipur", "Karnataka": "Bengaluru", 
      "Uttar Pradesh": "Lucknow", "Tamil Nadu": "Chennai", "Gujarat": "Gandhinagar",
      "Kerala": "Thiruvananthapuram", "West Bengal": "Kolkata", "Goa": "Panaji",
      "Uttarakhand": "Dehradun", "Himachal Pradesh": "Shimla"
    };
    return capitals[state] || "State Headquarters";
  };

  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden transition-colors duration-500">
      
      {/* THEME SWITCHER */}
      <div className="absolute top-4 right-8 z-40 flex items-center gap-3 glass-panel px-4 py-2">
        <Palette size={18} className="text-[var(--accent-primary)]" />
        <span className="text-sm font-semibold text-gray-700">Theme:</span>
        <button onClick={() => setTheme('default')} className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${theme === 'default' ? 'bg-[var(--accent-primary)] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Heritage</button>
        <button onClick={() => setTheme('diwali')} className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${theme === 'diwali' ? 'bg-[#FF8C00] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Diwali</button>
        <button onClick={() => setTheme('holi')} className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${theme === 'holi' ? 'bg-[#FF1493] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Holi</button>
        <button onClick={() => setTheme('tricolor')} className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${theme === 'tricolor' ? 'bg-[#138808] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Tricolor</button>
      </div>

      {/* HERO SECTION WITH 3D SCENE */}
      <div className="w-full max-w-7xl px-6 md:px-12 pt-20 pb-12 flex flex-col md:flex-row items-center justify-between min-h-[70vh]">
        
        {/* Left Content */}
        <div className="flex-1 z-10">
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-black mb-6 tracking-tight text-gray-900"
          >
            भारत<span className="text-gradient">Yatra</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-lg mb-8 leading-relaxed font-light"
          >
            Experience the rich heritage, majestic landscapes, and vibrant cultures of India. Embark on a journey curated by intelligence.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-4"
          >
            <button onClick={() => document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 bg-[var(--accent-primary)] hover:opacity-90 text-white font-semibold rounded-full shadow-lg transition-all transform hover:-translate-y-1">
              Explore Map
            </button>
            <Link href="/planner" className="px-8 py-3 glass-panel hover:bg-white/50 text-[var(--text-primary)] font-semibold rounded-full shadow-sm transition-all flex items-center gap-2">
              <Compass size={18} className="text-[var(--accent-primary)]"/> AI Assistant
            </Link>
          </motion.div>
        </div>

        {/* Right Hero Collage */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="flex-1 w-full relative z-0 mt-12 md:mt-0"
        >
          <HeroCollage />
        </motion.div>
      </div>

      {/* Global Floating AI Chatbot */}
      <AITravelArchitect />

      {/* INTERACTIVE MAP SECTION */}
      <div id="map-section" className="w-full max-w-7xl mx-auto px-4 md:px-8 py-24 flex flex-col items-center z-10 relative mt-12 mb-12">
        {/* Background Decorative Mesh for Map Section */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-100/40 via-transparent to-transparent pointer-events-none -z-10 rounded-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent pointer-events-none -z-10 rounded-3xl"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full relative">
          
          {/* Left Column: Interactive Map */}
          <div className="lg:col-span-8 flex flex-col items-center p-8 md:p-12 rounded-[2rem] bg-white/80 backdrop-blur-xl border border-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] relative overflow-hidden group">
            {/* Subtle glow behind the map */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[var(--accent-primary)]/5 rounded-full blur-[100px] pointer-events-none transition-all duration-1000 group-hover:bg-[var(--accent-primary)]/10"></div>
            
            <div className="flex items-center gap-3 mb-8 w-full text-left relative z-10">
              <div className="p-3 bg-[var(--accent-primary)]/10 rounded-xl">
                <Compass className="text-[var(--accent-primary)]" size={28} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Interactive Map</h2>
                <p className="text-gray-500 text-sm font-medium mt-1">Hover and click to explore regions</p>
              </div>
            </div>
            <div className="relative w-full max-w-[650px] z-10">
              <svg 
                viewBox={indiaMapData.viewBox} 
                className="india-svg-map w-full h-auto drop-shadow-2xl filter transition-all duration-500 hover:drop-shadow-[0_15px_35px_rgba(255,140,0,0.15)]"
              >
                {indiaMapData.locations.map((loc: any) => (
                  <path
                    key={loc.id}
                    d={loc.path}
                    id={loc.id}
                    name={loc.name}
                    onClick={() => handleStateClick(loc.name)}
                    onMouseEnter={(e) => handleMouseEnter(e, loc.name)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="transition-all duration-300 hover:fill-[var(--accent-primary)] hover:stroke-[var(--accent-primary)] cursor-pointer"
                    fill="var(--bg-secondary)"
                    stroke="var(--accent-tertiary)"
                    strokeWidth="1.5"
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* Right Column: Trending States */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="p-8 rounded-[2rem] bg-white/80 backdrop-blur-xl border border-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-primary)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              
              <div className="flex justify-between items-center mb-8 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[var(--accent-primary)] text-white rounded-xl shadow-lg shadow-[var(--accent-primary)]/30">
                    <TrendingUp size={20} />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900">Top States</h3>
                </div>
                <Link href="/states" className="text-sm font-bold text-[var(--accent-primary)] hover:text-orange-700 transition-colors flex items-center gap-1 group">
                  All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="flex flex-col gap-4 relative z-10">
                {trendingStates.map((state: any, index: number) => (
                  <Link href={`/states/${state.id}`} key={state.id}>
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="group relative p-5 bg-gray-50/50 hover:bg-white border border-gray-100 hover:border-[var(--accent-primary)]/30 rounded-2xl transition-all duration-300 cursor-pointer flex items-center justify-between shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden"
                    >
                      {/* Left Accent Bar on Hover */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--accent-primary)] to-orange-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-orange-100 text-[var(--accent-primary)] flex items-center justify-center font-bold text-lg group-hover:bg-[var(--accent-primary)] group-hover:text-white transition-colors duration-300">
                          {state.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900 group-hover:text-[var(--accent-primary)] transition-colors text-lg tracking-tight">{state.name}</span>
                          <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                            <MapPin size={10} /> {state.districtsCount} Districts
                          </span>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white border border-gray-100 group-hover:border-[var(--accent-primary)]/30 group-hover:bg-orange-50 flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow">
                        <ArrowRight size={14} className="text-gray-400 group-hover:text-[var(--accent-primary)] transition-colors duration-300" />
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Floating State Information Tooltip */}
      <AnimatePresence>
        {hoveredState && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed pointer-events-none z-50 p-6 bg-white/90 backdrop-blur-2xl border border-white/50 max-w-sm rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)]"
            style={{ 
              left: mousePos.x + 25, 
              top: mousePos.y + 25 
            }}
          >
            {/* Tooltip Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[var(--accent-primary)]/10 rounded-xl">
                  <MapPin className="text-[var(--accent-primary)]" size={24} />
                </div>
                <h4 className="font-black text-gray-900 text-2xl tracking-tight leading-none">{hoveredState.name}</h4>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-5 leading-relaxed font-medium">
              {hoveredState.description}
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50/80 hover:bg-gray-50 p-3 rounded-2xl border border-gray-100 transition-colors">
                <span className="flex items-center gap-1 text-[10px] text-gray-400 uppercase font-bold mb-1 tracking-wider"><Compass size={10}/> Capital</span>
                <span className="text-sm font-bold text-gray-900 truncate block">{hoveredState.capital}</span>
              </div>
              <div className="bg-gray-50/80 hover:bg-gray-50 p-3 rounded-2xl border border-gray-100 transition-colors">
                <span className="flex items-center gap-1 text-[10px] text-gray-400 uppercase font-bold mb-1 tracking-wider"><TrendingUp size={10}/> Districts</span>
                <span className="text-sm font-bold text-gray-900 block">{hoveredState.districtsCount}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FEATURES & HIGHLIGHTS SECTION */}
      <div className="w-full relative z-10 py-24 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-orange-50/30 to-transparent -z-10"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-orange-200/20 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-200/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20 relative">
            <span className="px-4 py-1.5 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] text-sm font-bold tracking-widest uppercase mb-4 inline-block">Platform Features</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Why Choose <span className="text-gradient">भारत<span className="text-[var(--accent-primary)] font-serif">Yatra</span></span>?</h2>
            <p className="text-lg md:text-xl text-gray-600 font-medium">Discover what makes our intelligent travel platform the perfect companion for your Indian adventures.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                title: "AI-Powered Itineraries",
                desc: "Our advanced AI Assistant crafts personalized day-by-day travel plans, estimating costs, best times, and routes based on your preferences.",
                icon: <Compass size={32} />,
                color: "orange",
                gradient: "from-orange-500 to-amber-400",
                bg: "bg-orange-50",
                text: "text-orange-600"
              },
              {
                title: "Interactive 3D Maps",
                desc: "Explore India's diverse geography visually through our stylized, engaging 3D globes and interactive SVG state maps.",
                icon: <MapPin size={32} />,
                color: "green",
                gradient: "from-emerald-500 to-teal-400",
                bg: "bg-green-50",
                text: "text-emerald-600"
              },
              {
                title: "Data-Driven Insights",
                desc: "We leverage large datasets to provide genuine reviews, entry fees, and accurate travel tips for every popular attraction.",
                icon: <TrendingUp size={32} />,
                color: "blue",
                gradient: "from-blue-600 to-indigo-500",
                bg: "bg-blue-50",
                text: "text-blue-600"
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="group relative bg-white rounded-[2rem] p-10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden text-center flex flex-col items-center"
              >
                {/* Hover Top Glow */}
                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Icon Container */}
                <div className={`w-24 h-24 rounded-[2rem] ${feature.bg} ${feature.text} flex items-center justify-center mb-8 relative transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}>
                  {/* Subtle blur behind icon */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20 rounded-[2rem] blur-xl transition-opacity duration-500 group-hover:opacity-40`}></div>
                  <div className="relative z-10">
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-gray-800 transition-colors tracking-tight">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* DESTINATIONS GALLERY */}
      <div className="w-full bg-white py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Trending Destinations</h2>
              <p className="text-gray-600 text-lg">Explore the most visited places in India right now.</p>
            </div>
            <Link href="/states" className="flex items-center gap-2 text-[var(--accent-primary)] font-bold hover:underline">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Varanasi", state: "Uttar Pradesh", img: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80" },
              { title: "Jaipur", state: "Rajasthan", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80" },
              { title: "Munnar", state: "Kerala", img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80" },
              { title: "Leh Ladakh", state: "Ladakh", img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80" }
            ].map((dest, i) => (
              <div key={i} className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg">
                <Image src={dest.img} alt={dest.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full transform transition-transform duration-300 group-hover:-translate-y-2">
                  <h3 className="text-white text-2xl font-bold mb-1">{dest.title}</h3>
                  <p className="text-gray-300 text-sm flex items-center gap-1"><MapPin size={14}/> {dest.state}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TRAVEL CATEGORIES */}
      <div className="w-full bg-[var(--bg-secondary)] py-24 relative z-10 border-t border-[var(--glass-border)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16 relative">
            <span className="px-4 py-1.5 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] text-sm font-bold tracking-widest uppercase mb-4 inline-block">Curated Journeys</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Travel By Experience</h2>
            <p className="text-lg md:text-xl text-gray-600 font-medium">Discover tailored journeys based on what you love to do.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { 
                name: "Spiritual", 
                desc: "Find inner peace",
                img: "https://commons.wikimedia.org/wiki/Special:FilePath/Shri_Kashi_Vishwanath_Temple.jpg" // Genuine Kashi Vishwanath Temple
              },
              { 
                name: "Adventure", 
                desc: "Thrill & excitement",
                img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80"
              },
              { 
                name: "Heritage", 
                desc: "Ancient wonders",
                img: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80"
              },
              { 
                name: "Nature", 
                desc: "Escape to the wild",
                img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80"
              },
              {
                name: "Academic",
                desc: "Centers of learning",
                img: "https://commons.wikimedia.org/wiki/Special:FilePath/Main%20building%20in%20IIT%20Bombay.jpg"
              }
            ].map((cat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <Link href={`/experiences/${cat.name.toLowerCase()}`} className="group relative block h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
                  <Image src={cat.img} alt={cat.name} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  
                  {/* Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                    <h3 className="text-white text-3xl font-black mb-2 tracking-tight">{cat.name}</h3>
                    <p className="text-gray-300 font-medium flex items-center gap-2">
                      <span>{cat.desc}</span>
                      <motion.span 
                        className="inline-block"
                        initial={{ x: -5, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 + (i * 0.15) }}
                      >
                        →
                      </motion.span>
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="w-full bg-white py-20 relative z-10 border-t border-[var(--glass-border)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">Traveler Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Priya Sharma", role: "Solo Traveler", text: "BharatYatra made planning my 3-week trip to Rajasthan incredibly easy. The AI planner suggested hidden gems I would have missed!", avatar: "https://i.pravatar.cc/150?img=47" },
              { name: "Rahul Desai", role: "Family Vacationer", text: "The interactive map is stunning. We explored Kerala virtually before booking our tickets. Highly recommend the AI itinerary feature.", avatar: "https://i.pravatar.cc/150?img=11" },
              { name: "Aditi Rao", role: "Backpacker", text: "I've used many travel sites, but the cultural insights and heritage themes here are unique. The Diwali theme looks gorgeous!", avatar: "https://i.pravatar.cc/150?img=5" }
            ].map((testimonial, i) => (
              <div key={i} className="p-8 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-all relative">
                <div className="text-4xl text-[var(--accent-primary)] opacity-20 absolute top-4 right-6 font-serif">"</div>
                <p className="text-gray-600 mb-6 italic relative z-10">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <Image src={testimonial.avatar} alt={testimonial.name} width={48} height={48} className="rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* EXPERIENCE THE MAGIC SECTION */}
      <div className="w-full bg-[var(--bg-secondary)] py-20 border-y border-[var(--glass-border)] relative z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-primary)] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-600 opacity-5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">Start Your Journey with intelligent precision.</h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed font-medium">
              Don't just travel, experience. Ask our floating AI Travel Architect in the bottom right corner for a custom trip plan, or dive straight into the map to explore 700+ districts across India.
            </p>
            <Link href="/planner" className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-full shadow-xl transition-all transform hover:-translate-y-1">
              Talk to AI Assistant <ArrowRight size={20} />
            </Link>
          </div>
          <div className="flex-1 relative w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden glass-panel border-4 border-white shadow-2xl group">
            <Image src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80" alt="India Travel Journey" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
              <div>
                <h3 className="text-white text-3xl font-bold font-serif mb-2">Taj Mahal, Agra</h3>
                <p className="text-gray-200 text-sm font-medium">A testament to eternal love and architectural brilliance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
