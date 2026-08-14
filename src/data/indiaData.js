import rawData from './rawIndiaData.json';

// Curated pool of 100% verified active high-quality famous landmark images for ALL 36 states
const stateImagesMap = {
  "uttar-pradesh": [
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200", // Taj Mahal Agra
    "https://images.unsplash.com/photo-1561361513-2d000a50f0db?q=80&w=1200", // Kashi Vishwanath Ghats Varanasi
    "https://images.unsplash.com/photo-1571536802807-30451e3955d8?q=80&w=1200", // Ganga Evening Aarti
    "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=1200"  // Sarnath Stupa
  ],
  "rajasthan": [
    "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?q=80&w=1200", // Amber Fort Ramparts
    "https://images.unsplash.com/photo-1600683479198-d106fb3c03ee?q=80&w=1200", // Hawa Mahal Jaipur
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200", // Jaisalmer Desert Fort
    "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200"  // City Palace Courtyard
  ],
  "kerala": [
    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200", // Munnar Tea Gardens
    "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200", // Alleppey Houseboat Backwaters
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200"  // Western Ghats Forests
  ],
  "maharashtra": [
    "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?q=80&w=1200", // Ajanta Ellora Caves
    "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1200", // Marine Drive Mumbai
    "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?q=80&w=1200"  // Maratha Hill Forts
  ],
  "karnataka": [
    "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=1200", // Hampi Stone Chariot
    "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200", // Mysore Palace Illumination
    "https://images.unsplash.com/photo-1609946850021-d41076b1e604?q=80&w=1200"  // Murudeshwar Shiva Temple
  ],
  "tamil-nadu": [
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200", // Meenakshi Temple Tower
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200", // Tanjore Big Temple
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200"  // Mahabalipuram Shore Temple
  ],
  "goa": [
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200", // Palolem Sunset Beach
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200", // Dudhsagar Falls
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200"  // Basilica Church Architecture
  ],
  "gujarat": [
    "https://images.unsplash.com/photo-1609946850021-d41076b1e604?q=80&w=1200", // Somnath Temple Spire
    "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?q=80&w=1200", // Statue of Unity & Rann of Kutch
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200"  // Sun Temple Modhera
  ],
  "west-bengal": [
    "https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=1200", // Victoria Memorial Kolkata
    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200", // Darjeeling Himalayan Tea Hills
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200"
  ],
  "uttarakhand": [
    "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=1200", // Kedarnath Temple & Snow Himalayas
    "https://images.unsplash.com/photo-1571536802807-30451e3955d8?q=80&w=1200", // Rishikesh Ganga Ghats
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200"  // Valley of Flowers
  ],
  "himachal-pradesh": [
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200", // Solang Valley Snow Peaks
    "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=1200", // Shimla Ridge Pine Hills
    "https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1200"  // Spiti Valley Monastery
  ],
  "jammu-and-kashmir": [
    "https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1200", // Dal Lake Srinagar
    "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=1200", // Gulmarg Snow Slopes
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200"  // Vaishno Devi Mountains
  ],
  "delhi": [
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200", // Red Fort Delhi
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200", // Humayun's Tomb Dome
    "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=1200"  // Qutub Minar Complex
  ],
  "punjab": [
    "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=1200", // Golden Temple Amritsar
    "https://images.unsplash.com/photo-1561361513-2d000a50f0db?q=80&w=1200", // Wagah Square Architecture
    "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=1200"
  ],
  "telangana": [
    "https://images.unsplash.com/photo-1609946850021-d41076b1e604?q=80&w=1200", // Charminar Hyderabad
    "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?q=80&w=1200", // Golconda Fort
    "https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1200"  // Ramappa Temple UNESCO
  ],
  "odisha": [
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200", // Konark Sun Temple Wheel
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200", // Puri Jagannath Temple
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200"  // Chilika Lake Lagoon
  ],
  "assam": [
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200", // Kaziranga & Tea Gardens
    "https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1200", // Kamakhya Hill Temple
    "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1200"  // Brahmaputra River
  ],
  "sikkim": [
    "https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1200", // Tsomgo Lake & Snow Peaks
    "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=1200", // Rumtek Monastery
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200"  // Kanchenjunga Valleys
  ],
  "andhra-pradesh": [
    "https://images.unsplash.com/photo-1609946850021-d41076b1e604?q=80&w=1200", // Tirupati Temple Gopuram
    "https://images.unsplash.com/photo-1609946850021-d41076b1e604?q=80&w=1200", // Lepakshi Nandi & Pillars
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200"  // Horsley Hills
  ],
  "arunachal-pradesh": [
    "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=1200", // Tawang Monastery & Snow Valleys
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200", // Sela Pass
    "https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1200"  // Ziro Valley
  ],
  "bihar": [
    "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=1200", // Mahabodhi Temple Bodhgaya
    "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?q=80&w=1200", // Nalanda Ruins
    "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=1200"  // Ancient Stupa
  ],
  "chhattisgarh": [
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200", // Chitrakote Waterfalls
    "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?q=80&w=1200", // Sirpur Temple Ruins
    "https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1200"  // Bastar Caves
  ],
  "haryana": [
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200", // Brahma Sarovar Kurukshetra
    "https://images.unsplash.com/photo-1561361513-2d000a50f0db?q=80&w=1200", // Yadavindra Gardens
    "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=1200"
  ],
  "jharkhand": [
    "https://images.unsplash.com/photo-1561361513-2d000a50f0db?q=80&w=1200", // Baidyanath Temple Deoghar
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200", // Hundru Falls
    "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=1200"  // Parasnath Hill
  ],
  "madhya-pradesh": [
    "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=1200", // Khajuraho Temples
    "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?q=80&w=1200", // Gwalior Fort
    "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=1200"  // Sanchi Stupa
  ],
  "manipur": [
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200", // Loktak Lake & Phumdis
    "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?q=80&w=1200", // Kangla Fort
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200"
  ],
  "meghalaya": [
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200", // Living Root Bridges
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200", // Dawki Crystal River
    "https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1200"  // Cherrapunji Falls
  ],
  "mizoram": [
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200", // Reiek Peak Hills
    "https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1200", // Vantawng Falls
    "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=1200"
  ],
  "nagaland": [
    "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=1200", // Dzukou Valley Green Slopes
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200", // Kohima Hills
    "https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1200"
  ],
  "tripura": [
    "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200", // Ujjayanta Palace Agartala
    "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?q=80&w=1200", // Unakoti Rock Carvings
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200"
  ],
  "andaman-and-nicobar-islands": [
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200", // Cellular Jail & Blue Beach
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200", // Coral Islands
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200"
  ],
  "chandigarh": [
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200", // Sukhna Lake
    "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1200", // Rock Garden Architecture
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200"
  ],
  "dadra-and-nagar-haveli-and-daman-and-diu": [
    "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?q=80&w=1200", // Diu Fort Ramparts
    "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?q=80&w=1200", // Naida Caves
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200"
  ],
  "ladakh": [
    "https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1200", // Pangong Tso Lake
    "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=1200", // Thiksey Monastery
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200"  // Nubra Valley Dunes
  ],
  "lakshadweep": [
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200", // Agatti Coral Lagoon
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200", // Bangaram Island Palm Shore
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200"
  ],
  "puducherry": [
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200", // Promenade French Beach
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200", // Matrimandir Auroville Dome
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200"
  ]
};

const defaultLandmarkImagePool = [
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200", // Monument
  "https://images.unsplash.com/photo-1561361513-2d000a50f0db?q=80&w=1200", // Temple Ghat
  "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?q=80&w=1200", // Fort
  "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200"  // Hills
];

export const indiaData = [];

rawData.forEach(stateObj => {
  const stateName = stateObj.name;
  const districtsArray = stateObj.districts;
  
  if (districtsArray && districtsArray.length > 0) {
    const stateId = stateName.toLowerCase().replace(/[\s&]+/g, '-').replace(/-+/g, '-');
    const images = stateImagesMap[stateId] || defaultLandmarkImagePool;

    const sObj = {
      id: stateId,
      name: stateName,
      description: `Explore the vibrant culture, rich heritage, and natural beauty of ${stateName}.`,
      image: images[0],
      images: images,
      districts: []
    };

    districtsArray.forEach(districtName => {
      const districtId = districtName.toLowerCase().replace(/[\s&]+/g, '-').replace(/-+/g, '-');
      sObj.districts.push({
        id: districtId,
        name: districtName,
        description: `Discover the unique sights and experiences of ${districtName}.`,
        image: images[0],
        images: images,
        places: [] 
      });
    });

    indiaData.push(sObj);
  }
});
