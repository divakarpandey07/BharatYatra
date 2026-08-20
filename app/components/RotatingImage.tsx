"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface RotatingImageProps {
  searchTerm?: string;
  defaultImages?: string[];
  alt: string;
}

const fallbackLandmarkImage = "https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=1200&q=80";

export default function RotatingImage({ defaultImages = [], alt }: RotatingImageProps) {
  const initialImages = Array.isArray(defaultImages) 
    ? defaultImages.filter(img => typeof img === 'string' && img.trim() !== '')
    : [];

  const [images, setImages] = useState<string[]>(initialImages.length > 0 ? initialImages : [fallbackLandmarkImage]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const safeDefaults = Array.isArray(defaultImages) 
      ? defaultImages.filter(img => typeof img === 'string' && img.trim() !== '')
      : [];

    if (safeDefaults.length > 0) {
      setImages(safeDefaults);
    } else {
      setImages([fallbackLandmarkImage]);
    }
  }, [defaultImages]);

  // Auto-rotation every 8 seconds
  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [images]);

  const handleImageError = () => {
    if (images.length > 1) {
      const updatedImages = [...images];
      updatedImages.splice(index, 1);
      setImages(updatedImages);
      setIndex(0);
    } else {
      setImages([fallbackLandmarkImage]);
      setIndex(0);
    }
  };

  const currentImage = images[index] || fallbackLandmarkImage;

  return (
    <Image 
      src={currentImage} 
      alt={alt} 
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-cover transition-all duration-1000 ease-in-out hover:scale-110" 
      onError={handleImageError}
    />
  );
}
