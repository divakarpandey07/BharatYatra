import { getStateDetails } from '../../../src/lib/dataService';
import StateClient from '../../components/StateClient';

export default function StatePage({ params }: { params: { stateId: string } }) {
  const result = getStateDetails(params.stateId);
  const stateData = result?.stateData || null;
  const info = result?.info || null;

  return <StateClient stateData={stateData} info={info} />;
}
