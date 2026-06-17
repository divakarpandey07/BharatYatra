import { indiaData } from '../../src/data/indiaData';
import StatesClient from '../components/StatesClient';

export default function StatesPage() {
  const statesData = indiaData.map((s: any) => ({
    id: s.id,
    name: s.name,
    description: s.description,
    districtsCount: s.districts?.length || 0,
    image: s.image || '',
    images: s.images || [],
  }));

  return <StatesClient statesData={statesData} />;
}
