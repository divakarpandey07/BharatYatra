import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { indiaData } from '../data/indiaData';
import { MapPin } from 'lucide-react';

export default function StatePage() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="page-container"
    >
      <div className="page-header">
        <h1 className="page-title text-gradient">Explore Incredible India</h1>
        <p className="page-subtitle">Select a state to begin your journey through its rich heritage and culture.</p>
      </div>

      <div className="grid-cards">
        {indiaData.map((state, index) => (
          <motion.div
            key={state.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card glass-panel"
            onClick={() => navigate(`/state/${state.id}`)}
          >
            <div className="card-image-container">
              <img loading="lazy" src={state.image} alt={state.name} className="card-image" />
            </div>
            <div className="card-content">
              <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={24} color="var(--accent-primary)" />
                {state.name}
              </h2>
              <p className="card-description">{state.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
