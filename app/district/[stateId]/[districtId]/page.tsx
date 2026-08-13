import { getDistrictPlaces } from '../../../../src/lib/dataService';
import DistrictClient from '../../../components/DistrictClient';

export default function PlacesPage({ params }: { params: { stateId: string, districtId: string } }) {
  const result = getDistrictPlaces(params.districtId);

  return (
    <DistrictClient 
      stateData={result.stateData} 
      districtData={result.districtData} 
      specificCustomDistricts={result.places} 
    />
  );
}
