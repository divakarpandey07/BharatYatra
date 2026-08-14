import { getStateDetails, getStatesData } from '../src/lib/dataService.js';
import { indiaData } from '../src/data/indiaData.js';

console.log("--- AUDITING ALL DISTRICT CARDS FOR ALL STATES ---");

let badPhotosFound = [];
let totalDistrictsTested = 0;

indiaData.forEach(state => {
  const details = getStateDetails(state.id);
  if (details && details.stateData && details.stateData.districts) {
    details.stateData.districts.forEach(d => {
      totalDistrictsTested++;
      const img = d.image;
      if (!img || !img.startsWith('http')) {
        badPhotosFound.push({ state: state.name, district: d.name, reason: "Missing/Invalid URL", url: img });
      }
    });
  }
});

console.log(`Total Districts Tested: ${totalDistrictsTested}`);
console.log(`Bad/Missing District Card Photos Found: ${badPhotosFound.length}`);
if (badPhotosFound.length > 0) {
  console.log(badPhotosFound.slice(0, 10));
}
