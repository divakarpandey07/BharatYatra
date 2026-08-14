import fs from 'fs';

const validUnsplashUrls = [
  "https://images.unsplash.com/photo-1609946850021-d41076b1e604", // Tirupati Gopuram
  "https://images.unsplash.com/photo-1582510003544-4d00b7f74220", // Mountain Viewpoint
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa", // River/Beach Coast
  "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7", // Caves
  "https://images.unsplash.com/photo-1561361513-2d000a50f0db", // Riverfront/Dam
  "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a", // Fort Ramparts
  "https://images.unsplash.com/photo-1600683479198-d106fb3c03ee", // Hawa Mahal
  "https://images.unsplash.com/photo-1589308078059-be1415eab4c3", // Sandstone Architecture
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da", // Taj Mahal Dome
  "https://images.unsplash.com/photo-1571536802807-30451e3955d8", // Ganga Aarti
  "https://images.unsplash.com/photo-1604999333679-b86d54738315", // Sarnath Stupa
  "https://images.unsplash.com/photo-1506461883276-594a12b11cf3", // Himalayan Pines
  "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23", // Sela Pass Valleys
  "https://images.unsplash.com/photo-1597074866923-dc0589150358", // Ziro Valley
  "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944", // Tea Gardens
  "https://images.unsplash.com/photo-1593693397690-362cb9666fc2", // Houseboat Backwaters
  "https://images.unsplash.com/photo-1514222134-b57cbb8ce073", // Golden Temple
  "https://images.unsplash.com/photo-1570168007204-dfb528c6958f"  // Marine Drive
];

const filesToClean = [
  'C:/Users/pande/.gemini/antigravity/scratch/BharatYatra/src/lib/dataService.ts',
  'C:/Users/pande/.gemini/antigravity/scratch/BharatYatra/src/data/indiaData.js'
];

filesToClean.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix any malformed URLs missing 'photo-' (e.g. unsplash.com/15825...)
  content = content.replace(/https:\/\/images\.unsplash\.com\/(?!photo-)(\d+[^\s"',`]+)/g, (match, p1) => {
    return `https://images.unsplash.com/photo-${p1}`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Cleaned up malformed URLs in ${filePath}`);
});
