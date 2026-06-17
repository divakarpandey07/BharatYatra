import { indiaData } from '../../../src/data/indiaData';
import StateClient from '../../components/StateClient';

// Pre-compiled cultural hub database for premium quality (India Wikipedia knowledge)
const stateHubDetails: Record<string, {
  capital: string,
  language: string,
  climate: string,
  festivals: string[],
  history: string,
  culture: string,
  cuisines: string[]
}> = {
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
  },
  "karnataka": {
    capital: "Bengaluru (Silicon Valley)",
    language: "Kannada",
    climate: "Tropical savannah (temperate in Bengaluru)",
    festivals: ["Mysore Dasara", "Ugadi", "Kambala Buffalo Race", "Hampi Utsav"],
    history: "Home to the glorious Vijayanagara Empire, Chalukyas of Badami, Rashtrakutas, and the Kingdom of Mysore under Tipu Sultan. Famous for the ancient ruins of Hampi.",
    culture: "Yakshagana dance-drama, Dollu Kunitha folk drums, Mysore painting, and Carnatic musical contributions.",
    cuisines: ["Bisi Bele Bath", "Mysore Masala Dosa", "Ragi Mudde", "Coorg Pandi Curry", "Dharwad Pedha"]
  },
  "tamil-nadu": {
    capital: "Chennai",
    language: "Tamil",
    climate: "Tropical wet and dry (monsoons in Oct-Dec)",
    festivals: ["Pongal (Harvest)", "Puthandu (New Year)", "Madurai Chithirai Festival", "Karthigai Deepam"],
    history: "Ruled by three ancient Tamil empires: Cholas, Cheras, and Pandyas, who built remarkable Dravidian stone temple complexes and spread trade across Southeast Asia.",
    culture: "Bharatanatyam classical dance, Kolam rice drawings, Tanjore gold-leaf paintings, Carnatic vocal music, and Kanchipuram silk weaving.",
    cuisines: ["Idli & Sambar", "Chettinad Pepper Chicken", "Masala Dosa", "Filter Coffee", "Pongal Sweet Dish"]
  },
  "goa": {
    capital: "Panaji",
    language: "Konkani",
    climate: "Tropical maritime (humid, moderate temperatures)",
    festivals: ["Goa Carnival", "Shigmo", "Sunburn Festival", "Feast of St. Francis Xavier"],
    history: "Influenced by 450 years of Portuguese rule, which ended in 1961. Historically a critical maritime trading port for Kadamba and Vijayanagara kings.",
    culture: "Unique blend of Indo-Portuguese music (Mando), brass bands, Christian and Hindu architectural integration, and fishing community folklore.",
    cuisines: ["Fish Curry Rice", "Pork Vindaloo", "Chicken Xacuti", "Bebinca (Multi-layered Cake)", "Feni"]
  },
  "gujarat": {
    capital: "Gandhinagar",
    language: "Gujarati",
    climate: "Semi-arid to arid (hot dry summers)",
    festivals: ["Navratri (Garba)", "International Kite Festival (Uttarayan)", "Rann Utsav", "Janmashtami"],
    history: "Home to Lothal, one of the oldest ports of the Indus Valley Civilization. Ruled by Solanki Rajputs and later prominent in the Independence movement led by Mahatma Gandhi.",
    culture: "Garba and Dandiya Raas dances, Patola silk weaving, Bandhani tie-dye fabrics, and Kutchi mirror embroidery.",
    cuisines: ["Dhokla", "Thepla", "Khandvi", "Gujarati Thali (Sweet & Sour)", "Undhiyu", "Jalebi Fafda"]
  },
  "west-bengal": {
    capital: "Kolkata (Cultural Capital)",
    language: "Bengali",
    climate: "Tropical wet-and-dry (humid monsoon)",
    festivals: ["Durga Puja", "Poila Baisakh (New Year)", "Noboborsho", "Ganga Sagar Mela"],
    history: "Center of the Bengal Renaissance, the Indian Independence struggle, and British East India Company rule. Home to Nobel Laureate Rabindranath Tagore.",
    culture: "Baul folk music, Rabindra Sangeet, Shantiniketan art, Bengali cinema, Kantha embroidery, and clay pottery of Kumartuli.",
    cuisines: ["Machher Jhol (Fish Curry)", "Kosha Mangsho (Mutton)", "Roshogolla & Sandesh", "Luchi and Alur Dom", "Mishti Doi"]
  },
  "uttarakhand": {
    capital: "Dehradun",
    language: "Garhwali / Kumaoni / Hindi",
    climate: "Cool temperate in hills, subtropical in valleys",
    festivals: ["Nanda Devi Raj Jat", "Kumbh Mela (Haridwar)", "Ganga Dussehra", "Phool Dei"],
    history: "Known as 'Devbhumi' (Land of the Gods). Contains the ancient Char Dham pilgrimage temples and historically formed part of the Katyuri and Chand dynasties.",
    culture: "Folk music of Hurkiya Baul, Jhora dance, Aipan threshold paintings, and rich mountaineering/herbal traditions.",
    cuisines: ["Kafuli (Green Leafy Dish)", "Aloo ke Gutke", "Dubuk", "Bal Mithai", "Bhang ki Chutney"]
  }
};

// Helper for generic capitals
function getCapitalNameMock(state: string) {
  const capitals: Record<string, string> = {
    "Bihar": "Patna", "Madhya Pradesh": "Bhopal", "Punjab": "Chandigarh", "Telangana": "Hyderabad",
    "Andhra Pradesh": "Amaravati", "Odisha": "Bhubaneswar", "Jammu and Kashmir": "Srinagar", "Ladakh": "Leh"
  };
  return capitals[state] || "State HQ";
}

export default function StatePage({ params }: { params: { stateId: string } }) {
  const stateDataRaw = indiaData.find((s: any) => s.id === params.stateId);
  
  if (!stateDataRaw) {
    return <StateClient stateData={null} info={null} />;
  }

  // Pick only necessary properties to avoid sending giant JSON to client
  const stateData = {
    id: stateDataRaw.id,
    name: stateDataRaw.name,
    description: stateDataRaw.description,
    image: stateDataRaw.image || '',
    images: stateDataRaw.images || [],
    districts: (stateDataRaw.districts || []).map((d: any) => ({
      id: d.id,
      name: d.name,
      image: d.image || '',
      images: d.images || []
    }))
  };

  const currentId = params.stateId.toLowerCase();
  const info = stateHubDetails[currentId] || {
    capital: getCapitalNameMock(stateData.name),
    language: "Hindi / Regional Language",
    climate: "Subtropical climate",
    festivals: ["Local Regional Fairs", "National Festivals"],
    history: `Explore the fascinating history and heritage of ${stateData.name}. Deeply embedded in Indian historical narratives and regional folklore.`,
    culture: `Rich local traditions, traditional folk dances, and community festivals unique to the state of ${stateData.name}.`,
    cuisines: ["Traditional Regional Thali", "Local Sweet Specialities"]
  };

  return <StateClient stateData={stateData} info={info} />;
}
