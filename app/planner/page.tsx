import { indiaData } from '../../src/data/indiaData';
import PlannerClient from '../components/PlannerClient';

export default function AIPlannerPage() {
  // Strip down indiaData to only what is needed for the dropdown menus
  // This massively reduces the JSON payload sent to the client bundle
  const lightweightIndiaData = indiaData.map((state: any) => ({
    id: state.id,
    name: state.name,
    districts: state.districts.map((district: any) => ({
      id: district.id,
      name: district.name,
    }))
  }));

  return <PlannerClient indiaData={lightweightIndiaData} />;
}
