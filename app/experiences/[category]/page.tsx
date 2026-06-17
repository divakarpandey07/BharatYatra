import ExperienceClient from '../../components/ExperienceClient';

const EXPERIENCE_DATA = {
  spiritual: {
    title: "Spiritual Journeys",
    description: "Discover inner peace and divine connection across India's most sacred destinations.",
    heroImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Shri_Kashi_Vishwanath_Temple.jpg",
    destinations: [
      { name: "Varanasi", state: "Uttar Pradesh", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Shri_Kashi_Vishwanath_Temple.jpg", tag: "Ghats & Temples", slug: "uttar-pradesh" },
      { name: "Rishikesh", state: "Uttarakhand", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Trayambakeshwar_Temple_VK.jpg/1280px-Trayambakeshwar_Temple_VK.jpg", tag: "Yoga Capital", slug: "uttarakhand" },
      { name: "Amritsar", state: "Punjab", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/The_Golden_Temple_of_Amrithsar_7.jpg/1280px-The_Golden_Temple_of_Amrithsar_7.jpg", tag: "Golden Temple", slug: "punjab" },
      { name: "Bodh Gaya", state: "Bihar", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Mahabodhitemple.jpg/1280px-Mahabodhitemple.jpg", tag: "Buddhist Circuit", slug: "bihar" },
      { name: "Madurai", state: "Tamil Nadu", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/1280px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg", tag: "Ancient Temples", slug: "tamil-nadu" },
      { name: "Haridwar", state: "Uttarakhand", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Ganga_aarti_haridwar_01.jpg/1280px-Ganga_aarti_haridwar_01.jpg", tag: "Ganga Aarti", slug: "uttarakhand" },
    ]
  },
  adventure: {
    title: "Adventure Escapes",
    description: "Thrill-seeking expeditions from the high Himalayas to the deep blue oceans.",
    heroImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=80",
    destinations: [
      { name: "Leh Ladakh", state: "Ladakh", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Road_Padum_Zanskar_Range_Jun24_A7CR_00818.jpg", tag: "High Altitude Passes", slug: "ladakh" },
      { name: "Manali", state: "Himachal Pradesh", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Manali_City.jpg", tag: "Snow Sports", slug: "himachal-pradesh" },
      { name: "Auli", state: "Uttarakhand", img: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80", tag: "Skiing", slug: "uttarakhand" },
      { name: "Andaman Islands", state: "Andaman", img: "https://images.unsplash.com/photo-1598324789736-4861f89564a0?auto=format&fit=crop&w=1200&q=80", tag: "Scuba Diving", slug: "andaman-and-nicobar-islands" },
      { name: "Spiti Valley", state: "Himachal Pradesh", img: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=1200&q=80", tag: "Motorbiking", slug: "himachal-pradesh" },
      { name: "Gulmarg", state: "Jammu & Kashmir", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Ancient_Temple,_Gulmarg.jpg", tag: "Winter Trekking", slug: "jammu-and-kashmir" },
    ]
  },
  heritage: {
    title: "Heritage & History",
    description: "Step back in time and explore India's majestic palaces, forts, and ruins.",
    heroImage: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80",
    destinations: [
      { name: "Jaipur", state: "Rajasthan", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80", tag: "Pink City Forts", slug: "rajasthan" },
      { name: "Agra", state: "Uttar Pradesh", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Taj_Mahal_(Edited).jpeg", tag: "Mughal Architecture", slug: "uttar-pradesh" },
      { name: "Hampi", state: "Karnataka", img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80", tag: "Vijayanagara Ruins", slug: "karnataka" },
      { name: "Mysore", state: "Karnataka", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Mysore_Palace_Morning.jpg", tag: "Royal Palaces", slug: "karnataka" },
      { name: "Khajuraho", state: "Madhya Pradesh", img: "https://commons.wikimedia.org/wiki/Special:FilePath/1_Khajuraho.jpg", tag: "Ancient Carvings", slug: "madhya-pradesh" },
      { name: "Delhi", state: "Delhi", img: "https://commons.wikimedia.org/wiki/Special:FilePath/India_Gate_(All_India_War_Memorial).jpg", tag: "Capital History", slug: "delhi" },
    ]
  },
  nature: {
    title: "Nature & Wildlife",
    description: "Immerse yourself in lush green forests, exotic wildlife, and serene backwaters.",
    heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80",
    destinations: [
      { name: "Munnar", state: "Kerala", img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80", tag: "Tea Plantations", slug: "kerala" },
      { name: "Ranthambore", state: "Rajasthan", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Ranthambore_National_Park.JPG", tag: "Tiger Safari", slug: "rajasthan" },
      { name: "Sundarbans", state: "West Bengal", img: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80", tag: "Mangrove Forests", slug: "west-bengal" },
      { name: "Kaziranga", state: "Assam", img: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80", tag: "Rhino Reserve", slug: "assam" },
      { name: "Coorg", state: "Karnataka", img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80", tag: "Scotland of India", slug: "karnataka" },
      { name: "Darjeeling", state: "West Bengal", img: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=1200&q=80", tag: "Himalayan Foothills", slug: "west-bengal" },
    ]
  },
  academic: {
    title: "Academic Locations",
    description: "Explore India's premier centers of learning and rich educational heritage.",
    heroImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Main%20building%20in%20IIT%20Bombay.jpg",
    destinations: [
      { name: "IIT Bombay", state: "Maharashtra", img: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Main_building_in_IIT_Bombay.jpg", tag: "Powai Lake", slug: "maharashtra" },
      { name: "IISc Bangalore", state: "Karnataka", img: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Main_Building%2C_Indian_Institute_of_Science%2C_Bangalore%2C_Karnataka%2C_India_(2017).jpg", tag: "Research Hub", slug: "karnataka" },
      { name: "IIT Delhi", state: "Delhi", img: "https://upload.wikimedia.org/wikipedia/commons/0/0d/IIT_Delhi_Main_Building.jpeg", tag: "Tech Campus", slug: "delhi" },
      { name: "IIT Roorkee", state: "Uttarakhand", img: "https://upload.wikimedia.org/wikipedia/commons/e/e0/IIT_Roorkee_Main_Building.jpg", tag: "Historic Engineering", slug: "uttarakhand" },
      { name: "IIT Madras", state: "Tamil Nadu", img: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Hostels_East_IIT_Madras_Jun23_A7C_05191.jpg", tag: "Green Campus", slug: "tamil-nadu" },
      { name: "BITS Pilani Goa", state: "Goa", img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/BITS_GOA_main_building.jpg", tag: "Coastal Campus", slug: "goa" },
      { name: "BHU Varanasi", state: "Uttar Pradesh", img: "https://upload.wikimedia.org/wikipedia/commons/b/b8/BHU_Main_Gate%2C_Banaras_Hindu_University_enhanced.jpg", tag: "Heritage University", slug: "uttar-pradesh" },
      { name: "National Defence Academy", state: "Maharashtra", img: "https://upload.wikimedia.org/wikipedia/commons/f/fe/National_Defence_Academy_Sudan_Block.jpg", tag: "Khadakwasla", slug: "maharashtra" },
      { name: "IIM Ahmedabad", state: "Gujarat", img: "https://upload.wikimedia.org/wikipedia/commons/e/ec/IIM_Ahmedabad_New_Campus.JPG", tag: "Iconic Brick Architecture", slug: "gujarat" },
      { name: "NIT Srinagar", state: "Jammu & Kashmir", img: "https://upload.wikimedia.org/wikipedia/commons/a/a3/NIT_Srinagar.jpg", tag: "Himalayan Campus", slug: "jammu-and-kashmir" },
      { name: "Lovely Professional University", state: "Punjab", img: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Lovely_Professional_University_(LPU)%2C_Jalandhar-Phagwara_Highway%2C_Jalandhar.jpg", tag: "Modern Campus", slug: "punjab" },
      { name: "Nalanda University", state: "Bihar", img: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Temple_12_-_Nalanda_Mahavihara_(17).jpg", tag: "Ancient Heritage", slug: "bihar" }
    ]
  }
};

export default function ExperiencePage({ params }: { params: { category: string } }) {
  const categoryKey = params.category.toLowerCase();
  
  // Type assertion or check to ensure we only access valid keys
  const data = EXPERIENCE_DATA[categoryKey as keyof typeof EXPERIENCE_DATA];

  return <ExperienceClient data={data} />;
}
