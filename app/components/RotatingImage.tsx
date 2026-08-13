"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface RotatingImageProps {
  searchTerm?: string;
  defaultImages?: string[];
  alt: string;
}

const fallbackLandmarkImage = "https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=1200&q=80";

export default function RotatingImage({ searchTerm, defaultImages = [], alt }: RotatingImageProps) {
  // Sanitize initial defaultImages
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
      return;
    }

    if (!searchTerm) {
      setImages([fallbackLandmarkImage]);
      return;
    }

    // Strict Wikipedia Search Query for Landmark Architecture
    const queryUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(searchTerm + " landmark architecture monument temple -people -person -woman -man -food")}&gsrlimit=10&prop=pageimages&piprop=original|thumbnail&pithumbsize=1000&format=json&origin=*`;

    fetch(queryUrl)
      .then(res => res.json())
      .then(data => {
        if (data && data.query && data.query.pages) {
          const pages = Object.values(data.query.pages) as any[];
          const urls = pages
            .filter(p => {
              if (!p.title) return true;
              const lowerTitle = p.title.toLowerCase();
              
              // Filter out biographies, government, lists, political leaders
              if (
                lowerTitle.includes("list of") ||
                lowerTitle.includes("lists of") ||
                lowerTitle.includes("tourism in") ||
                lowerTitle.includes("politics of") ||
                lowerTitle.includes("government of") ||
                lowerTitle.includes("police") ||
                lowerTitle.includes("election") ||
                lowerTitle.includes("politician") ||
                lowerTitle.includes("activist") ||
                lowerTitle.includes("cricketer") ||
                lowerTitle.includes("actor") ||
                lowerTitle.includes("actress") ||
                lowerTitle.includes("singer") ||
                lowerTitle.includes("officer") ||
                lowerTitle.includes("general") ||
                lowerTitle.includes("ruler") ||
                lowerTitle.includes("dynasty") ||
                lowerTitle.includes("family")
              ) {
                return false;
              }
              return true;
            })
            .map(p => p.original?.source || p.thumbnail?.source)
            .filter(url => {
              if (typeof url !== 'string' || url.trim() === '') return false;
              
              // ABSOLUTELY STRICT filtering against portraits, people, ladies, food
              const lower = url.toLowerCase();
              if (
                lower.includes('map') || 
                lower.includes('flag') || 
                lower.includes('icon') || 
                lower.includes('.svg') || 
                lower.includes('.png') ||
                lower.includes('logo') ||
                lower.includes('portrait') ||
                lower.includes('profile') ||
                lower.includes('face') ||
                lower.includes('headshot') ||
                lower.includes('posing') ||
                lower.includes('group') ||
                lower.includes('crowd') ||
                lower.includes('people') ||
                lower.includes('man') ||
                lower.includes('woman') ||
                lower.includes('lady') ||
                lower.includes('person') ||
                lower.includes('human') ||
                lower.includes('food') ||
                lower.includes('dish') ||
                lower.includes('recipe') ||
                lower.includes('thali') ||
                lower.includes('sweet')
              ) {
                return false;
              }
              return true;
            }) as string[];

          if (urls.length > 0) {
            setImages(Array.from(new Set(urls)));
          } else {
            setImages(safeDefaults.length > 0 ? safeDefaults : [fallbackLandmarkImage]);
          }
        } else {
          setImages(safeDefaults.length > 0 ? safeDefaults : [fallbackLandmarkImage]);
        }
      })
      .catch(() => {
        setImages(safeDefaults.length > 0 ? safeDefaults : [fallbackLandmarkImage]);
      });
  }, [searchTerm, defaultImages]);

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
