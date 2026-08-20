import rawData from './rawIndiaData.json';

export interface DistrictData {
  id: string;
  name: string;
  description: string;
  image: string;
  images: string[];
  places: any[];
}

export interface StateData {
  id: string;
  name: string;
  description: string;
  image: string;
  images: string[];
  districts: DistrictData[];
}

const stateImagesMap: Record<string, string[]> = {
  "uttar-pradesh": [
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200",
    "https://images.unsplash.com/photo-1561361513-2d000a50f0db?q=80&w=1200",
    "https://images.unsplash.com/photo-1571536802807-30451e3955d8?q=80&w=1200",
    "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=1200"
  ],
  "rajasthan": [
    "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?q=80&w=1200",
    "https://images.unsplash.com/photo-1600683479198-d106fb3c03ee?q=80&w=1200",
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200",
    "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200"
  ],
  "kerala": [
    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200",
    "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200",
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200"
  ],
  "maharashtra": [
    "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?q=80&w=1200",
    "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1200",
    "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?q=80&w=1200"
  ],
  "karnataka": [
    "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=1200",
    "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200",
    "https://images.unsplash.com/photo-1609946850021-d41076b1e604?q=80&w=1200"
  ],
  "tamil-nadu": [
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200",
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200"
  ],
  "goa": [
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200",
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200",
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200"
  ],
  "gujarat": [
    "https://images.unsplash.com/photo-1609946850021-d41076b1e604?q=80&w=1200",
    "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?q=80&w=1200",
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200"
  ],
  "west-bengal": [
    "https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=1200",
    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200",
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200"
  ],
  "uttarakhand": [
    "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=1200",
    "https://images.unsplash.com/photo-1571536802807-30451e3955d8?q=80&w=1200",
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200"
  ],
  "himachal-pradesh": [
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200",
    "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=1200",
    "https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1200"
  ],
  "jammu-and-kashmir": [
    "https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1200",
    "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=1200",
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200"
  ],
  "delhi": [
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200",
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200",
    "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=1200"
  ],
  "punjab": [
    "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=1200",
    "https://images.unsplash.com/photo-1561361513-2d000a50f0db?q=80&w=1200",
    "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=1200"
  ],
  "telangana": [
    "https://images.unsplash.com/photo-1609946850021-d41076b1e604?q=80&w=1200",
    "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?q=80&w=1200",
    "https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1200"
  ],
  "odisha": [
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200",
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200"
  ],
  "assam": [
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200",
    "https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1200",
    "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1200"
  ],
  "sikkim": [
    "https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1200",
    "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=1200",
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200"
  ],
  "andhra-pradesh": [
    "https://images.unsplash.com/photo-1609946850021-d41076b1e604?q=80&w=1200",
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200"
  ],
  "arunachal-pradesh": [
    "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=1200",
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200",
    "https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1200"
  ],
  "bihar": [
    "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=1200",
    "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?q=80&w=1200",
    "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=1200"
  ],
  "chhattisgarh": [
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200",
    "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?q=80&w=1200",
    "https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1200"
  ],
  "haryana": [
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200",
    "https://images.unsplash.com/photo-1561361513-2d000a50f0db?q=80&w=1200",
    "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=1200"
  ],
  "jharkhand": [
    "https://images.unsplash.com/photo-1561361513-2d000a50f0db?q=80&w=1200",
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200",
    "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=1200"
  ],
  "madhya-pradesh": [
    "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=1200",
    "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?q=80&w=1200",
    "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=1200"
  ],
  "manipur": [
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200",
    "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?q=80&w=1200",
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200"
  ],
  "meghalaya": [
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200",
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200",
    "https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1200"
  ],
  "mizoram": [
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200",
    "https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1200",
    "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=1200"
  ],
  "nagaland": [
    "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=1200",
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200",
    "https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1200"
  ],
  "tripura": [
    "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200",
    "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?q=80&w=1200",
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200"
  ],
  "andaman-and-nicobar-islands": [
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200",
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200"
  ],
  "chandigarh": [
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200",
    "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1200",
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200"
  ],
  "dadra-and-nagar-haveli-and-daman-and-diu": [
    "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?q=80&w=1200",
    "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?q=80&w=1200",
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200"
  ],
  "ladakh": [
    "https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1200",
    "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=1200",
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200"
  ],
  "lakshadweep": [
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200",
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200"
  ],
  "puducherry": [
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200",
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200",
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200"
  ]
};

const defaultLandmarkImagePool = [
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200",
  "https://images.unsplash.com/photo-1561361513-2d000a50f0db?q=80&w=1200",
  "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?q=80&w=1200",
  "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200"
];

export const indiaData: StateData[] = [];

(rawData as any[]).forEach((stateObj: any) => {
  const stateName = stateObj.name;
  const districtsArray = stateObj.districts;
  
  if (districtsArray && districtsArray.length > 0) {
    const stateId = stateName.toLowerCase().replace(/[\s&]+/g, '-').replace(/-+/g, '-');
    const images = stateImagesMap[stateId] || defaultLandmarkImagePool;

    const sObj: StateData = {
      id: stateId,
      name: stateName,
      description: `Explore the vibrant culture, rich heritage, and natural beauty of ${stateName}.`,
      image: images[0],
      images: images,
      districts: []
    };

    districtsArray.forEach((districtName: string) => {
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
