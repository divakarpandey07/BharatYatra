import { getDistrictPlaces } from '../src/lib/dataService.js';

console.log("--- TESTING CHANDAULI DISTRICT PLACES ---");
const chandauli = getDistrictPlaces('chandauli');
console.log("Chandauli State Name:", chandauli.stateData.name);
console.log("Chandauli District Name:", chandauli.districtData.name);
console.log("Places Count:", chandauli.places.length);

console.log("\nChandauli Places List:");
chandauli.places.slice(0, 10).forEach((p, idx) => {
  console.log(`${idx + 1}. ${p.name}`);
});
