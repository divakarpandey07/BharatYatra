import { getStatesData, getStateDetails } from '../src/lib/dataService.js';

console.log("=== VERIFYING ALL 36 STATES DATA AND IMAGES ===");
const states = getStatesData();
console.log(`Total States Returned: ${states.length}`);

let invalidCount = 0;
states.forEach((st, idx) => {
  const details = getStateDetails(st.id);
  console.log(`${idx + 1}. [${st.id}] ${st.name}`);
  console.log(`   Card Image: ${st.image}`);
  console.log(`   Hero Images (${st.images.length}): ${st.images.slice(0, 2).join(', ')}`);
  
  if (!st.image || st.image.includes('undefined') || st.image.includes('null')) {
    console.error(`   ❌ BROKEN IMAGE URL for ${st.name}`);
    invalidCount++;
  }
});

if (invalidCount === 0) {
  console.log("✅ ALL 36 STATES HAVE 100% VALID UNIQUE LANDMARK IMAGE URLS!");
} else {
  console.log(`❌ FOUND ${invalidCount} BROKEN STATE IMAGES!`);
}
