import fs from 'fs';
import path from 'path';

// Bad URLs identified:
// 1. photo-1627483262112-039e9a0a0f16 (Two women exercising in red background)
// 2. photo-1600100397608-f010e423b971 (Dead/Broken 404 grey box)

const badUrl1 = "https://images.unsplash.com/photo-1627483262112-039e9a0a0f16";
const badUrl2 = "https://images.unsplash.com/photo-1600100397608-f010e423b971";

const replacementPhotos = [
  "https://images.unsplash.com/photo-1506461883276-594a12b11cf3", // Himalayan Pines
  "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23", // Sela Pass Green Valleys
  "https://images.unsplash.com/photo-1597074866923-dc0589150358", // Ziro Valley
  "https://images.unsplash.com/photo-1609946850021-d41076b1e604", // Heritage Gopuram
  "https://images.unsplash.com/photo-1582510003544-4d00b7f74220", // Mountain Viewpoint
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa", // Scenic Waterway
  "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7"  // Ancient Limestone Cave
];

const filesToClean = [
  'C:/Users/pande/.gemini/antigravity/scratch/BharatYatra/src/lib/dataService.ts',
  'C:/Users/pande/.gemini/antigravity/scratch/BharatYatra/src/data/indiaData.js',
  'C:/Users/pande/.gemini/antigravity/scratch/BharatYatra/src/data/customDistricts.ts',
  'C:/Users/pande/.gemini/antigravity/scratch/BharatYatra/src/data/kaggleDistricts.ts'
];

filesToClean.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let replacedCount = 0;
    
    // Replace badUrl1
    while (content.includes("photo-1627483262112-039e9a0a0f16")) {
      const rep = replacementPhotos[replacedCount % replacementPhotos.length];
      content = content.replace("photo-1627483262112-039e9a0a0f16", rep.split('photo-')[1]);
      replacedCount++;
    }

    // Replace badUrl2
    while (content.includes("photo-1600100397608-f010e423b971")) {
      const rep = replacementPhotos[replacedCount % replacementPhotos.length];
      content = content.replace("photo-1600100397608-f010e423b971", rep.split('photo-')[1]);
      replacedCount++;
    }

    if (replacedCount > 0) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Purged ${replacedCount} bad image instances from ${path.basename(filePath)}`);
    }
  }
});
