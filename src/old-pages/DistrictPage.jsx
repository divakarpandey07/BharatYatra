import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { indiaData } from '../data/indiaData';
import { Map, ArrowLeft } from 'lucide-react';

export default function DistrictPage() {
  const { stateId } = useParams();
  const navigate = useNavigate();
  
  const stateData = indiaData.find(s => s.id === stateId);

  if (!stateData) {
    return <div className="page-container">State not found.</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="page-container"
    >
      <button 
        onClick={() => navigate(-1)} 
        className="btn glass-panel" 
        style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', color: 'white' }}
      >
        <ArrowLeft size={20} /> Back
      </button>

      <div className="page-header">
        <h1 className="page-title text-gradient">Districts of {stateData.name}</h1>
        <p className="page-subtitle">Discover the unique flavors and sights of each district.</p>
      </div>

      <div className="grid-cards">
        {stateData.districts.map((district, index) => (
          <motion.div
            key={district.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card glass-panel"
            onClick={() => navigate(`/district/${stateId}/${district.id}`)}
          >
            <div className="card-image-container">
              <img loading="lazy" src={district.image} alt={district.name} className="card-image" />
            </div>
            <div className="card-content">
              <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Map size={24} color="var(--accent-secondary)" />
                {district.name}
              </h2>
              <p className="card-description">{district.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
