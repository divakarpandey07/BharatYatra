import { indiaData } from '../src/data/indiaData';
import HomeClient from './components/HomeClient';

export default function Home() {
  const hoverStatesData = indiaData.map((s: any) => ({
    id: s.id,
    name: s.name,
    description: s.description,
    districtsCount: s.districts?.length || 0,
  }));

  const trendingStates = indiaData.slice(0, 5).map((s: any) => ({
    id: s.id,
    name: s.name,
    districtsCount: s.districts?.length || 0,
  }));

  return (
    <HomeClient 
      hoverStatesData={hoverStatesData} 
      trendingStates={trendingStates} 
    />
  );
}
