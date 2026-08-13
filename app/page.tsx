import { getStatesData } from '../src/lib/dataService';
import HomeClient from './components/HomeClient';

export default function Home() {
  const states = getStatesData();

  const hoverStatesData = states.map((s: any) => ({
    id: s.id,
    name: s.name,
    description: s.description,
    districtsCount: s.districtsCount || 0,
  }));

  const trendingStates = states.slice(0, 5).map((s: any) => ({
    id: s.id,
    name: s.name,
    districtsCount: s.districtsCount || 0,
  }));

  return (
    <HomeClient 
      hoverStatesData={hoverStatesData} 
      trendingStates={trendingStates} 
    />
  );
}
