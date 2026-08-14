import { getDistrictPlaces } from '../src/lib/dataService.js';
import { indiaData } from '../src/data/indiaData.js';

console.log("--- AUDITING ALL 750+ DISTRICTS FOR CROSS-DISTRICT NAME MIXING ---");

let totalDistrictsChecked = 0;
let totalPlacesChecked = 0;
let crossDistrictMismatches = [];

indiaData.forEach(state => {
  if (state.districts) {
    state.districts.forEach(d => {
      totalDistrictsChecked++;
      const res = getDistrictPlaces(d.id);
      if (res && res.places) {
        res.places.forEach(p => {
          totalPlacesChecked++;
          const pNameLower = p.name.toLowerCase();
          const dNameLower = d.name.toLowerCase();
          
          // Famous city keywords to check for cross-mixing
          const famousCities = [
            { city: 'agra', exceptDistrict: ['agra', 'mathura', 'firozabad'] },
            { city: 'taj mahal', exceptDistrict: ['agra'] },
            { city: 'vrindavan', exceptDistrict: ['mathura'] },
            { city: 'varanasi', exceptDistrict: ['varanasi'] },
            { city: 'kashi vishwanath', exceptDistrict: ['varanasi'] },
            { city: 'ayodhya', exceptDistrict: ['ayodhya'] },
            { city: 'jaipur', exceptDistrict: ['jaipur'] },
            { city: 'hawa mahal', exceptDistrict: ['jaipur'] },
            { city: 'amber fort', exceptDistrict: ['jaipur'] },
            { city: 'udaipur', exceptDistrict: ['udaipur'] },
            { city: 'jodhpur', exceptDistrict: ['jodhpur'] },
            { city: 'golden temple', exceptDistrict: ['amritsar'] },
            { city: 'amritsar', exceptDistrict: ['amritsar'] },
            { city: 'munnar', exceptDistrict: ['idukki'] },
            { city: 'alleppey', exceptDistrict: ['alappuzha'] },
            { city: 'gateway of india', exceptDistrict: ['mumbai', 'mumbai-suburban'] },
            { city: 'marine drive', exceptDistrict: ['mumbai', 'mumbai-suburban'] },
            { city: 'tirupati', exceptDistrict: ['tirupati', 'chittoor'] }
          ];

          famousCities.forEach(fc => {
            if (pNameLower.includes(fc.city) && !fc.exceptDistrict.includes(d.id) && !fc.exceptDistrict.includes(dNameLower)) {
              crossDistrictMismatches.push({
                state: state.name,
                districtId: d.id,
                districtName: d.name,
                wrongPlaceName: p.name,
                matchedCityKeyword: fc.city
              });
            }
          });
        });
      }
    });
  }
});

console.log(`Total Districts Checked: ${totalDistrictsChecked}`);
console.log(`Total Places Checked: ${totalPlacesChecked}`);
console.log(`Cross-District Name Mismatches Found: ${crossDistrictMismatches.length}`);

if (crossDistrictMismatches.length > 0) {
  console.log("\nMismatches List:");
  console.log(crossDistrictMismatches.slice(0, 20));
}
