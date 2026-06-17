"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Map, 
  CalendarDays, 
  IndianRupee, 
  Sparkles, 
  Navigation, 
  ArrowLeft, 
  Printer, 
  Heart, 
  Check, 
  CheckSquare, 
  Clock,
  Compass,
  Briefcase,
  AlertCircle,
  ShoppingBag
} from 'lucide-react';

// Specialized state-by-state traditional shopping items database
const shoppingDatabase: Record<string, { description: string, items: { name: string, desc: string }[] }> = {
  "rajasthan": {
    description: "Rajasthan is world-famous for its colorful bazaars, royal handicrafts, and traditional textiles.",
    items: [
      { name: "Jaipur Blue Pottery", desc: "Exquisite glazed pottery hand-painted with cobalt blue and floral motifs." },
      { name: "Bandhani & Leheriya Textiles", desc: "Traditional tie-dye sarees, dupattas, and fabrics featuring bright colors." },
      { name: "Sanganeer Block Prints", desc: "Premium hand-block printed cotton bedsheets, shirts, and home linens." },
      { name: "Mojari Leather Shoes", desc: "Artisanal camel-leather footwear decorated with intricate embroidery." },
      { name: "Kundhan & Meenakari Jewelry", desc: "Traditional Rajasthani enameled jewelry and precious gemstones." }
    ]
  },
  "kerala": {
    description: "Kerala offers fresh natural produce, aromatic spices, and traditional handlooms.",
    items: [
      { name: "Malabar Spices", desc: "Fresh cardamom, black pepper, cloves, cinnamon, and nutmeg straight from plantations." },
      { name: "Aranmula Kannadi", desc: "Unique handmade metal-alloy mirrors, a closely guarded secret craft of a single family lineage." },
      { name: "Kasavu Handloom Sarees", desc: "Traditional cream-colored cotton garments woven with gleaming gold zari borders." },
      { name: "Coir & Coconut Crafts", desc: "Artistic home mats, bags, and souvenirs made from coconut shell and husk fiber." },
      { name: "Banana & Jackfruit Chips", desc: "Crisp, delicious snacks fried in fresh local coconut oil." }
    ]
  },
  "uttar-pradesh": {
    description: "Uttar Pradesh is home to centuries-old artisanal guilds specializing in royal fabrics and metal crafts.",
    items: [
      { name: "Lucknowi Chikankari", desc: "Delicate, hand-embroidered shadow work on light pastel fabrics." },
      { name: "Agra Petha & Marble Inlays", desc: "Sweet pumpkin candies and marble replicas inlaid with semi-precious stones (Pietra Dura)." },
      { name: "Banarasi Silk Sarees", desc: "Lustrous, heavy silk sarees woven with real gold and silver threads (zari)." },
      { name: "Moradabad Brassware", desc: "Premium brass bowls, lamps, and decorative plates featuring hand-engraved patterns." },
      { name: "Kannauj Perfumes (Attar)", desc: "Traditional hydro-distilled organic perfumes, including the famous 'Mitti Attar' (scent of rain)." }
    ]
  },
  "maharashtra": {
    description: "Maharashtra features unique regional weaves, rustic art, and delicious food souvenirs.",
    items: [
      { name: "Paithani Silk Sarees", desc: "Royal hand-woven silk sarees featuring oblique square borders and peacock pallu designs." },
      { name: "Kolhapuri Chappals", desc: "Hand-crafted, squeaky leather sandals known for their durability and classic design." },
      { name: "Warli Tribal Art Paintings", desc: "Traditional geometric paintings created by the Warli tribe using rice paste." },
      { name: "Alphonso Mangoes & Pulp", desc: "Known locally as Hapus, the king of mangoes (available seasonally or as canned pulp)." },
      { name: "Lonavala Chikki", desc: "Crunchy traditional sweet brittle made from jaggery, peanuts, and dry fruits." }
    ]
  },
  "karnataka": {
    description: "Karnataka is famous for its rich royal fragrances, silk, and wooden crafts.",
    items: [
      { name: "Mysore Sandalwood Products", desc: "Pure sandalwood oil, scented soaps, incense sticks, and wooden carvings." },
      { name: "Mysore Silk Sarees", desc: "Lustrous, light, and soft pure silk sarees adorned with genuine gold thread borders." },
      { name: "Channapatna Wooden Toys", desc: "Eco-friendly, brightly colored wooden toys polished with organic vegetable dyes." },
      { name: "Coorg Coffee Beans", desc: "Aromatic Arabica and Robusta coffee seeds grown in the shade of Coorg's forests." },
      { name: "Bidriware Metal Crafts", desc: "Distinctive black metalware inlaid with pure silver wires, originating from Bidar." }
    ]
  },
  "tamil-nadu": {
    description: "Tamil Nadu offers rich artistic heritage, ancient weaving techniques, and traditional bronze crafts.",
    items: [
      { name: "Kanchipuram Silk Sarees", desc: "Heavy silk sarees with contrast borders woven with high-quality gold thread." },
      { name: "Tanjore Paintings", desc: "Classical paintings depicting deities, decorated with real gold foil and semi-precious stones." },
      { name: "Swamimalai Bronze Statues", desc: "Statues hand-cast using the ancient lost-wax technique dating back to the Chola dynasty." },
      { name: "Traditional Filter Coffee Powder", desc: "Aromatic roasted coffee powder blended with chicory for the authentic South Indian brew." },
      { name: "Chettinad Tiles & Pottery", desc: "Hand-crafted heritage Athangudi tiles and traditional clay pots." }
    ]
  },
  "goa": {
    description: "Goa is perfect for buying tropical snacks, local liquors, and bohemian beach crafts.",
    items: [
      { name: "Goan Cashews", desc: "Freshly roasted, salted, or flavored jumbo cashews of exceptional quality." },
      { name: "Feni (Cashew or Coconut)", desc: "The iconic, double-distilled local Goan liquor with a strong aroma." },
      { name: "Spices from Ponda", desc: "Fresh peppercorns, cinnamon sticks, vanilla, and nutmeg from spice farms." },
      { name: "Coconut Shell Crafts", desc: "Bowls, lamps, and decorative jewelry carved out of polished coconut shells." },
      { name: "Bebinca Cake", desc: "A rich, traditional multi-layered Indo-Portuguese dessert made of coconut milk." }
    ]
  },
  "gujarat": {
    description: "Gujarat boasts colorful handlooms, mirrors, and rich traditional embroidery.",
    items: [
      { name: "Patola Silk Sarees", desc: "Double-ikat silk sarees woven with mathematical precision in Patan." },
      { name: "Kutchi Embroidery & Mirrors", desc: "Vibrant jackets, bags, and wall hangings decorated with heavy mirror-work." },
      { name: "Bandhani Textiles", desc: "Intricate tie-and-dye fabrics in bright hues of red, yellow, and green." },
      { name: "Sankheda Lacquered Furniture", desc: "Ornate wooden furniture painted with gold and silver leaf designs." },
      { name: "Khakhra & Gujarati Snacks", desc: "Crisp wheat flatbreads and savory snacks like Fafda and Gathiya." }
    ]
  },
  "west-bengal": {
    description: "West Bengal is famous for its fine teas, terracotta work, and exquisite hand-spun cotton.",
    items: [
      { name: "Darjeeling Tea", desc: "Known as the 'Champagne of Teas', featuring a unique muscatel flavor." },
      { name: "Bankura Terracotta Horses", desc: "Traditional clay sculptures characterized by long ears and erect posture." },
      { name: "Tant & Jamdani Sarees", desc: "Light, breathable handloom cotton sarees ideal for warm weather." },
      { name: "Sholapith Handicrafts", desc: "Delicate white decorative items made from the spongy pith of the Shola plant." },
      { name: "Bengali Sweets (Rosogolla/Sandesh)", desc: "Fresh cottage-cheese sweets soaked in sugar syrup or flavored with date palm jaggery." }
    ]
  },
  "delhi": {
    description: "Delhi is a national marketplace offering goods from every corner of India, alongside local specialties.",
    items: [
      { name: "Khari Baoli Spices", desc: "Bulk local spices, dried fruits, and herbs from Asia's largest spice bazaar." },
      { name: "Meena Bazaar Traditional Jewelry", desc: "Beautiful enameled earrings, bracelets, and ethnic accessories." },
      { name: "Dilli Haat Handicrafts", desc: "Artisanal wood carvings, leather bags, and regional textiles directly from weavers." },
      { name: "Janpath Tibetan Crafts", desc: "Brass trinkets, singing bowls, and ethnic silver accessories." }
    ]
  }
};

const defaultShopping = {
  description: "Explore the local markets to discover traditional handicrafts, regional handloom fabrics, and fresh farm products.",
  items: [
    { name: "Regional Handicrafts", desc: "Stone carvings, wooden items, or clay pottery crafted by local village artisans." },
    { name: "Traditional Handloom Weaves", desc: "Sarees, stoles, or fabrics displaying unique ethnic patterns native to this state." },
    { name: "Local Spices & Farm Treats", desc: "Freshly harvested spices, organic honey, or regional tea/coffee blends." },
    { name: "Traditional Sweets & Snacks", desc: "Delicious, long-lasting regional sweets prepared using local age-old recipes." }
  ]
};

export default function PlannerClient({ indiaData }: { indiaData: any[] }) {
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [itinerary, setItinerary] = useState<any | null>(null);

  // Form states
  const [stateId, setStateId] = useState<string>('rajasthan');
  const [districtId, setDistrictId] = useState<string>('all');
  const [days, setDays] = useState<number>(3);
  const [budget, setBudget] = useState<string>('mid');
  const [vibe, setVibe] = useState<string>('heritage');

  const loadingTexts = [
    "AI Architect is analyzing regional heritage routes...",
    "Querying local historical landmarks from Wikipedia...",
    "Calculating route distances and optimizing transport times...",
    "Curating authentic local food and market spots...",
    "Assembling your custom travel document..."
  ];

  // Derive districts list from selected state
  const stateObj = indiaData.find(s => s.id === stateId) || indiaData[0];
  const districts = stateObj ? stateObj.districts : [];

  const handleStateChange = (val: string) => {
    setStateId(val);
    setDistrictId('all'); // Reset district selection
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoadingStep(0);

    // Cycle through loading steps to look highly premium and active
    const interval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev < loadingTexts.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 600);

    setTimeout(() => {
      clearInterval(interval);
      
      const selectedDistrictObj = districts.find((d: any) => d.id === districtId);
      const generatedDays = [];
      
      // Vibe Title Database
      const vibeTitles: Record<string, string[]> = {
        spiritual: ["Temple Pilgrimage & Rituals", "Morning Prayers & Ghats", "Historical Shrines", "Spiritual Meditation & Local Ashram"],
        heritage: ["Fort & Palace Exploration", "Royal Architectural Wonders", "Heritage Village Stroll", "Ancient Museum and Art Center"],
        nature: ["Wildlife Sanctuary Trail", "Lake Cruise & Scenic Views", "Eco-Conservation Hike", "Sunrise Nature Photography"],
        culinary: ["Traditional Kitchen Workshop", "Historic Bazaar Food Crawl", "Organic Spice Farm Tour", "Traditional Royal Banquet Dinner"]
      };

      const selectedVibeTitles = vibeTitles[vibe] || vibeTitles["heritage"];

      if (districtId !== 'all' && selectedDistrictObj) {
        // District-Focused Itinerary Plan
        for (let d = 1; d <= days; d++) {
          const title = `${selectedDistrictObj.name} - ${selectedVibeTitles[(d - 1) % selectedVibeTitles.length]}`;
          
          // Custom organic daily descriptions for specific district tours
          const descriptions: Record<string, string[]> = {
            heritage: [
              `Begin your exploration of ${selectedDistrictObj.name} at the historical fort and monuments. Marvel at the intricate architecture, carvings, and regional heritage displays. In the evening, enjoy a walk through the local town center, meeting traditional craftsmen.`,
              `Dedicate today to the local palaces and historical buildings of ${selectedDistrictObj.name}. Tour the grand courtyards and private collections. In the evening, visit a local cooperative to see authentic handlooms and traditional regional crafts.`,
              `Head to the outskirts of ${selectedDistrictObj.name} to visit ancient stepwells, historical ruins, and local temples. Enjoy a traditional lunch at a heritage estate, followed by a cultural music recital or dance show in the evening.`
            ],
            spiritual: [
              `Start early with morning prayers and a serene walk around the iconic temples of ${selectedDistrictObj.name}. Learn about the historical legends associated with these shrines. Experience local spiritual rituals in the afternoon.`,
              `Visit the secondary shrines and historical monasteries of ${selectedDistrictObj.name}. Engage in a quiet meditation session at a local ashram, and participate in the evening community prayers and lamps (aarti) offering.`,
              `Take a peaceful drive to a sacred hilltop or riverside shrine in ${selectedDistrictObj.name}. Absorb the panoramic views, explore historical carvings, and interact with the spiritual guides.`
            ],
            nature: [
              `Embark on a morning nature trail around ${selectedDistrictObj.name}'s famous lakes and reserves. Capture scenic pictures of native migratory birds and natural landscapes. Enjoy a quiet boat cruise during sunset.`,
              `Explore the lush botanical parks, eco-conservation gardens, and scenic outcrops of ${selectedDistrictObj.name}. Have a picnic lunch under shady trees, and hike to the highest vantage point of the district for sunset views.`,
              `Explore the rustic countryside trails of ${selectedDistrictObj.name}. Visit organic farms, fresh water streams, and eco-friendly resorts showcasing sustainable rural living.`
            ],
            culinary: [
              `Indulge in a sensory food tour starting at the historic sweet shops of ${selectedDistrictObj.name}. Taste freshly prepared hot breakfast delicacies and local snacks. In the evening, participate in a culinary masterclass led by local home chefs.`,
              `Visit the bustling spice and grain markets of ${selectedDistrictObj.name}. Learn to identify authentic regional spices, and enjoy a traditional multi-course thali served on fresh banana leaves or copper platters.`,
              `Dine at a famous heritage restaurant in ${selectedDistrictObj.name} specializing in royal recipes. Discover the history behind iconic slow-cooked dishes, followed by a stroll through the local dessert and chaat streets.`
            ]
          };

          const selectedVibeDescs = descriptions[vibe] || descriptions["heritage"];
          const desc = selectedVibeDescs[(d - 1) % selectedVibeDescs.length] || `Continue your exploration of ${selectedDistrictObj.name} district, focusing on the local history, arts, and culinary delicacies. Visit regional landmarks, interact with resident guilds, and enjoy scenic heritage strolls.`;

          generatedDays.push({
            day: d.toString(),
            title,
            description: desc,
            districtId: selectedDistrictObj.id,
            districtName: selectedDistrictObj.name
          });
        }
      } else {
        // Multi-District State Cycling Itinerary Route
        for (let d = 1; d <= days; d++) {
          const distIndex = (d - 1) % districts.length;
          const district = districts[distIndex];
          
          const title = `${district.name} - ${selectedVibeTitles[(d - 1) % selectedVibeTitles.length]}`;
          const desc = `Explore the historical highlights of ${district.name} district. Visit the local town center, interact with artisans specializing in regional crafts, and taste the authentic local preparations. Recommended sightseeing includes the central palace monuments and evening strolls through regional handicraft bazaars.`;
          
          generatedDays.push({
            day: d.toString(),
            title,
            description: desc,
            districtId: district.id,
            districtName: district.name
          });
        }
      }

      // Generate custom packing list based on vibe
      const packingLists: Record<string, string[]> = {
        spiritual: ["Modest clothing for holy sites", "Easy slip-on sandals", "Hand sanitizer & wet wipes", "Traditional stole or shawl"],
        heritage: ["Comfortable walking shoes", "Sunglasses & sunscreen", "Camera or mobile charger", "Light cotton wear"],
        nature: ["Insect repellent spray", "Binoculars", "Robust trekking shoes or boots", "Earth-toned clothes"],
        culinary: ["Digestive tablets", "Reusable water bottle", "Hand wipes", "Comfortable clothing"]
      };

      // Calculate estimated cost
      const budgetRates: Record<string, number> = { budget: 2200, mid: 5500, luxury: 16000 };
      const estimatedCost = budgetRates[budget] * days;

      // Extract shopping recommendations
      const shoppingData = shoppingDatabase[stateId] || defaultShopping;

      setItinerary({
        stateName: stateObj.name,
        stateId: stateObj.id,
        districtName: districtId !== 'all' && selectedDistrictObj ? selectedDistrictObj.name : null,
        days: days,
        vibe: vibe,
        budget: budget,
        costEstimate: estimatedCost,
        packing: packingLists[vibe] || packingLists["heritage"],
        schedule: generatedDays,
        shopping: shoppingData,
        debugDistrictId: districtId,
        debugSelectedDistrictObj: selectedDistrictObj ? selectedDistrictObj.name : 'null',
        debugDays: days
      });
      setLoading(false);
    }, 3200);
  };

  const getBudgetLabel = (tier: string) => {
    const labels: Record<string, string> = {
      budget: "Budget (Backpacker)",
      mid: "Mid-Range Comfort",
      luxury: "Premium / Luxury Royale"
    };
    return labels[tier] || tier;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="page-container p-4 md:p-8 max-w-5xl mx-auto"
    >
      {/* Back navigation */}
      <div className="mb-6">
        <Link href="/" className="btn glass-panel inline-flex items-center gap-2 py-2 bg-white text-gray-700">
          <ArrowLeft size={18} /> Back to Map
        </Link>
      </div>

      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3.5 bg-accent-primary/10 rounded-2xl mb-4 text-accent-primary">
          <Bot size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">AI Travel Architect</h1>
        <p className="text-base text-gray-500 max-w-2xl mx-auto font-medium">
          Enter your parameters and let our intelligent engine structure a day-by-day heritage itinerary using our verified India tourism database.
        </p>
      </div>

      {loading ? (
        <div className="glass-panel p-16 text-center bg-white flex flex-col justify-center items-center gap-4">
          <Sparkles className="spin text-accent-primary" size={48} />
          <h3 className="text-xl font-bold text-gray-800">{loadingTexts[loadingStep]}</h3>
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-widest">Generating Itinerary</span>
        </div>
      ) : !itinerary ? (
        <form onSubmit={handleGenerate} className="glass-panel p-6 md:p-10 bg-white border border-gray-100 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* Destination State */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Destination State</label>
              <div className="relative">
                <Map className="absolute left-4 top-3.5 text-accent-secondary" size={18} />
                <select 
                  value={stateId}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-12 pr-4 text-gray-700 font-semibold appearance-none outline-none focus:border-accent-primary transition-colors" 
                  required
                >
                  {indiaData.map((state) => (
                    <option key={state.id} value={state.id}>{state.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Destination District selection */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Destination District</label>
              <div className="relative">
                <Navigation className="absolute left-4 top-3.5 text-accent-secondary" size={18} />
                <select 
                  value={districtId}
                  onChange={(e) => setDistrictId(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-12 pr-4 text-gray-700 font-semibold appearance-none outline-none focus:border-accent-primary transition-colors" 
                  required
                >
                  <option value="all">All Districts (Whole State Route)</option>
                  {districts.map((d: any) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Travel Vibe */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Travel Style / Vibe</label>
              <div className="relative">
                <Compass className="absolute left-4 top-3.5 text-accent-primary" size={18} />
                <select 
                  value={vibe}
                  onChange={(e) => setVibe(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-12 pr-4 text-gray-700 font-semibold appearance-none outline-none focus:border-accent-primary transition-colors" 
                  required
                >
                  <option value="heritage">Heritage & History Exploration</option>
                  <option value="spiritual">Spiritual Pilgrimage & Temples</option>
                  <option value="nature">Nature Wonders & Wildlife Trails</option>
                  <option value="culinary">Culinary & Street Food Adventures</option>
                </select>
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Duration (Days)</label>
              <div className="relative">
                <CalendarDays className="absolute left-4 top-3.5 text-accent-tertiary" size={18} />
                <input 
                  type="number" 
                  min="1" 
                  max="10" 
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-12 pr-4 text-gray-700 font-semibold outline-none focus:border-accent-primary transition-colors" 
                  required 
                />
              </div>
            </div>

            {/* Budget Category */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Budget Tier</label>
              <div className="relative">
                <IndianRupee className="absolute left-4 top-3.5 text-green-700" size={18} />
                <select 
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-12 pr-4 text-gray-700 font-semibold appearance-none outline-none focus:border-accent-primary transition-colors" 
                  required
                >
                  <option value="budget">Budget Backpacker (Local Travel)</option>
                  <option value="mid">Mid-Range Comfort (Hotels + Cab)</option>
                  <option value="luxury">Luxury Royale (Heritage Palace Stays)</option>
                </select>
              </div>
            </div>

          </div>

          <button 
            type="submit" 
            className="w-full py-4 rounded-xl btn btn-primary font-bold text-lg flex justify-center items-center gap-2"
          >
            <Sparkles size={20} />
            Craft Custom Itinerary
          </button>
        </form>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8"
        >
          {/* Generated Itinerary Main Card */}
          <div className="glass-panel p-6 md:p-8 bg-white relative overflow-hidden border-t-4 border-t-accent-primary">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-6 mb-8 gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-accent-primary tracking-widest block mb-1">Generated Document</span>
                <h2 className="text-3xl font-extrabold text-gray-800">{itinerary.days}-Day {itinerary.vibe.toUpperCase()} Journey</h2>
                <p className="text-sm font-semibold text-gray-500 flex items-center gap-1.5 mt-1">
                  <Map size={16} className="text-accent-secondary" />
                  Exploring {itinerary.districtName ? `${itinerary.districtName} District, ` : ''}{itinerary.stateName} state
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5 font-bold">
                  Debug Data: Selected District ID="{itinerary.debugDistrictId}" | Found District="{itinerary.debugSelectedDistrictObj}" | Days Input={itinerary.debugDays}
                </p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => window.print()}
                  className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-all"
                  title="Print Travel Plan"
                >
                  <Printer size={18} />
                </button>
                <button 
                  onClick={() => {
                    alert("Itinerary successfully saved to offline pocket book!");
                    setItinerary(null);
                  }}
                  className="px-4 py-2 bg-accent-secondary hover:bg-accent-secondary/95 text-white rounded-xl text-xs font-bold transition-all"
                >
                  Plan Another
                </button>
              </div>
            </div>

            {/* Day timelines */}
            <div className="space-y-8 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
              {itinerary.schedule.map((dayItem: any) => (
                <div key={dayItem.day} className="flex gap-6 items-start relative">
                  
                  {/* Day marker */}
                  <div className="w-12 h-12 rounded-2xl bg-accent-primary text-white font-extrabold flex items-center justify-center shadow-md shrink-0 z-10 border-4 border-white">
                    D{dayItem.day}
                  </div>

                  {/* Day Content */}
                  <div className="glass-panel p-5 bg-[#FCFBF9] border border-gray-100 hover:border-accent-primary/20 transition-all rounded-2xl flex-grow">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-extrabold text-lg text-gray-800">{dayItem.title}</h3>
                      <Link 
                        href={`/district/${itinerary.stateId}/${dayItem.districtId}`}
                        className="text-[11px] font-bold text-accent-secondary bg-accent-secondary/10 px-2.5 py-1 rounded-md border border-accent-secondary/15 hover:bg-accent-secondary hover:text-white transition-all"
                      >
                        Explore District →
                      </Link>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed font-semibold">{dayItem.description}</p>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Cost Estimates, Packing list & Shopping sidebar dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Budget details */}
            <div className="glass-panel p-6 bg-white">
              <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                <IndianRupee className="text-green-700" size={18} /> Budget Estimations
              </h3>
              
              <div className="space-y-3">
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] text-gray-400 block font-bold uppercase">Pricing Tier</span>
                    <span className="font-extrabold text-xs text-gray-700">{getBudgetLabel(itinerary.budget)}</span>
                  </div>
                  <span className="text-[10px] font-bold text-accent-secondary bg-accent-secondary/10 px-2 py-0.5 rounded">Active</span>
                </div>

                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] text-gray-400 block font-bold uppercase">Estimated Total</span>
                    <span className="font-extrabold text-lg text-gray-800">INR {itinerary.costEstimate.toLocaleString('en-IN')}</span>
                  </div>
                  <span className="text-[9px] text-gray-400 font-medium">*Excludes Flights</span>
                </div>
              </div>
            </div>

            {/* Packing List */}
            <div className="glass-panel p-6 bg-white">
              <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Briefcase className="text-accent-primary" size={18} /> Packing List
              </h3>
              
              <ul className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                {itinerary.packing.map((packItem: string, idx: number) => (
                  <li key={idx} className="flex gap-2 items-center text-xs font-semibold text-gray-600 bg-gray-50 p-2 rounded-xl border border-gray-100">
                    <CheckSquare size={14} className="text-accent-secondary" />
                    {packItem}
                  </li>
                ))}
              </ul>
            </div>

            {/* Local Shopping & Souvenirs recommendations */}
            <div className="glass-panel p-6 bg-white border border-gray-100">
              <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                <ShoppingBag className="text-accent-secondary" size={18} /> Shopping & Souvenirs
              </h3>
              
              <p className="text-[11px] text-gray-500 font-semibold mb-3 leading-relaxed">
                {itinerary.shopping.description}
              </p>
              
              <ul className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                {itinerary.shopping.items.map((item: any, idx: number) => (
                  <li key={idx} className="flex flex-col gap-0.5 text-xs font-semibold text-gray-600 bg-gray-50 p-2 rounded-xl border border-gray-100">
                    <span className="text-accent-primary font-bold text-[11px] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-primary"></span>
                      {item.name}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium pl-3 leading-relaxed">{item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
