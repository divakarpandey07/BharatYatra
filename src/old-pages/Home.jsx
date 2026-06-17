import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThreeDScene from '../components/ThreeDScene';

export default function Home() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="home-container"
      style={{ position: 'relative', height: '100vh', width: '100vw', marginLeft: '-2rem', marginTop: '-2rem' }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 6] }}>
          <ThreeDScene />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        textAlign: 'center',
        zIndex: 1,
        width: '100%',
        padding: '2rem'
      }}>
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="page-title text-gradient"
          style={{ fontSize: '5rem', marginBottom: '1rem', fontWeight: 700 }}
        >
          Bharat Yatra
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="page-subtitle"
          style={{ marginBottom: '3rem', fontSize: '1.5rem' }}
        >
          Discover the soul of India, one state at a time.
        </motion.p>
        
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5, type: 'spring' }}
          className="btn btn-primary glass-panel"
          onClick={() => navigate('/states')}
          style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}
        >
          Explore India
        </motion.button>
      </div>
    </motion.div>
  );
}
