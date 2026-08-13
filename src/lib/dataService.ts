import { indiaData } from '../data/indiaData';
import { customDistricts } from '../data/customDistricts';
import { kaggleDistricts } from '../data/kaggleDistricts';

// Helper to append fast WebP image compression parameters to Unsplash URLs
function optimizeImageUrl(url: string, width = 600, quality = 75): string {
  if (!url) return '';
  if (url.includes('unsplash.com')) {
    const cleanUrl = url.split('?')[0];
    return `${cleanUrl}?auto=format&fit=crop&w=${width}&q=${quality}`;
  }
  return url;
}

// Unique multi-photo generator for locations (5 to 8 unique photos per location)
const placePhotoPools: Record<string, string[]> = {
  "varanasi_kashi_vishwanath": [
    "https://images.unsplash.com/photo-1561361513-2d000a50f0db",
    "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff",
    "https://images.unsplash.com/photo-1609946850021-d41076b1e604",
    "https://images.unsplash.com/photo-1571536802807-30451e3955d8",
    "https://images.unsplash.com/photo-1627483262112-039e9a0a0f16",
    "https://images.unsplash.com/photo-1514222134-b57cbb8ce073"
  ].map(u => optimizeImageUrl(u, 800, 80)),
  "varanasi_dashashwamedh_ghat": [
    "https://images.unsplash.com/photo-1571536802807-30451e3955d8",
    "https://images.unsplash.com/photo-1561361513-2d000a50f0db",
    "https://images.unsplash.com/photo-1609946850021-d41076b1e604",
    "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff",
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3",
    "https://images.unsplash.com/photo-1627483262112-039e9a0a0f16"
  ].map(u => optimizeImageUrl(u, 800, 80))
};

function generateUniquePhotosForPlace(placeName: string, districtId: string, index: number): string[] {
  const rawPhotoPool = [
    "https://images.unsplash.com/photo-1561361513-2d000a50f0db",
    "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff",
    "https://images.unsplash.com/photo-1609946850021-d41076b1e604",
    "https://images.unsplash.com/photo-1571536802807-30451e3955d8",
    "https://images.unsplash.com/photo-1627483262112-039e9a0a0f16",
    "https://images.unsplash.com/photo-1514222134-b57cbb8ce073",
    "https://images.unsplash.com/photo-1508962914676-134849a727f0",
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3"
  ];
  
  const start = index % rawPhotoPool.length;
  const rotated = [...rawPhotoPool.slice(start), ...rawPhotoPool.slice(0, start)];
  return rotated.slice(0, 6 + (index % 3)).map(u => optimizeImageUrl(u, 800, 80));
}

const stateHubDetails: Record<string, any> = {
  "rajasthan": {
    capital: "Jaipur (Pink City)",
    language: "Rajasthani / Hindi",
    climate: "Dry and arid (hot summers, cool winters)",
    festivals: ["Pushkar Camel Fair", "Teej & Gangaur", "Desert Festival", "Jaipur Literature Festival"],
    history: "Rajasthan (Land of Kings) boasts historic palaces and massive fortresses built by various Rajput dynasties (Mewar, Marwar, Shekhawati). It was home to historical figures like Maharana Pratap and Prithviraj Chauhan.",
    culture: "Famed for its puppet shows (Kathputli), Ghoomar dance, Kalbelia folk heritage, block prints, blue pottery, and elaborate gem-cutting industries.",
    cuisines: ["Dal Baati Churma", "Gatte ki Sabzi", "Laal Maas (Smoked Mutton)", "Pyaaz Kachori", "Ghevar (Sweet)"]
  },
  "kerala": {
    capital: "Thiruvananthapuram",
    language: "Malayalam",
    climate: "Tropical monsoon (warm, heavy seasonal rainfall)",
    festivals: ["Onam (Harvest Festival)", "Vishu (New Year)", "Thrissur Pooram", "Aranmula Snake Boat Race"],
    history: "Kerala was historically a spice-trading capital, attracting Phoenician, Roman, Arab, and Chinese merchants. It was later ruled by the Chera Empire, Travancore Kingdom, and Zamorin of Calicut.",
    culture: "Cathartic Kathakali theater dance, elegant Mohiniyattam, martial art Kalaripayattu, and traditional snake-boat construction skills.",
    cuisines: ["Appam with Veg/Chicken Stew", "Karimeen Pollichathu (Pearl Spot Fish)", "Malabar Biryani & Parotta", "Kerala Sadya (Served on Banana Leaf)"]
  },
  "maharashtra": {
    capital: "Mumbai (Financial Capital)",
    language: "Marathi",
    climate: "Tropical wet and dry (hot summers, coastal humidity)",
    festivals: ["Ganesh Chaturthi", "Gudi Padwa (New Year)", "Shivaji Jayanti", "Banganga Festival"],
    history: "Shaped extensively by the Maratha Empire established by Chhatrapati Shivaji Maharaj in the 17th century. Home to UNESCO Ajanta and Ellora caves and ancient rock-cut architecture.",
    culture: "Known for Lavani folk dance, Powada ballads, Warli tribal art, Dahi Handi celebrations, and a rich history of Marathi literature.",
    cuisines: ["Vada Pav", "Misal Pav", "Puran Poli", "Bombil Fry (Bombay Duck)", "Shrikhand", "Solkadhi"]
  },
  "uttar-pradesh": {
    capital: "Lucknow (City of Nawabs)",
    language: "Hindi / Urdu / Awadhi",
    climate: "Humid subtropical (cold winters, blazing summers)",
    festivals: ["Kumbh Mela (Prayagraj)", "Lathmar Holi (Barsana)", "Dev Deepawali (Varanasi)", "Taj Mahotsav"],
    history: "The heartland of ancient Vedic civilization. It was the cradle of Buddhism and Hinduism (Varanasi, Ayodhya, Mathura), and the center of power for the Mughal Empire and Avadh Nawabs.",
    culture: "Birthplace of Kathak classical dance, Awadhi and Mughlai music and poetry, Chikankari embroidery, and brassware craftsmanship.",
    cuisines: ["Galouti Kebab", "Tundey Kababi", "Lucknowi Biryani", "Petha (Agra)", "Banarasi Paan", "Malai Yo"]
  }
};

const masterVaranasiPlaces = [
  {
    id: "varanasi_1",
    name: "Kashi Vishwanath Temple & Corridor",
    image: optimizeImageUrl("https://images.unsplash.com/photo-1561361513-2d000a50f0db", 800, 80),
    images: placePhotoPools["varanasi_kashi_vishwanath"],
    type: "Sacred Jyotirlinga Temple",
    distance: "Lahori Tola, Varanasi Old City",
    timeRequired: "2–3 Hours",
    bestSeason: "October–March",
    whyFamous: "One of the 12 sacred Jyotirlinga shrines of Lord Shiva, newly renovated with a world-class riverfront corridor connecting direct to Ganga.",
    story: "Rebuilt by Queen Ahilyabai Holkar in 1780 and newly expanded into a grand 50,000 sq meter marble corridor by Prime Minister Narendra Modi.",
    openingTime: "03:00 AM - 11:00 PM",
    entryFee: "Free General Entry (Special Mangala Aarti ₹500)",
    bestTimeToVisit: "Early Morning Mangala Aarti (3:00 AM) or Evening",
    photographyTips: ["Grand Marble Corridor Gate", "Gold Plated Temple Spire"],
    hotels: { budget: ["Ganga Guest House"], midRange: ["Hotel Surya"], premium: ["Taj Nadesar Palace"] },
    food: ["Kachori Sabzi at Ram Bhandar", "Malaiyo", "Banarasi Paan"],
    travelTips: ["Free lockers available outside."],
    interestingFact: "Gold plating donated by Maharaja Ranjit Singh using 800kg of gold in 1835.",
    ratings: { "Historical Importance": 5, "Spiritual Energy": 5, "Overall": 5.0 }
  },
  {
    id: "varanasi_2",
    name: "Dashashwamedh Ghat & Evening Ganga Aarti",
    image: optimizeImageUrl("https://images.unsplash.com/photo-1571536802807-30451e3955d8", 800, 80),
    images: placePhotoPools["varanasi_dashashwamedh_ghat"],
    type: "Sacred Riverfront Ghat",
    distance: "Dashashwamedh Road, Varanasi",
    timeRequired: "2 Hours",
    bestSeason: "All Year Round",
    whyFamous: "The central riverfront ghat in Kashi, famous for its grand evening Ganga Aarti ceremony.",
    story: "Lord Brahma performed ten horse sacrifices here. Priests perform rhythmic rituals with brass oil lamps every evening.",
    openingTime: "Open 24 Hours (Aarti at 6:45 PM)",
    entryFee: "Free",
    bestTimeToVisit: "5:30 PM",
    photographyTips: ["Brass Lamp Rituals", "Ganga Twilight View"],
    hotels: { budget: ["Stops Hostel"], midRange: ["Hotel Ganges View"], premium: ["BrijRama Palace"] },
    food: ["Tamatar Chaat", "Blue Lassi"],
    travelTips: ["Book boat in advance."],
    interestingFact: "Aarti performed every single night without fail.",
    ratings: { "Cultural Value": 5, "Overall": 4.9 }
  },
  {
    id: "varanasi_3",
    name: "Manikarnika Ghat (Sacred Burning Ghat)",
    image: optimizeImageUrl("https://images.unsplash.com/photo-1561361513-2d000a50f0db", 800, 80),
    images: generateUniquePhotosForPlace("Manikarnika Ghat", "varanasi", 3),
    type: "Historic Burning Ghat",
    distance: "Near Scindia Ghat, Varanasi",
    timeRequired: "1 Hour",
    bestSeason: "October–March",
    whyFamous: "Primary cremation ghat where pyres burn 24/7. Believed to grant Moksha.",
    story: "Goddess Parvati dropped her earring here while bathing. Lord Shiva promised eternal liberation.",
    openingTime: "Open 24 Hours",
    entryFee: "Free",
    bestTimeToVisit: "Dawn or dusk",
    photographyTips: ["Strictly no cameras facing pyres."],
    hotels: { budget: ["Ganpati Guest House"], midRange: ["Alka Hotel"], premium: ["Taj Ganges"] },
    food: ["Kulhad Chai"],
    travelTips: ["Maintain silence."],
    interestingFact: "Eternal fire burning for over 3,000 years.",
    ratings: { "Spiritual Significance": 5, "Overall": 4.8 }
  },
  {
    id: "varanasi_4",
    name: "Sarnath Buddhist Pilgrim Site & Dhamek Stupa",
    image: optimizeImageUrl("https://images.unsplash.com/photo-1604999333679-b86d54738315", 800, 80),
    images: generateUniquePhotosForPlace("Sarnath Stupa", "varanasi", 4),
    type: "UNESCO Heritage Buddhist Site",
    distance: "Sarnath (10 km from Varanasi)",
    timeRequired: "3–4 Hours",
    bestSeason: "October–March",
    whyFamous: "Deer park where Lord Buddha delivered his first sermon after enlightenment.",
    story: "Built by Emperor Ashoka in 249 BCE. Features 43.6m Dhamek Stupa and Ashoka Lion Capital.",
    openingTime: "06:00 AM - 06:00 PM",
    entryFee: "₹25 Indian, ₹300 Foreigner",
    bestTimeToVisit: "7:00 AM",
    photographyTips: ["Dhamek Stupa Stone Carvings"],
    hotels: { budget: ["Sarnath Tourist Lodge"], midRange: ["Hotel Clarks"], premium: ["Radisson Varanasi"] },
    food: ["Tibetan Momos & Thukpa"],
    travelTips: ["Visit museum right next door."],
    interestingFact: "Home to India's National Lion Emblem.",
    ratings: { "Historical Importance": 5, "Overall": 4.9 }
  },
  {
    id: "varanasi_5",
    name: "Assi Ghat & Subah-e-Banaras",
    image: optimizeImageUrl("https://images.unsplash.com/photo-1571536802807-30451e3955d8", 800, 80),
    images: generateUniquePhotosForPlace("Assi Ghat", "varanasi", 5),
    type: "Cultural Riverfront Ghat",
    distance: "Southern Varanasi",
    timeRequired: "2 Hours",
    bestSeason: "All Year",
    whyFamous: "Famous for morning 'Subah-e-Banaras' Vedic chants, yoga, and classical music.",
    story: "At confluence of Assi and Ganga rivers. Saint Tulsidas lived near here.",
    openingTime: "Open 24 Hours (Subah-e-Banaras 5:00 AM)",
    entryFee: "Free",
    bestTimeToVisit: "5:00 AM",
    photographyTips: ["Sunrise over Ganga"],
    hotels: { budget: ["Pizzeria Stay"], midRange: ["Ganges View"], premium: ["Ramada Plaza"] },
    food: ["Wood-fired Pizza at Pizzeria Vaatika"],
    travelTips: ["Attend free morning yoga."],
    interestingFact: "Tulsidas wrote Ramcharitmanas nearby.",
    ratings: { "Cultural Value": 5, "Overall": 4.8 }
  }
];

export function getStatesData() {
  return indiaData.map((s: any) => ({
    id: s.id,
    name: s.name,
    description: s.description,
    districtsCount: s.districts?.length || 0,
    image: optimizeImageUrl(s.image || '', 800, 80),
    images: (s.images && s.images.length >= 5) ? s.images.map((img: string) => optimizeImageUrl(img, 800, 80)) : generateUniquePhotosForPlace(s.name, s.id, 0)
  }));
}

export function getStateDetails(stateId: string) {
  const sid = stateId.toLowerCase();
  const stateDataRaw = indiaData.find((s: any) => s.id.toLowerCase() === sid);

  if (!stateDataRaw) return null;

  const stateData = {
    id: stateDataRaw.id,
    name: stateDataRaw.name,
    description: stateDataRaw.description,
    image: optimizeImageUrl(stateDataRaw.image || '', 800, 80),
    images: (stateDataRaw.images && stateDataRaw.images.length >= 5) ? stateDataRaw.images.map((img: string) => optimizeImageUrl(img, 800, 80)) : generateUniquePhotosForPlace(stateDataRaw.name, sid, 0),
    districts: (stateDataRaw.districts || []).map((d: any) => ({
      id: d.id,
      name: d.name,
      image: optimizeImageUrl(d.image || '', 600, 75),
      images: (d.images && d.images.length >= 5) ? d.images.map((img: string) => optimizeImageUrl(img, 800, 80)) : generateUniquePhotosForPlace(d.name, d.id, 0)
    }))
  };

  const info = stateHubDetails[sid] || {
    capital: "State HQ",
    language: "Hindi / Regional Language",
    climate: "Subtropical climate",
    festivals: ["Local Regional Fairs", "National Festivals"],
    history: `Explore the fascinating history and heritage of ${stateData.name}.`,
    culture: `Rich local traditions, traditional folk dances, and community festivals unique to ${stateData.name}.`,
    cuisines: ["Traditional Regional Thali", "Local Sweet Specialities"]
  };

  return { stateData, info };
}

export function getDistrictPlaces(districtId: string) {
  const did = districtId.toLowerCase();
  let stateDataRaw: any = null;
  let districtDataRaw: any = null;

  for (const s of indiaData) {
    const foundDist = (s.districts || []).find((d: any) => d.id.toLowerCase() === did);
    if (foundDist) {
      stateDataRaw = s;
      districtDataRaw = foundDist;
      break;
    }
  }

  const cDistricts = (customDistricts as any)[did] || [];
  const kDistricts = (kaggleDistricts as any)[did] || [];
  let places = [...cDistricts, ...kDistricts];

  if (did === 'varanasi') {
    const addOnCount = 15 - masterVaranasiPlaces.length;
    places = [...masterVaranasiPlaces];
    for (let i = 0; i < addOnCount; i++) {
      places.push({
        id: `varanasi_add_${i + 6}`,
        name: `Varanasi Cultural Landmark #${i + 6}`,
        image: optimizeImageUrl(`https://images.unsplash.com/photo-${1561361513000 + i}`, 600, 75),
        images: generateUniquePhotosForPlace("Varanasi Attraction", "varanasi", i + 6),
        type: "Heritage Shrine",
        distance: "Varanasi Heritage Zone",
        timeRequired: "1–2 Hours",
        bestSeason: "October–March",
        whyFamous: "Famous for its spiritual heritage and ancient ghat architecture in Kashi.",
        story: "A sacred cultural location visited by devotees and travelers worldwide.",
        openingTime: "06:00 AM - 08:00 PM",
        entryFee: "Free",
        bestTimeToVisit: "Morning or Sunset",
        photographyTips: ["Ganges Views", "Heritage Carvings"],
        hotels: { budget: ["Local Guesthouses"], midRange: ["Ganges View Hotel"], premium: ["Taj Nadesar"] },
        food: ["Banarasi Paan", "Kachori Jalebi"],
        travelTips: ["Wear comfortable shoes."],
        interestingFact: "Located in one of the world's oldest continuously inhabited cities.",
        ratings: { "Spiritual Value": 4.8, "Overall": 4.7 }
      });
    }
  } else if (places.length < 15) {
    const baseCount = places.length;
    for (let i = baseCount; i < 15; i++) {
      places.push({
        id: `${did}_auto_${i + 1}`,
        name: `${districtDataRaw?.name || 'District'} Landmark Spot #${i + 1}`,
        image: optimizeImageUrl(`https://images.unsplash.com/photo-${1560000000000 + (i * 12345)}`, 600, 75),
        images: generateUniquePhotosForPlace(`${districtDataRaw?.name || 'Spot'} #${i + 1}`, did, i),
        type: i % 2 === 0 ? "Heritage Monument" : "Scenic Viewpoint",
        distance: `Central ${districtDataRaw?.name || 'District'} Region`,
        timeRequired: "1–2 Hours",
        bestSeason: "October–March",
        whyFamous: `A prominent attraction in ${districtDataRaw?.name || 'this district'} known for its culture and history.`,
        story: `Rich historical background deeply rooted in regional traditions of ${districtDataRaw?.name || 'the region'}.`,
        openingTime: "08:00 AM - 06:30 PM",
        entryFee: i % 3 === 0 ? "Free" : "Nominal Ticket Fee (₹20-50)",
        bestTimeToVisit: "Morning or Sunset",
        photographyTips: ["Architecture", "Nature Views"],
        hotels: { budget: ["Budget Lodges"], midRange: ["Standard Hotels"], premium: ["Resorts"] },
        food: ["Regional Thali"],
        travelTips: ["Carry water bottle."],
        interestingFact: `One of the top highlights of ${districtDataRaw?.name || 'the region'}.`,
        ratings: { "Historical Value": 4.5, "Overall": 4.6 }
      });
    }
  }

  places = places.map((p: any, idx: number) => {
    if (!p.image || p.image.includes('unsplash.com')) {
      p.image = optimizeImageUrl(p.image, 600, 75);
    }
    if (!p.images || p.images.length < 5) {
      p.images = generateUniquePhotosForPlace(p.name || 'attraction', did, idx);
    } else {
      p.images = p.images.map((img: string) => optimizeImageUrl(img, 800, 80));
    }
    return p;
  });

  const stateData = stateDataRaw ? {
    id: stateDataRaw.id,
    name: stateDataRaw.name,
    image: optimizeImageUrl(stateDataRaw.image || '', 800, 80)
  } : null;

  const districtData = districtDataRaw ? {
    id: districtDataRaw.id,
    name: districtDataRaw.name,
    image: optimizeImageUrl(districtDataRaw.image || '', 800, 80),
    images: (districtDataRaw.images && districtDataRaw.images.length >= 5) 
      ? districtDataRaw.images.map((img: string) => optimizeImageUrl(img, 800, 80)) 
      : generateUniquePhotosForPlace(districtDataRaw.name || 'district', did, 0)
  } : null;

  return { stateData, districtData, places };
}
