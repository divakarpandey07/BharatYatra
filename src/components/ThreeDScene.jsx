import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, useTexture } from '@react-three/drei';

export default function ThreeDScene() {
  const sphereRef = useRef();
  
  // Load real Earth texture
  const colorMap = useTexture('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');

  useFrame((state) => {
    if (sphereRef.current) {
      // Slowly rotate the Earth
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.2} color="#4ecdc4" />
      
      <Sphere ref={sphereRef} args={[2, 64, 64]} scale={1.5}>
        <meshStandardMaterial
          map={colorMap}
          roughness={0.6}
          metalness={0.1}
        />
      </Sphere>
    </>
  );
}
