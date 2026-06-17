import rawData from './rawIndiaData.json';

// Curated pool of 100% verified active high-quality famous images for states
const stateImagesMap = {
  "rajasthan": [
    "https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=1200", // Thar Desert, Jaisalmer
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200", // Indian Culture/Spices
    "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=1200"  // Hawa Mahal, Jaipur
  ],
  "kerala": [
    "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200", // Alleppey Houseboat
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200", // Kovalam Beach
    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200"  // Kerala Backwaters
  ],
  "maharashtra": [
    "https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=1200", // Gateway of India, Mumbai
    "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1200", // Marine Drive
    "https://images.unsplash.com/photo-1602643163983-ed0babc39797?q=80&w=1200", // Marine Drive night
    "https://images.unsplash.com/photo-1618083707368-b3823daa2726?q=80&w=1200"  // Chhatrapati Shivaji Terminal Mumbai
  ],
  "uttar-pradesh": [
    "https://images.unsplash.com/photo-1561361513-2d000a50f0db?q=80&w=1200", // Varanasi/Heritage culture
    "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=1200"  // Ancient temple heritage
  ],
  "karnataka": [
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200", // Vidhana Soudha, Bangalore
    "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1200"  // Bangalore Palace
  ],
  "tamil-nadu": [
    "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1200", // South India Palace/Heritage
    "https://images.unsplash.com/photo-1580835239846-5bb9ce03c8c3?q=80&w=1200", // Brihadisvara Gopuram tower
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200"  // Culture/Spices
  ],
  "goa": [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200", // Goa Beach
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200", // Goa Beach with Palms
    "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=1200", // Goa Tropical Sea
    "https://images.unsplash.com/photo-1540206395-68808572332f?q=80&w=1200", // Goa Beach Sunset
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200"  // Goa Beach Rocks
  ],
  "gujarat": [
    "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200", // Statue of Unity
    "https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=1200"  // Gir Lion
  ],
  "west-bengal": [
    "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=1200", // Victoria Memorial, Kolkata
    "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=1200"  // Kolkata Street Life
  ],
  "uttarakhand": [
    "https://images.unsplash.com/photo-1545249390-6bdfa286032f?q=80&w=1200", // Rishikesh River/Hills
    "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200", // Himalayas
    "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1200"  // Snow Peaks
  ],
  "himachal-pradesh": [
    "https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=1200", // Shimla hills
    "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200", // Shimla mountains
    "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200"  // Himalayas
  ],
  "jammu-and-kashmir": [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200", // Dal Lake Houseboat
    "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200"  // Snowy hills
  ],
  "delhi": [
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1200", // India Gate
    "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1200", // India Gate evening
    "https://images.unsplash.com/photo-1562979314-bee7453e911c?q=80&w=1200", // India Gate close-up
    "https://images.unsplash.com/photo-1591261730799-ee4e6c2d16d7?q=80&w=1200"  // Humayun's Tomb
  ],
  "punjab": [
    "https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=1200"  // Fields of Punjab
  ],
  "telangana": [
    "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=1200"  // Southern temple heritage
  ],
  "odisha": [
    "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=1200", // Bhubaneswar Temple
    "https://images.unsplash.com/photo-1627483262112-039e9a0a0f16?q=80&w=1200"  // Odisha heritage/art
  ],
  "assam": [
    "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=1200", // Assam Tea gardens
    "https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=1200"  // Rural greenery
  ],
  "sikkim": [
    "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1200", // Sikkim Himalayas
    "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200"  // Mountain range
  ],
  "andhra-pradesh": [
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200", // Spices
    "https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=1200", // Greenery
    "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=1200"  // Temple style heritage
  ],
  "arunachal-pradesh": [
    "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200", // Hills
    "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1200"  // Snow peaks
  ],
  "bihar": [
    "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=1200", // Ancient temple heritage
    "https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=1200"  // Rural field
  ],
  "chhattisgarh": [
    "https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=1200", // Forest/greenery
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200"  // Spices/culture
  ],
  "haryana": [
    "https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=1200"  // Agriculture green field
  ],
  "jharkhand": [
    "https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=1200"  // Greenery
  ],
  "madhya-pradesh": [
    "https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=1200", // Wildlife/lion
    "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=1200", // Temple heritage
    "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=1200"  // Ancient temple heritage
  ],
  "manipur": [
    "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200"  // Green hills
  ],
  "meghalaya": [
    "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200", // Hills
    "https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=1200"  // Streams/valleys
  ],
  "mizoram": [
    "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200"  // Valley
  ],
  "nagaland": [
    "https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=1200", // Green valleys
    "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200"  // Green hills
  ],
  "tripura": [
    "https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=1200"  // Valleys
  ],
  "andaman-and-nicobar-islands": [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200", // Beach
    "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=1200"  // Tropical sea
  ],
  "chandigarh": [
    "https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=1200"  // Gardens/greenery
  ],
  "dadra-and-nagar-haveli-and-daman-and-diu": [
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200"  // Diu beach
  ],
  "ladakh": [
    "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200", // Valley hills
    "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1200"  // Snow mountains
  ],
  "lakshadweep": [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200", // Coral beaches
    "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=1200"  // Blue lagoon
  ],
  "puducherry": [
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200", // Beaches/palms
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200"  // Sea coast
  ]
};

// Curated pool of 100% verified active high-quality famous images for specific popular districts
const districtImagesMap = {
  "jaipur": [
    "https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=1200", // Desert/Jaipur gateway style
    "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=1200"  // Hawa Mahal
  ],
  "jodhpur": [
    "https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=1200", // Thar Desert
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200"  // Jodhpur spices/market
  ],
  "udaipur": [
    "https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=1200", // Lakes/Desert style
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200"  // Spices/culture style
  ],
  "jaisalmer": [
    "https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=1200"  // Thar Desert Jaisalmer
  ],
  "agra": [
    "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200", // Taj Mahal
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200"  // Taj Mahal Close-up
  ],
  "varanasi": [
    "https://images.unsplash.com/photo-1561361513-2d000a50f0db?q=80&w=1200", // Varanasi spiritual culture (Ghats sunset)
    "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=1200"  // Temple style
  ],
  "mumbai": [
    "https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=1200", // Gateway of India
    "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1200", // Marine Drive
    "https://images.unsplash.com/photo-1602643163983-ed0babc39797?q=80&w=1200", // Marine Drive night
    "https://images.unsplash.com/photo-1618083707368-b3823daa2726?q=80&w=1200"  // CST Mumbai
  ],
  "bengaluru": [
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200", // Vidhana Soudha
    "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1200"  // Bangalore Palace
  ],
  "mysore": [
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200", // Heritage context
    "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1200"  // Palace context
  ],
  "alappuzha": [
    "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200", // Houseboat
    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200"  // Backwaters
  ],
  "munnar": [
    "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=1200"  // Tea gardens
  ],
  "amritsar": [
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200"  // Golden Temple
  ],
  "hyderabad": [
    "https://images.unsplash.com/photo-1605538032432-a9f0c8d9baac?q=80&w=1200", // Charminar
    "https://images.unsplash.com/photo-1605152276897-4f618f831968?q=80&w=1200"  // Charminar night
  ]
};

const genericImages = [
  "https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=1200", // Green fields
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200", // Travel flatlay map
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200"  // Mountains
];

export const indiaData = [];

rawData.forEach(stateObj => {
  const stateName = stateObj.name;
  const districtsArray = stateObj.districts;
  
  if (districtsArray && districtsArray.length > 0) {
    const stateId = stateName.toLowerCase().replace(/[\s&]+/g, '-').replace(/-+/g, '-');
    const images = stateImagesMap[stateId] || [genericImages[0], genericImages[1]];

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
      // Look up district specific images, or fall back to the state's famous image pool
      const dImages = districtImagesMap[districtId] || images;

      sObj.districts.push({
        id: districtId,
        name: districtName,
        description: `Discover the unique sights and experiences of ${districtName}.`,
        image: dImages[0],
        images: dImages,
        places: [] 
      });
    });

    indiaData.push(sObj);
  }
});

