import { getStateDetails } from '../src/lib/dataService.js';

console.log("--- AUDITING ARUNACHAL PRADESH DISTRICT CARDS ---");
const apDetails = getStateDetails('arunachal-pradesh');
apDetails.stateData.districts.forEach(d => {
  console.log(`District: ${d.name} -> Image: ${d.image}`);
});
