"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  Search, 
  Calendar, 
  Clock, 
  DollarSign, 
  CloudRain, 
  Info, 
  Compass, 
  Utensils, 
  ShoppingBag, 
  AlertTriangle, 
  Volume2, 
  VolumeX, 
  Heart, 
  Layers, 
  Eye 
} from 'lucide-react';
import PlaceModal from './PlaceModal';
import RotatingImage from './RotatingImage';
import ImageCarousel from './ImageCarousel';
import { customDistricts } from '../../src/data/customDistricts';

interface DistrictClientProps {
  stateData: any;
  districtData: any;
  specificCustomDistricts?: any[];
}

const fallbackLocalImage = "https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=800&q=80";

export default function DistrictClient({ stateData, districtData, specificCustomDistricts }: DistrictClientProps) {
  const params = { stateId: stateData?.id || '', districtId: districtData?.id || '' };
  
  // Use passed data directly with 0 delay and 0 Wikipedia querying
  const initialPlaces = specificCustomDistricts && specificCustomDistricts.length > 0 
    ? specificCustomDistricts 
    : (customDistricts[params.districtId] || []);

  const [wikiPlaces, setWikiPlaces] = useState<any[]>(initialPlaces);
  const [loading, setLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [activeTourImage, setActiveTourImage] = useState<string | null>(null);
  const [activeTourName, setActiveTourName] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [activeSubTab, setActiveSubTab] = useState<'attractions' | 'food' | 'shopping' | 'guide'>('attractions');

  useEffect(() => {
    if (specificCustomDistricts && specificCustomDistricts.length > 0) {
      setWikiPlaces(specificCustomDistricts);
    } else if (customDistricts[params.districtId]) {
      setWikiPlaces(customDistricts[params.districtId]);
    }
  }, [specificCustomDistricts, params.districtId]);

  // Load Saved Wishlist & Compare Items on Mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedWishlist = JSON.parse(localStorage.getItem('bharatyatra_wishlist') || '[]');
      setWishlistIds(savedWishlist.map((item: any) => item.id));

      const savedCompare = JSON.parse(localStorage.getItem('bharatyatra_compare') || '[]');
      setCompareIds(savedCompare.map((item: any) => item.id));
    }
  }, []);

  // Fetch Live Weather silently in background without blocking UI or showing Wikipedia loading screen
  useEffect(() => {
    if (!districtData || !stateData) return;

    const fetchWeather = async () => {
      try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(districtData.name + " " + stateData.name)}&count=1&language=en&format=json`;
        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();

        if (geoData.results && geoData.results.length > 0) {
          const { latitude, longitude } = geoData.results[0];
          const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
          const wData = await weatherRes.json();
          setWeatherData(wData.current_weather);
        }
      } catch (e) {
        // Silent catch weather error
      }
    };

    fetchWeather();
  }, [districtData, stateData]);

  if (!districtData) {
    return <div className="page-container p-10 text-center text-red-500 font-bold bg-white">District not found.</div>;
  }

  // AI Voice Narrator
  const handlePlayAudio = (id: string, text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert("Speech synthesis is not supported in this browser.");
      return;
    }

    if (playingId === id) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
    } else {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/\[\d+\]/g, "");
      const utterance = new SpeechSynthesisUtterance(cleanText.substring(0, 300));
      
      utterance.rate = 0.9;
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);
      
      window.speechSynthesis.speak(utterance);
      setPlayingId(id);
    }
  };

  // Toggle wishlist item
  const handleWishlistToggle = (place: any) => {
    const list = JSON.parse(localStorage.getItem('bharatyatra_wishlist') || '[]');
    const isSaved = list.some((item: any) => item.id === place.id);
    let newList;
    if (isSaved) {
      newList = list.filter((item: any) => item.id !== place.id);
      setWishlistIds(prev => prev.filter(id => id !== place.id));
    } else {
      const wishItem = {
        id: place.id,
        name: place.name,
        description: place.description?.substring(0, 150) + "...",
        image: place.image,
        stateId: params.stateId,
        districtId: params.districtId,
        stateName: stateData.name,
        districtName: districtData.name
      };
      newList = [...list, wishItem];
      setWishlistIds(prev => [...prev, place.id]);
    }
    localStorage.setItem('bharatyatra_wishlist', JSON.stringify(newList));
  };

  // Toggle compare item
  const handleCompareToggle = (place: any) => {
    const list = JSON.parse(localStorage.getItem('bharatyatra_compare') || '[]');
    const isCompared = list.some((item: any) => item.id === place.id);
    let newList;
    
    if (isCompared) {
      newList = list.filter((item: any) => item.id !== place.id);
      setCompareIds(prev => prev.filter(id => id !== place.id));
    } else {
      if (list.length >= 3) {
        alert("You can compare up to 3 destinations at a time.");
        return;
      }
      const compItem = {
        id: place.id,
        name: place.name,
        description: place.description?.substring(0, 150) + "...",
        image: place.image,
        stateId: params.stateId,
        districtId: params.districtId,
        stateName: stateData.name,
        districtName: districtData.name,
        fee: place.fee || place.entryFee,
        timing: place.timing || place.openingTime,
        bestTime: place.bestTime || place.bestSeason
      };
      newList = [...list, compItem];
      setCompareIds(prev => [...prev, place.id]);
    }
    localStorage.setItem('bharatyatra_compare', JSON.stringify(newList));
  };

  // Weather Advisory Level Helper
  const getWeatherAdvisory = (temp: number) => {
    if (temp >= 40) return { text: "Extremely Hot. Avoid mid-day sun. Pack hydration and light clothing.", color: "text-red-600 bg-red-50 border-red-100" };
    if (temp >= 30) return { text: "Warm weather. Best for early morning or evening sightseeing. Carry water.", color: "text-amber-600 bg-amber-50 border-amber-100" };
    if (temp >= 15) return { text: "Pleasant Weather! Highly suitable for exploring heritage monuments and local markets.", color: "text-emerald-700 bg-emerald-50 border-emerald-100" };
    return { text: "Cold temperatures. Bring warm shawls or layers for outdoor walks.", color: "text-blue-600 bg-blue-50 border-blue-100" };
  };

  const getLocalCuisineData = (stateId: string, districtId: string) => {
    const defaultCuisine = {
      description: "Savor the local traditional meals, fresh farm products, and delicious local street foods.",
      dishes: [
        { name: "Traditional Indian Thali", desc: "A wholesome platter featuring local rice/breads, lentils, local seasonal vegetables, curries, and regional sweets." },
        { name: "Local Street Chaat", desc: "Savory fried crisps served with yoghurt, mint chutney, tamarind sauce, and local spices." },
        { name: "Regional Sweet Delights", desc: "Fresh milk-based sweets cooked in regional spices and organic sugar cane." }
      ]
    };

    if (customDistricts[districtId]) {
       const foods = new Set<string>();
       customDistricts[districtId].forEach(p => {
         if (p.food) p.food.forEach((f: any) => foods.add(f));
       });
       if (foods.size > 0) {
         return {
           description: `Explore the authentic local flavors of ${districtData?.name || 'this district'}. Enjoy traditional meals, street foods, and special delicacies.`,
           dishes: Array.from(foods).map(f => ({ name: f, desc: "A famous local delicacy you must try." }))
         };
       }
    }

    const databases: Record<string, { description: string, dishes: { name: string, desc: string }[] }> = {
      "rajasthan": {
        description: "Rajasthani cuisine is famous for its rich, spice-heavy meals, influenced by the arid environment and royal heritage.",
        dishes: [
          { name: "Dal Baati Churma", desc: "Hard, unleavened wheat dumplings (Baati) dipped in clarified butter, eaten with lentil soup (Dal) and sweetened crushed wheat (Churma)." },
          { name: "Gatte ki Sabzi", desc: "Gram flour (besan) roundels cooked in a rich, spiced yoghurt gravy." },
          { name: "Mirchi Bada & Pyaaz Kachori", desc: "Spiced green chillies stuffed with potatoes, deep fried, and savory onion puffs served at local stalls." }
        ]
      },
      "kerala": {
        description: "Kerala culinary culture relies on coconut, fresh seafood, curry leaves, and a rich spice blend (black pepper, cardamom).",
        dishes: [
          { name: "Appam with Vegetable Stew", desc: "Lacy fermented rice pancakes with a soft spongy center, served with coconut milk vegetable broth." },
          { name: "Karimeen Pollichathu", desc: "Pearl spot fish marinated in rich spices, wrapped in banana leaf, and pan-fried." },
          { name: "Malabar Biryani", desc: "Aromatic short-grain Khaima rice cooked with local spices and tender meat, garnished with ghee-fried onions." }
        ]
      },
      "uttar-pradesh": {
        description: "UP offers both royal Awadhi Nawabi cuisines and rustic traditional snacks.",
        dishes: [
          { name: "Lucknowi Galouti Kebabs", desc: "Mouth-melting minced lamb kebabs marinated in over 150 secret spices, grilled over charcoal." },
          { name: "Agra Petha", desc: "A translucent, sweet soft candy made from ash gourd, flavored with saffron, rosewater, or coconut." },
          { name: "Banarasi Kachori Sabzi", desc: "Lentil-stuffed fried crisp breads served with spicy potato curry, traditional breakfast of the holy town." }
        ]
      },
      "maharashtra": {
        description: "Maharashtrian food ranges from mild sweet dishes to spicy coastal Konkani delicacies.",
        dishes: [
          { name: "Vada Pav", desc: "The iconic street food—spiced mashed potato ball batter-fried, served inside a soft bread bun with red garlic chutney." },
          { name: "Misal Pav", desc: "A spicy curry made of sprouted moth beans, topped with crisp savories (farsan), chopped onions, and lemon, eaten with bread." },
          { name: "Puran Poli", desc: "Sweet flatbread stuffed with cooked yellow gram lentils, jaggery, cardamom, and nutmeg, served with warm ghee." }
        ]
      }
    };

    return databases[stateId] || defaultCuisine;
  };

  const getLocalShoppingData = (stateId: string, districtId: string) => {
    const defaultShopping = {
      description: "Support local artisans by buying traditional handlooms, regional handicrafts, and organic spices.",
      items: [
        { name: "Handcrafted Souvenirs", desc: "Wood carvings, terracotta pots, or stone crafts produced by local artisans." },
        { name: "Traditional Handlooms", desc: "Sarees, shawls, and fabrics displaying ethnic regional weave patterns." },
        { name: "Local Spices & Teas", desc: "Pure farm-harvested spices, saffron, or regional tea leaves." }
      ]
    };

    if (customDistricts[districtId]) {
       const crafts = new Set<string>();
       customDistricts[districtId].forEach(p => {
         if ((p as any).handicrafts) (p as any).handicrafts.forEach((c: string) => crafts.add(c));
       });
       if (crafts.size > 0) {
         return {
           description: `Support local artisans by purchasing special handicrafts and heritage products from ${districtData?.name || 'this district'}.`,
           items: Array.from(crafts).map(c => ({ name: c, desc: "An authentic local craft or specialty product." }))
         };
       }
    }

    const databases: Record<string, { description: string, items: { name: string, desc: string }[] }> = {
      "rajasthan": {
        description: "Rajasthan is a paradise for shoppers, offering colorful textiles, gems, and vintage royal handicrafts.",
        items: [
          { name: "Jaipuri Blue Pottery", desc: "Distinctive glazed pottery painted with cobalt blue dyes, depicting birds and floral motifs." },
          { name: "Bandhani & Block Prints", desc: "Tie-dye and hand-carved wooden block printed fabrics (Sanganeri, Bagru) in bright crimson and indigo." },
          { name: "Traditional Mojari Footwear", desc: "Embroidered leather shoes handmade by village craftsmen." }
        ]
      },
      "kerala": {
        description: "Pick up organic spices, brass oil lamps, and eco-friendly coir handicrafts.",
        items: [
          { name: "Spices & Essential Oils", desc: "Cardamom, clove, cinnamon, and black pepper sourced straight from the plantations of Munnar." },
          { name: "Kasavu Handloom Sarees", desc: "Traditional cream cotton sarees bordered with pure gold zari thread." },
          { name: "Coir & Coconut Shell Crafts", desc: "Eco-friendly mats, toys, bowls, and ladles hand-carved from coconuts." }
        ]
      },
      "uttar-pradesh": {
        description: "UP is world-renowned for its historic craft clusters—brass, silk, and perfumes.",
        items: [
          { name: "Banarasi Silk Sarees", desc: "Luxury hand-woven silk sarees embroidered with gold and silver zari brocades." },
          { name: "Lucknowi Chikankari Embroidery", desc: "Delicate, elegant hand-embroidered shadow work on muslin, georgette, and cotton fabrics." },
          { name: "Kannauj Attar (Perfumery)", desc: "Organic, alcohol-free essential oils distilled from fresh rose, jasmine, or wet earth (Mitti Attar)." }
        ]
      }
    };

    return databases[stateId] || defaultShopping;
  };

  const getDynamicTravelTips = () => {
    if (!customDistricts[params.districtId]) return [
      { title: "Hire Certified Guides", desc: "Always request official badges or ID cards issued by the Ministry of Tourism." },
      { title: "Dress Modestly for Temples", desc: "Heritage religious sites require respectful clothing. Shoulders and knees must be covered." },
      { title: "Stay Hydrated", desc: "Carry a reusable water bottle. Temperatures can rise quickly during the daytime." }
    ];
    
    const tips = new Set<string>();
    customDistricts[params.districtId].forEach(p => {
      if (p.travelTips) p.travelTips.forEach((t: any) => tips.add(t));
    });
    
    const tipsArray = Array.from(tips);
    if (tipsArray.length > 0) {
      return tipsArray.map(t => ({ title: "Travel Tip", desc: t }));
    }
    
    return [
      { title: "Hire Certified Guides", desc: "Always request official badges or ID cards issued by the Ministry of Tourism." },
      { title: "Dress Modestly for Temples", desc: "Heritage religious sites require respectful clothing. Shoulders and knees must be covered." },
      { title: "Stay Hydrated", desc: "Carry a reusable water bottle. Temperatures can rise quickly during the daytime." }
    ];
  };

  const cuisineInfo = getLocalCuisineData(params.stateId, params.districtId);
  const shoppingInfo = getLocalShoppingData(params.stateId, params.districtId);
  const travelTipsArray = getDynamicTravelTips();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page-container p-4 md:p-8 max-w-7xl mx-auto"
    >
      {/* Navigation and Weather header */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Link href={`/states/${params.stateId}`} className="btn glass-panel inline-flex items-center gap-2 py-2 bg-white text-gray-700">
          <ArrowLeft size={18} /> Back to Districts
        </Link>
        
        {weatherData && (
          <div className="glass-panel px-5 py-2.5 bg-white flex items-center gap-3 text-accent-secondary border-accent-secondary/20 shadow-sm rounded-xl">
            <CloudRain className="text-accent-secondary" size={22} />
            <div>
              <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Live Weather</span>
              <span className="font-extrabold text-base text-gray-800">{weatherData.temperature}°C</span>
            </div>
          </div>
        )}
      </div>

      {/* Hero Banner Header */}
      <div className="relative rounded-3xl overflow-hidden mb-10 border border-gray-100 shadow-md h-64 md:h-80">
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent z-10 pointer-events-none"></div>
        <RotatingImage 
          searchTerm={`${districtData.name}, ${stateData.name}`}
          defaultImages={districtData.images || [districtData.image]} 
          alt={districtData.name} 
        />
        
        {/* District Banner Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20 text-white text-left">
          <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold uppercase mb-2">
            <MapPin size={11} /> {stateData.name}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-2 drop-shadow-md">Explore {districtData.name}</h1>
          <p className="text-gray-200 text-xs md:text-sm max-w-2xl font-medium drop-shadow-sm leading-relaxed">
            Discover authentic heritage sights, famous monuments, hotels, local cuisine, and culture of {districtData.name}.
          </p>
        </div>
      </div>

      {/* Live Weather Advisory Banner */}
      {weatherData && (
        <div className={`glass-panel p-4 mb-8 border border-l-4 rounded-xl flex items-start gap-3 ${getWeatherAdvisory(weatherData.temperature).color}`}>
          <Info size={18} className="shrink-0 mt-0.5" />
          <div>
            <h4 className="font-extrabold text-sm uppercase tracking-wide">Weather Travel Advisory</h4>
            <p className="text-xs font-medium leading-normal">{getWeatherAdvisory(weatherData.temperature).text}</p>
          </div>
        </div>
      )}

      {/* District Page Dashboard Tabs */}
      <div className="flex flex-wrap border-b border-gray-200 mb-8 gap-2">
        <button
          onClick={() => setActiveSubTab('attractions')}
          className={`pb-4 px-3 font-bold text-sm md:text-base flex items-center gap-2 border-b-2 transition-all ${
            activeSubTab === 'attractions' ? 'border-accent-primary text-accent-primary' : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          <Compass size={16} /> Tourist Attractions ({wikiPlaces.length})
        </button>

        <button
          onClick={() => setActiveSubTab('food')}
          className={`pb-4 px-3 font-bold text-sm md:text-base flex items-center gap-2 border-b-2 transition-all ${
            activeSubTab === 'food' ? 'border-accent-primary text-accent-primary' : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          <Utensils size={16} /> Local Cuisine
        </button>

        <button
          onClick={() => setActiveSubTab('shopping')}
          className={`pb-4 px-3 font-bold text-sm md:text-base flex items-center gap-2 border-b-2 transition-all ${
            activeSubTab === 'shopping' ? 'border-accent-primary text-accent-primary' : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          <ShoppingBag size={16} /> Handicrafts & Bazaars
        </button>

        <button
          onClick={() => setActiveSubTab('guide')}
          className={`pb-4 px-3 font-bold text-sm md:text-base flex items-center gap-2 border-b-2 transition-all ${
            activeSubTab === 'guide' ? 'border-accent-primary text-accent-primary' : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          <AlertTriangle size={16} /> Travel Tips & Safety
        </button>
      </div>

      {/* TAB PANELS */}
      <div className="mb-16">
        
        {/* Attractions Tab */}
        {activeSubTab === 'attractions' && (
          <div>
            {wikiPlaces.length === 0 ? (
              <div className="text-center p-16 text-lg text-gray-500 glass-panel bg-white rounded-3xl">
                No tourist locations found for {districtData.name} district.
              </div>
            ) : (
              <div className="flex flex-col gap-10">
                {wikiPlaces.map((place, index) => (
                  <motion.div
                    key={place.id || index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-panel flex flex-col md:flex-row overflow-hidden bg-white cursor-pointer hover:border-accent-primary transition-all rounded-3xl border border-gray-100 shadow-sm"
                    onClick={() => setSelectedPlace(place)}
                  >
                    {/* Place Image */}
                    <div className="w-full md:w-2/5 h-[280px] md:h-auto overflow-hidden relative min-h-[240px]">
                      {place.images && place.images.length > 0 ? (
                        <ImageCarousel images={place.images} alt={place.name} />
                      ) : (
                        <Image 
                          src={place.image || fallbackLocalImage} 
                          alt={place.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 40vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        />
                      )}
                      
                      {/* Virtual Tour Floating Badge */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveTourImage(place.image || fallbackLocalImage);
                          setActiveTourName(place.name);
                        }}
                        className="absolute bottom-4 left-4 bg-black/75 hover:bg-accent-primary text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md z-10"
                      >
                        <Eye size={14} /> 360° Virtual Tour
                      </button>
                    </div>
                    
                    {/* Place Description */}
                    <div className="p-6 md:p-8 w-full md:w-3/5 flex flex-col justify-between">
                      <div>
                        {/* Title bar */}
                        <div className="flex justify-between items-start mb-3 gap-2">
                          <h2 className="text-gradient text-2xl md:text-3xl font-extrabold leading-tight">
                            {place.name}
                          </h2>
                          <div className="flex gap-2 shrink-0">
                            {/* Wishlist Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleWishlistToggle(place);
                              }}
                              className={`p-2 rounded-xl border transition-all ${
                                wishlistIds.includes(place.id)
                                  ? 'bg-red-50 border-red-200 text-red-500'
                                  : 'bg-gray-50 border-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50'
                              }`}
                              title={wishlistIds.includes(place.id) ? "Remove from Saved" : "Save Destination"}
                            >
                              <Heart size={16} fill={wishlistIds.includes(place.id) ? "currentColor" : "none"} />
                            </button>

                            {/* Compare Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCompareToggle(place);
                              }}
                              className={`p-2 rounded-xl border transition-all ${
                                compareIds.includes(place.id)
                                  ? 'bg-accent-tertiary/20 border-accent-tertiary text-accent-tertiary'
                                  : 'bg-gray-50 border-gray-100 text-gray-400 hover:text-accent-tertiary hover:bg-accent-tertiary/10'
                              }`}
                              title={compareIds.includes(place.id) ? "Added to Compare" : "Compare Destination"}
                            >
                              <Layers size={16} />
                            </button>
                          </div>
                        </div>

                        {/* History Description */}
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 font-medium line-clamp-4">
                          {place.whyFamous || place.description}
                        </p>
                      </div>
                      
                      {/* Audio & Quick Details */}
                      <div>
                        <div className="flex flex-wrap gap-2.5 mb-6">
                          {/* Audio Guide Play Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlayAudio(place.id, place.whyFamous || place.description);
                            }}
                            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                              playingId === place.id 
                                ? 'bg-red-500 text-white shadow-md' 
                                : 'bg-accent-secondary/15 text-accent-secondary hover:bg-accent-secondary/25'
                            }`}
                          >
                            {playingId === place.id ? <VolumeX size={14} /> : <Volume2 size={14} />}
                            {playingId === place.id ? "Stop Audio Guide" : "AI Voice Guide (Narrate)"}
                          </button>
                          
                          <a 
                            href={`https://maps.google.com/?q=${encodeURIComponent(place.name + " " + districtData.name)}`}
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1"
                          >
                            <MapPin size={12} /> View Location Map
                          </a>
                        </div>

                        {/* Metadata facts grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-100 pt-5">
                          <div className="flex items-center gap-3">
                            <Clock className="text-accent-primary shrink-0" size={20} />
                            <div>
                              <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider">Timings</span>
                              <span className="font-extrabold text-xs text-gray-700">{place.timing || place.openingTime || '06:00 AM - 06:00 PM'}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Calendar className="text-accent-secondary shrink-0" size={20} />
                            <div>
                              <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider">Best Season</span>
                              <span className="font-extrabold text-xs text-gray-700">{place.bestTime || place.bestSeason || 'October to March'}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <DollarSign className="text-accent-tertiary shrink-0" size={20} />
                            <div>
                              <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider">Entry Fee</span>
                              <span className="font-extrabold text-xs text-gray-700">{place.fee || place.entryFee || 'Free Entry'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Local Cuisine Tab */}
        {activeSubTab === 'food' && (
          <div className="glass-panel p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-3xl font-extrabold text-accent-primary mb-3">Authentic Regional Flavors</h2>
            <p className="text-gray-600 mb-8 font-medium text-base">{cuisineInfo.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cuisineInfo.dishes.map((dish, idx) => (
                <div key={idx} className="bg-orange-50/70 border border-orange-100 p-6 rounded-2xl flex flex-col justify-between">
                  <div>
                    <span className="text-3xl mb-3 block">🍲</span>
                    <h3 className="font-extrabold text-gray-800 text-lg mb-2">{dish.name}</h3>
                    <p className="text-xs text-gray-600 font-medium leading-relaxed">{dish.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-orange-200/50 text-[11px] font-bold text-orange-600">
                    Authentic Specialty
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shopping & Handicrafts Tab */}
        {activeSubTab === 'shopping' && (
          <div className="glass-panel p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-3xl font-extrabold text-accent-secondary mb-3">Famous Bazaars & Handicrafts</h2>
            <p className="text-gray-600 mb-8 font-medium text-base">{shoppingInfo.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {shoppingInfo.items.map((item, idx) => (
                <div key={idx} className="bg-emerald-50/70 border border-emerald-100 p-6 rounded-2xl flex flex-col justify-between">
                  <div>
                    <span className="text-3xl mb-3 block">🛍️</span>
                    <h3 className="font-extrabold text-gray-800 text-lg mb-2">{item.name}</h3>
                    <p className="text-xs text-gray-600 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-emerald-200/50 text-[11px] font-bold text-emerald-600">
                    Handmade Regional Artisan Product
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Travel Tips & Safety Guide Tab */}
        {activeSubTab === 'guide' && (
          <div className="glass-panel p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-3xl font-extrabold text-accent-tertiary mb-3">Essential Travel Guidelines</h2>
            <p className="text-gray-600 mb-8 font-medium text-base">Key advisories for a smooth, safe, and respectful journey in {districtData.name}.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {travelTipsArray.map((tip, idx) => (
                <div key={idx} className="bg-blue-50/70 border border-blue-100 p-6 rounded-2xl">
                  <span className="text-3xl mb-3 block">💡</span>
                  <h3 className="font-extrabold text-gray-800 text-base mb-2">{tip.title}</h3>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Place Modal */}
      {selectedPlace && (
        <PlaceModal 
          place={selectedPlace} 
          onClose={() => setSelectedPlace(null)} 
        />
      )}

      {/* 360° Virtual Tour Lightbox Modal */}
      {activeTourImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-gray-900 rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
            <button 
              onClick={() => {
                setActiveTourImage(null);
                setActiveTourName(null);
              }}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full z-10 transition-colors"
            >
              ✕
            </button>
            <div className="p-4 bg-gray-800 text-white flex justify-between items-center border-b border-gray-700">
              <span className="font-extrabold text-sm flex items-center gap-2">
                <Eye size={16} className="text-accent-tertiary" /> 360° Interactive Panoramic View: {activeTourName}
              </span>
            </div>
            <div className="h-[450px] relative overflow-hidden">
              <Image 
                src={activeTourImage} 
                alt={activeTourName || "Virtual Tour"} 
                fill 
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover animate-pulse"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white font-bold text-sm pointer-events-none">
                <span className="bg-black/70 px-4 py-2 rounded-full border border-white/20">
                  ↔ Pan or click photos to explore
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
