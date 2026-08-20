"use client";

import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";

export default function ThreeDScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.5) : 1,
      width: 600,
      height: 600,
      phi: 0,
      theta: 0.25,
      dark: 0, // Light modern mode
      diffuse: 1.2,
      mapSamples: 2000,
      mapBrightness: 6,
      baseColor: [0.95, 0.95, 0.97],
      glowColor: [0.9, 0.9, 0.95],
      markerColor: [1.0, 0.45, 0.1],
      markers: [
        { location: [20.5937, 78.9629], size: 0.15 },
        { location: [28.6139, 77.2090], size: 0.05 },
        { location: [19.0760, 72.8777], size: 0.05 },
        { location: [12.9716, 77.5946], size: 0.05 },
        { location: [22.5726, 88.3639], size: 0.05 },
      ],
      onRender: (state: any) => {
        state.phi = phi;
        phi += 0.004;
      },
    } as any);

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        style={{ width: 500, height: 500, maxWidth: "100%", aspectRatio: "1 / 1" }}
        className="drop-shadow-2xl opacity-90"
      />
    </div>
  );
}
