"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
const PlaceModal = dynamic(() => import('./PlaceModal'), {
  ssr: false
});
import ImageCarousel from './ImageCarousel';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Star, 
  Search, 
  CloudRain, 
  Heart, 
  Layers, 
  Volume2, 
  VolumeX, 
  Eye, 
  Utensils, 
  ShoppingBag, 
  Info,
  MapPin,
  Compass,
  AlertTriangle,
  Play,
  RotateCcw
} from 'lucide-react';
import RotatingImage from './RotatingImage';

interface DistrictClientProps {
  stateData: any;
  districtData: any;
  specificCustomDistricts: any[];
}

export default function DistrictClient({ stateData, districtData, specificCustomDistricts }: DistrictClientProps) {
  const [wikiPlaces, setWikiPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<any>(null);
  
  // Audio Narrator states
  const [playingId, setPlayingId] = useState<string | null>(null);
  
  // 360 Virtual Tour states
  const [activeTourImage, setActiveTourImage] = useState<string | null>(null);
  const [activeTourName, setActiveTourName] = useState<string | null>(null);

  // Tab State
  const [activeSubTab, setActiveSubTab] = useState<'attractions' | 'food' | 'shopping' | 'guide'>('attractions');

  // Wishlist & Compare local states
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<any | null>(null);
  const fallbackLocalImage = districtData?.image || stateData?.image || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200";

  const params = { stateId: stateData?.id, districtId: districtData?.id };
  const customDistricts: Record<string, any[]> = { [districtData?.id]: specificCustomDistricts };


  // Fetch local wishlist/compare on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedWishlist = JSON.parse(localStorage.getItem('bharatyatra_wishlist') || '[]');
      setWishlistIds(savedWishlist.map((item: any) => item.id));

      const savedCompare = JSON.parse(localStorage.getItem('bharatyatra_compare') || '[]');
      setCompareIds(savedCompare.map((item: any) => item.id));
    }
  }, []);

  // Fetch Wikipedia places & weather
  useEffect(() => {
    if (!districtData) return;

    const isExcludedTitle = (title: string) => {
      const lowerTitle = title.toLowerCase();
      return (
        lowerTitle.includes("list of") ||
        lowerTitle.includes("lists of") ||
        lowerTitle.includes("tourism in") ||
        lowerTitle.includes("politics of") ||
        lowerTitle.includes("government of") ||
        lowerTitle.includes("insurgency") ||
        lowerTitle.includes("terrorism") ||
        lowerTitle.includes("police") ||
        lowerTitle.includes("legislative assembly") ||
        lowerTitle.includes("election") ||
        lowerTitle.includes("high court") ||
        lowerTitle.includes("governor") ||
        lowerTitle.includes("minister") ||
        lowerTitle.includes("politician") ||
        lowerTitle.includes("activist") ||
        lowerTitle.includes("freedom fighter") ||
        lowerTitle.includes("cricketer") ||
        lowerTitle.includes("actor") ||
        lowerTitle.includes("actress") ||
        lowerTitle.includes("singer") ||
        lowerTitle.includes("officer") ||
        lowerTitle.includes("general") ||
        lowerTitle.includes("ruler") ||
        lowerTitle.includes("dynasty") ||
        lowerTitle.includes("family")
      );
    };

    const isExcludedUrl = (url: string) => {
      const lower = url.toLowerCase();
      return (
        lower.includes('map') || 
        lower.includes('flag') || 
        lower.includes('icon') || 
        lower.includes('coat_of_arms') || 
        lower.includes('districts') || 
        lower.includes('.svg') || 
        lower.includes('.png') ||
        lower.includes('location') ||
        lower.includes('emblem') ||
        lower.includes('seal') ||
        lower.includes('logo') ||
        lower.includes('diagram') ||
        lower.includes('collage') ||
        lower.includes('insignia') ||
        lower.includes('victoria_falls') ||
        lower.includes('victoriafalls') ||
        lower.includes('portrait') ||
        lower.includes('profile') ||
        lower.includes('face') ||
        lower.includes('headshot') ||
        lower.includes('posing') ||
        lower.includes('group') ||
        lower.includes('crowd') ||
        lower.includes('people') ||
        lower.includes('man') ||
        lower.includes('woman') ||
        lower.includes('person') ||
        lower.includes('human') ||
        lower.includes('member') ||
        lower.includes('parliament') ||
        lower.includes('legislator') ||
        lower.includes('politician') ||
        lower.includes('officer') ||
        lower.includes('police') ||
        lower.includes('soldier') ||
        lower.includes('family') ||
        lower.includes('children') ||
        lower.includes('kid') ||
        lower.includes('girl') ||
        lower.includes('boy') ||
        lower.includes('baby') ||
        lower.includes('student') ||
        lower.includes('teacher') ||
        lower.includes('gathering') ||
        lower.includes('meeting')
      );
    };

    const fetchData = async () => {
      try {
        setLoading(true);

        // Step 1: Get GPS Coordinates
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(districtData.name + " " + stateData.name)}&count=1&language=en&format=json`;
        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();
        
        // Check if Custom Data exists (Highest Priority)
        if (customDistricts[params.districtId] && customDistricts[params.districtId].length > 0) {
          setWikiPlaces(customDistricts[params.districtId]);
          
          // Still try to fetch weather if coordinates found
          if (geoData.results && geoData.results.length > 0) {
            const { latitude, longitude } = geoData.results[0];
            try {
              const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
              const wData = await weatherRes.json();
              setWeatherData(wData.current_weather);
            } catch (e) {
              console.error("Weather fetch failed");
            }
          }
          
          setLoading(false);
          return;
        }
        
        if (geoData.results && geoData.results.length > 0) {
          const { latitude, longitude } = geoData.results[0];
          
          // Fetch Real-time Weather
          const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
          const wData = await weatherRes.json();
          setWeatherData(wData.current_weather);

          // Step 2: Strict Geosearch to prevent mapping wrong locations
          const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=geosearch&ggscoord=${latitude}|${longitude}&ggsradius=15000&ggslimit=12&prop=pageimages|extracts&exintro=1&explaintext=1&piprop=original|thumbnail&pithumbsize=800&format=json&origin=*`;
          const wikiRes = await fetch(wikiUrl);
          const wikiData = await wikiRes.json();
          
          let validPlaces: any[] = [];
          
          if (wikiData.query && wikiData.query.pages) {
            const pages = Object.values(wikiData.query.pages) as any[];
            
            // Filter pages first to exclude biography/list titles
            const filteredPages = pages.filter(page => {
              if (!page.title) return false;
              return !isExcludedTitle(page.title);
            });

            const formattedPlaces = filteredPages.map((page) => {
              const rawImg = page.thumbnail ? page.thumbnail.source : page.original ? page.original.source : null;
              const finalImage = (rawImg && !isExcludedUrl(rawImg)) ? rawImg : fallbackLocalImage;

              return {
                id: page.pageid.toString(),
                name: page.title,
                description: page.extract ? page.extract : "An authentic heritage site and popular tourist place of this region.",
                image: finalImage,
                timing: "09:00 AM - 06:00 PM (Sunset)",
                bestTime: "October to March",
                fee: "INR 20 (Indians), INR 250 (Foreigners)"
              };
            });

            // Filter out state or district-wide general page descriptions
            validPlaces = formattedPlaces.filter(p => 
              !p.name.includes("District") && 
              !p.name.includes("district") &&
              p.name !== stateData.name
            );
          }

          // Step 3: Text Search Fallback restricted to district and state name
          if (validPlaces.length === 0) {
            const fallbackQuery = encodeURIComponent(`${districtData.name} tourist spots`);
            const fallbackUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${fallbackQuery}&gsrlimit=10&prop=pageimages|extracts&exintro=1&explaintext=1&piprop=original|thumbnail&pithumbsize=800&format=json&origin=*`;
            const fbRes = await fetch(fallbackUrl);
            const fbData = await fbRes.json();
            
            if (fbData.query && fbData.query.pages) {
              const pages = Object.values(fbData.query.pages) as any[];
              
              const filteredPages = pages.filter(page => {
                if (!page.title) return false;
                return !isExcludedTitle(page.title);
              });

              const formattedPlaces = filteredPages.map((page) => {
                const rawImg = page.thumbnail ? page.thumbnail.source : page.original ? page.original.source : null;
                const finalImage = (rawImg && !isExcludedUrl(rawImg)) ? rawImg : fallbackLocalImage;

                return {
                  id: page.pageid.toString(),
                  name: page.title,
                  description: page.extract ? page.extract : "An authentic tourist landmark in this district.",
                  image: finalImage,
                  timing: "09:00 AM - 05:00 PM",
                  bestTime: "October to March",
                  fee: "Varies (Usually Nominal)"
                };
              });
              
              // Text validation check: title or description must contain district name
              const distNameLower = districtData.name.toLowerCase();
              validPlaces = formattedPlaces.filter(p => 
                !p.name.includes("District") && 
                !p.name.includes("district") && 
                (p.name.toLowerCase().includes(distNameLower) || p.description.toLowerCase().includes(distNameLower))
              );
            }
          }

          // Step 4: Final General Fallback
          if (validPlaces.length === 0) {
            const finalQuery = encodeURIComponent(`${districtData.name} ${stateData.name}`);
            const finalUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${finalQuery}&gsrlimit=1&prop=pageimages|extracts&exintro=1&explaintext=1&piprop=original|thumbnail&pithumbsize=800&format=json&origin=*`;
            const finalRes = await fetch(finalUrl);
            const finalData = await finalRes.json();
            
            if (finalData.query && finalData.query.pages) {
              const pages = Object.values(finalData.query.pages) as any[];
              const filteredPages = pages.filter(page => {
                if (!page.title) return false;
                return !isExcludedTitle(page.title);
              });

              if (filteredPages.length > 0) {
                const page = filteredPages[0];
                if (page && page.pageid && page.title) {
                  const rawImg = page.thumbnail ? page.thumbnail.source : page.original ? page.original.source : null;
                  const finalImage = (rawImg && !isExcludedUrl(rawImg)) ? rawImg : fallbackLocalImage;

                  validPlaces = [{
                    id: page.pageid.toString(),
                    name: `${page.title}`,
                    description: page.extract ? page.extract : "Explore this beautiful heritage city of India.",
                    image: finalImage,
                    timing: "Open Daily",
                    bestTime: "Year Round",
                    fee: "Free Entry"
                  }];
                }
              }
            }
          }
          
          setWikiPlaces(validPlaces.slice(0, 8)); // Top 8 authentic sights
        }
      } catch (error) {
        console.error("Data Fetch Error:", error);
        setWikiPlaces([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [districtData, stateData]);

  if (!districtData) {
    return <div className="page-container p-10 text-center text-red-500 font-bold bg-white">District not found.</div>;
  }

  // AI Voice Narrator: Reads out using standard SpeechSynthesis API
  const handlePlayAudio = (id: string, text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert("Speech synthesis is not supported in this browser.");
      return;
    }

    if (playingId === id) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
    } else {
      window.speechSynthesis.cancel(); // Stop any current audio
      const cleanText = text.replace(/\[\d+\]/g, ""); // Remove wikipedia citation bracket indices [1], [2], etc.
      const utterance = new SpeechSynthesisUtterance(cleanText.substring(0, 300)); // Read out first 300 chars
      
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
        description: place.description.substring(0, 150) + "...",
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
        alert("You can compare up to 3 destinations at a time. Clear items from the Compare Dashboard first.");
        return;
      }
      const compItem = {
        id: place.id,
        name: place.name,
        description: place.description.substring(0, 150) + "...",
        image: place.image,
        stateId: params.stateId,
        districtId: params.districtId,
        stateName: stateData.name,
        districtName: districtData.name,
        fee: place.fee,
        timing: place.timing,
        bestTime: place.bestTime
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

  // Localized Cuisines Mock database by State ID to prevent location mixups
  const getLocalCuisineData = (stateId: string, districtId: string) => {
    const defaultCuisine = {
      description: "Savor the local traditional meals, fresh farm products, and delicious local street foods.",
      dishes: [
        { name: "Traditional Indian Thali", desc: "A wholesome platter featuring local rice/breads, lentils, local seasonal vegetables, curries, and regional sweets." },
        { name: "Local Street Chaat", desc: "Savory fried crisps served with yoghurt, mint chutney, tamarind sauce, and local spices." },
        { name: "Regional Sweet Delights", desc: "Fresh milk-based sweets cooked in regional spices and organic sugar cane." }
      ]
    };

    // Check custom data first
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

  // Localized Shopping Bazaars Mock database by State ID
  const getLocalShoppingData = (stateId: string, districtId: string) => {
    const defaultShopping = {
      description: "Support local artisans by buying traditional handlooms, regional handicrafts, and organic spices.",
      items: [
        { name: "Handcrafted Souvenirs", desc: "Wood carvings, terracotta pots, or stone crafts produced by local artisans." },
        { name: "Traditional Handlooms", desc: "Sarees, shawls, and fabrics displaying ethnic regional weave patterns." },
        { name: "Local Spices & Teas", desc: "Pure farm-harvested spices, saffron, or regional tea leaves." }
      ]
    };

    // Check custom data first
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
          <div className="glass-panel px-5 py-2.5 bg-white flex items-center gap-3 text-accent-secondary border-accent-secondary/20 shadow-sm">
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
          <p className="text-gray-200 text-xs md:text-sm max-w-2xl font-medium drop-shadow-sm">
            {customDistricts[params.districtId] 
              ? "Discover beautifully detailed history, local foods, hotel guides, and travel tips verified from custom archives."
              : (districtData.description || `Discover authentic heritage sights, monuments, food, and culture of ${districtData.name}.`)}
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
          <Compass size={16} /> Tourist Attractions
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
            {loading ? (
              <div className="text-center p-20 text-xl font-semibold flex flex-col justify-center items-center gap-3">
                <Search className="spin text-accent-primary" size={36} /> 
                <span className="text-gray-600 font-bold">Querying Wikipedia & Wikimedia Commons...</span>
                <span className="text-xs text-gray-400">Verifying geographical points to ensure accuracy</span>
              </div>
            ) : wikiPlaces.length === 0 ? (
              <div className="text-center p-16 text-lg text-gray-500 glass-panel bg-white">
                No verified tourist locations found on Wikipedia for {districtData.name} district.
              </div>
            ) : (
              <div className="flex flex-col gap-10">
                {wikiPlaces.map((place, index) => (
                  <motion.div
                    key={place.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-panel flex flex-col md:flex-row overflow-hidden bg-white cursor-pointer hover:border-accent-primary transition-all"
                    onClick={() => {
                      if (customDistricts[params.districtId]) {
                        setSelectedPlace(place);
                      }
                    }}
                  >
                    {/* Place Image */}
                    <div className="w-full md:w-2/5 h-[280px] md:h-auto overflow-hidden relative">
                      {place.images && place.images.length > 0 ? (
                        <ImageCarousel images={place.images} alt={place.name} />
                      ) : (
                        <Image 
                          src={place.image || (place.thumbnail ? place.thumbnail.source : fallbackLocalImage)} 
                          alt={place.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 40vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        />
                      )}
                      
                      {/* Virtual Tour Floating Badge */}
                      <button 
                        onClick={() => {
                          setActiveTourImage(place.image);
                          setActiveTourName(place.name);
                        }}
                        className="absolute bottom-4 left-4 bg-black/75 hover:bg-accent-primary text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md"
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
                              onClick={() => handleWishlistToggle(place)}
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
                              onClick={() => handleCompareToggle(place)}
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
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 font-medium">
                          {place.whyFamous || place.description}
                        </p>
                      </div>
                      
                      {/* Audio & Quick Details */}
                      <div>
                        <div className="flex flex-wrap gap-2.5 mb-6">
                          {/* Audio Guide Play Button */}
                          <button
                            onClick={() => handlePlayAudio(place.id, place.description)}
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
                              <span className="font-extrabold text-xs text-gray-700">{place.timing || place.openingTime || 'Varies'}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Calendar className="text-accent-secondary shrink-0" size={20} />
                            <div>
                              <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider">Best Season</span>
                              <span className="font-extrabold text-xs text-gray-700">{place.bestTime || place.bestSeason || place.bestTimeToVisit || 'Year Round'}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Star className="text-accent-tertiary shrink-0" size={20} />
                            <div>
                              <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider">Tickets / Fee</span>
                              <span className="font-extrabold text-xs text-gray-700">{place.entryFee || place.fee || 'Varies'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {customDistricts[params.districtId] && (
                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                          <span className="text-sm font-bold text-accent-primary">View Full Details & History →</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Food Tab */}
        {activeSubTab === 'food' && (
          <div className="glass-panel p-6 md:p-8 bg-white border-l-4 border-l-accent-primary">
            <div className="flex gap-4 items-center mb-6">
              <div className="p-3 bg-accent-primary/10 text-accent-primary rounded-2xl shrink-0">
                <Utensils size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-gray-800">Famous Food of {districtData.name}</h3>
                <p className="text-sm text-gray-500">Discover regional heritage dishes and famous street food specialties.</p>
              </div>
            </div>
            
            <p className="text-gray-600 font-medium text-base mb-8 leading-relaxed">
              {cuisineInfo.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cuisineInfo.dishes.map((dish, idx) => (
                <div key={idx} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col justify-between hover:bg-white hover:shadow-md transition-all">
                  <div>
                    <h4 className="font-extrabold text-gray-800 text-lg mb-2 text-gradient">{dish.name}</h4>
                    <p className="text-sm text-gray-500 leading-normal font-medium">{dish.desc}</p>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-accent-secondary mt-4 block">Recommended Dish</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shopping Tab */}
        {activeSubTab === 'shopping' && (
          <div className="glass-panel p-6 md:p-8 bg-white border-l-4 border-l-accent-tertiary">
            <div className="flex gap-4 items-center mb-6">
              <div className="p-3 bg-accent-tertiary/10 text-accent-tertiary rounded-2xl shrink-0">
                <ShoppingBag size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-gray-800">Handicrafts & Local Bazaars</h3>
                <p className="text-sm text-gray-500">Support local craft communities by purchasing authentic specialties.</p>
              </div>
            </div>
            
            <p className="text-gray-600 font-medium text-base mb-8 leading-relaxed">
              {shoppingInfo.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {shoppingInfo.items.map((item, idx) => (
                <div key={idx} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col justify-between hover:bg-white hover:shadow-md transition-all">
                  <div>
                    <h4 className="font-extrabold text-gray-800 text-lg mb-2 text-gradient">{item.name}</h4>
                    <p className="text-sm text-gray-500 leading-normal font-medium">{item.desc}</p>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-accent-tertiary mt-4 block">Heritage Craft</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Travel Guide Tab */}
        {activeSubTab === 'guide' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 space-y-6">
              <div className="glass-panel p-6 md:p-8 bg-white">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Smart Travel Tips</h3>
                <ul className="space-y-4 text-sm font-medium text-gray-600">
                  {travelTipsArray.map((tip, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <span className="w-5 h-5 rounded-full bg-accent-primary/10 text-accent-primary flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">{idx + 1}</span>
                      <div>
                        <strong className="text-gray-800 block">{tip.title}:</strong>
                        {tip.desc}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-4 glass-panel p-6 bg-gradient-to-br from-white to-[#FAF9F5] border-l-4 border-l-red-500">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="text-red-500" size={20} /> Safety Advisories
              </h3>
              <div className="space-y-4 text-xs font-semibold text-gray-600">
                <div className="p-3 bg-red-50/50 rounded-xl border border-red-100">
                  <strong className="text-red-600 block mb-1">Peak Crowd Safety</strong>
                  <span>Keep track of personal belongings in crowded bazaars or ghats. Avoid carrying excess physical cash.</span>
                </div>
                
                <div className="p-3 bg-red-50/50 rounded-xl border border-red-100">
                  <strong className="text-red-600 block mb-1">Emergency Numbers</strong>
                  <span>Police Helpline: 112 | Medical Ambulance: 108 | Tourism Support: 1363 (24x7 Multi-lingual toll-free helpline).</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 360° Simulated Panoramic Tour Modal */}
      <AnimatePresence>
        {activeTourImage && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4">
            
            <div className="w-full max-w-5xl flex justify-between items-center text-white mb-4">
              <div>
                <span className="text-xs uppercase font-bold text-accent-tertiary">Panoramic Virtual Tour Simulator</span>
                <h3 className="text-2xl font-bold">{activeTourName}</h3>
              </div>
              <button 
                onClick={() => {
                  setActiveTourImage(null);
                  setActiveTourName(null);
                }}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center text-xl transition-all"
              >
                ✕
              </button>
            </div>

            {/* Panoramic container */}
            <div className="w-full max-w-5xl h-[60vh] rounded-3xl overflow-hidden relative border border-white/10 bg-black shadow-2xl flex items-center">
              
              {/* Spinning compass loader overlay */}
              <div className="absolute inset-0 z-0 pointer-events-none flex flex-col items-center justify-center text-white/20 gap-2">
                <Compass className="spin" size={64} />
                <span className="text-xs tracking-widest font-bold uppercase">Rendering 360 Environment</span>
              </div>

              {/* Scrolling Panning Panoramic Image (Simulating VR scroll) */}
              <div className="absolute inset-y-0 w-[200%] h-full left-0 animate-pan-left z-10 pointer-events-none">
                <Image 
                  src={activeTourImage} 
                  alt="Panoramic View" 
                  fill
                  className="object-cover filter brightness-95 contrast-105"
                />
              </div>

              {/* VR Controls UI Overlay */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md border border-white/10 px-5 py-3 rounded-full text-white text-xs font-bold flex items-center gap-4 z-20 shadow-lg">
                <div className="flex items-center gap-1.5 text-accent-tertiary">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent-tertiary animate-pulse"></div>
                  Simulating Gyroscope Auto-Pan
                </div>
                <div className="h-4 w-px bg-white/20"></div>
                <span className="text-white/60">Tap ✕ to exit virtual view</span>
              </div>

            </div>

            {/* CSS Animation details */}
            <style jsx global>{`
              @keyframes panLeft {
                0% { transform: translateX(0); }
                50% { transform: translateX(-50%); }
                100% { transform: translateX(0); }
              }
              .animate-pan-left {
                animation: panLeft 40s linear infinite;
              }
            `}</style>

          </div>
        )}
      </AnimatePresence>
      
      {selectedPlace && (
        <PlaceModal place={selectedPlace} onClose={() => setSelectedPlace(null)} />
      )}
    </motion.div>
  );
}
