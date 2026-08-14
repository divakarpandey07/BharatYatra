import { getStateDetails, getDistrictPlaces, getStatesData } from '../src/lib/dataService.js';

console.log("--- TESTING STATES DATA ---");
const allStates = getStatesData();
const ap = allStates.find(s => s.id === 'andhra-pradesh');
console.log("AP State Card:", ap);

console.log("\n--- TESTING STATE DETAILS FOR ANDHRA PRADESH ---");
const apDetails = getStateDetails('andhra-pradesh');
console.log("AP State Name:", apDetails?.stateData?.name);
console.log("AP State Image:", apDetails?.stateData?.image);
console.log("AP State Images Count:", apDetails?.stateData?.images?.length);
console.log("AP Districts Count:", apDetails?.stateData?.districts?.length);
console.log("First 3 Districts:", apDetails?.stateData?.districts?.slice(0, 3));

console.log("\n--- TESTING DISTRICT PLACES FOR CHITTOOR ---");
const chittoorPlaces = getDistrictPlaces('chittoor');
console.log("Chittoor Places Count:", chittoorPlaces?.places?.length);
console.log("Chittoor Place 1 Image:", chittoorPlaces?.places?.[0]?.image);
console.log("Chittoor Place 1 Name:", chittoorPlaces?.places?.[0]?.name);

console.log("\n--- TESTING DISTRICT PLACES FOR VISAKHAPATNAM ---");
const vizagPlaces = getDistrictPlaces('visakhapatnam');
console.log("Vizag Places Count:", vizagPlaces?.places?.length);
console.log("Vizag Place 1 Image:", vizagPlaces?.places?.[0]?.image);
console.log("Vizag Place 1 Name:", vizagPlaces?.places?.[0]?.name);
