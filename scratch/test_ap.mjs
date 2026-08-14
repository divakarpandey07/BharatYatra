import { getDistrictPlaces } from '../src/lib/dataService.js';

console.log("--- TESTING ANAKAPALLI PLACE NAMES ---");
const anakapalliPlaces = getDistrictPlaces('anakapalli');
anakapalliPlaces.places.slice(0, 5).forEach((p, idx) => {
  console.log(`Place ${idx + 1}: ${p.name}`);
});

console.log("\n--- TESTING VISAKHAPATNAM PLACE NAMES ---");
const vizagPlaces = getDistrictPlaces('visakhapatnam');
vizagPlaces.places.slice(0, 5).forEach((p, idx) => {
  console.log(`Place ${idx + 1}: ${p.name}`);
});

console.log("\n--- TESTING JAIPUR PLACE NAMES ---");
const jaipurPlaces = getDistrictPlaces('jaipur');
jaipurPlaces.places.slice(0, 5).forEach((p, idx) => {
  console.log(`Place ${idx + 1}: ${p.name}`);
});
