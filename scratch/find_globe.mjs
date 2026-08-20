import fs from 'fs';
import path from 'path';

function searchInDir(dir, pattern) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      searchInDir(filePath, pattern);
    } else if (stat.isFile() && (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.jsx'))) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes(pattern)) {
        console.log(`Found pattern "${pattern}" in: ${filePath}`);
      }
    }
  }
}

searchInDir('C:/Users/pande/.gemini/antigravity/scratch/BharatYatra/app', 'ThreeDScene');
searchInDir('C:/Users/pande/.gemini/antigravity/scratch/BharatYatra/app', 'cobe');
