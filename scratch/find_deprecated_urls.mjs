import fs from 'fs';
import path from 'path';

const filesToFix = [
  'C:/Users/pande/.gemini/antigravity/scratch/BharatYatra/src/lib/dataService.ts',
  'C:/Users/pande/.gemini/antigravity/scratch/BharatYatra/src/data/kaggleDistricts.ts',
  'C:/Users/pande/.gemini/antigravity/scratch/BharatYatra/src/data/customDistricts.ts',
  'C:/Users/pande/.gemini/antigravity/scratch/BharatYatra/src/data/indiaData.js'
];

filesToFix.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const sourceCount = (content.match(/source\.unsplash\.com/g) || []).length;
    console.log(`File ${path.basename(filePath)} has ${sourceCount} instances of source.unsplash.com`);
    
    if (sourceCount > 0) {
      // Replace source.unsplash.com URLs with direct valid Unsplash photo URLs
      content = content.replace(/https:\/\/source\.unsplash\.com\/[^\s"'`,]+/g, 'https://images.unsplash.com/photo-1609946850021-d41076b1e604?auto=format&fit=crop&w=800&q=80');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Replaced all source.unsplash.com in ${path.basename(filePath)}`);
    }
  }
});
