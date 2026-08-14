import { getDistrictPlaces } from '../src/lib/dataService.js';

console.log("--- TESTING SPECIFIC LANDMARK PHOTO MATCHING ---");
const chittoor = getDistrictPlaces('chittoor');
console.log("\nChittoor Places & Images:");
chittoor.places.slice(0, 5).forEach(p => {
  console.log(`Name: ${p.name}`);
  console.log(`Primary Image: ${p.image}\n`);
});

const vizag = getDistrictPlaces('visakhapatnam');
console.log("\nVisakhapatnam Places & Images:");
vizag.places.slice(0, 5).forEach(p => {
  console.log(`Name: ${p.name}`);
  console.log(`Primary Image: ${p.image}\n`);
});

const jaipur = getDistrictPlaces('jaipur');
console.log("\nJaipur Places & Images:");
jaipur.places.slice(0, 5).forEach(p => {
  console.log(`Name: ${p.name}`);
  console.log(`Primary Image: ${p.image}\n`);
});
