import { getStatesData } from '../../src/lib/dataService';
import StatesClient from '../components/StatesClient';

export default function StatesPage() {
  const statesData = getStatesData();
  return <StatesClient statesData={statesData} />;
}
