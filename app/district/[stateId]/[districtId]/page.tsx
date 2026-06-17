import { indiaData } from '../../../../src/data/indiaData';
import { customDistricts } from '../../../../src/data/customDistricts';
import DistrictClient from '../../../components/DistrictClient';

import { kaggleDistricts } from '../../../../src/data/kaggleDistricts';

export default function PlacesPage({ params }: { params: { stateId: string, districtId: string } }) {
  const stateDataRaw = indiaData.find((s: any) => s.id === params.stateId);
  const districtDataRaw = stateDataRaw?.districts.find((d: any) => d.id === params.districtId);
  
  const cDistricts = (customDistricts as any)[params.districtId] || [];
  const kDistricts = (kaggleDistricts as any)[params.districtId] || [];
  const specificCustomDistricts = [...cDistricts, ...kDistricts];

  // Pick only required fields to avoid shipping large state JSON blocks
  const stateData = stateDataRaw ? {
    id: stateDataRaw.id,
    name: stateDataRaw.name,
    image: stateDataRaw.image || ''
  } : null;

  const districtData = districtDataRaw ? {
    id: districtDataRaw.id,
    name: districtDataRaw.name,
    image: districtDataRaw.image || '',
    images: districtDataRaw.images || []
  } : null;

  return (
    <DistrictClient 
      stateData={stateData} 
      districtData={districtData} 
      specificCustomDistricts={specificCustomDistricts} 
    />
  );
}
