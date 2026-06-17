"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface RotatingImageProps {
  searchTerm?: string;
  defaultImages?: string[];
  alt: string;
}

const fallbackImage = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200";

export default function RotatingImage({ searchTerm, defaultImages = [], alt }: RotatingImageProps) {
  // Sanitize initial defaultImages
  const initialImages = Array.isArray(defaultImages) 
    ? defaultImages.filter(img => typeof img === 'string' && img.trim() !== '')
    : [];

  const [images, setImages] = useState<string[]>(initialImages.length > 0 ? initialImages : [fallbackImage]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const safeDefaults = Array.isArray(defaultImages) 
      ? defaultImages.filter(img => typeof img === 'string' && img.trim() !== '')
      : [];

    if (!searchTerm) {
      setImages(safeDefaults.length > 0 ? safeDefaults : [fallbackImage]);
      return;
    }

    const cacheKey = `wiki_img_${searchTerm.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
    
    // Check client-side localStorage cache
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed && Array.isArray(parsed) && parsed.length > 0) {
            const cleanCached = parsed.filter(img => typeof img === 'string' && img.trim() !== '');
            if (cleanCached.length > 0) {
              setImages(cleanCached);
              return;
            }
          }
        } catch (e) {
          // ignore cache parse error
        }
      }
    }

    // Fetch from Wikipedia Search API
    const queryUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(searchTerm)}&gsrlimit=10&prop=pageimages&piprop=original|thumbnail&pithumbsize=1000&format=json&origin=*`;

    fetch(queryUrl)
      .then(res => res.json())
      .then(data => {
        if (data && data.query && data.query.pages) {
          const pages = Object.values(data.query.pages) as any[];
          const urls = pages
            .filter(p => {
              if (!p.title) return true;
              const lowerTitle = p.title.toLowerCase();
              
              // Filter out lists, governance, politics, conflicts, and individual person biographies
              if (
                lowerTitle.includes("list of") ||
                lowerTitle.includes("lists of") ||
                lowerTitle.includes("tourism in") ||
                lowerTitle.includes("politics of") ||
                lowerTitle.includes("government of") ||
                lowerTitle.includes("insurgency") ||
                lowerTitle.includes("terrorism") ||
                lowerTitle.includes("police") ||
                lowerTitle.includes("legislative assembly") ||
                lowerTitle.includes("election") ||
                lowerTitle.includes("high court") ||
                lowerTitle.includes("governor") ||
                lowerTitle.includes("minister") ||
                lowerTitle.includes("politician") ||
                lowerTitle.includes("activist") ||
                lowerTitle.includes("freedom fighter") ||
                lowerTitle.includes("cricketer") ||
                lowerTitle.includes("actor") ||
                lowerTitle.includes("actress") ||
                lowerTitle.includes("singer") ||
                lowerTitle.includes("officer") ||
                lowerTitle.includes("general") ||
                lowerTitle.includes("ruler") ||
                lowerTitle.includes("dynasty") ||
                lowerTitle.includes("family") ||
                lowerTitle === "india" ||
                lowerTitle === "pakistan"
              ) {
                return false;
              }
              return true;
            })
            .map(p => p.original?.source || p.thumbnail?.source)
            .filter(url => {
              if (typeof url !== 'string' || url.trim() === '') return false;
              
              // Filter out maps, logos, diagrams, and files containing people/portraits/faces
              const lower = url.toLowerCase();
              if (
                lower.includes('map') || 
                lower.includes('flag') || 
                lower.includes('icon') || 
                lower.includes('coat_of_arms') || 
                lower.includes('districts') || 
                lower.includes('.svg') || 
                lower.includes('.png') ||
                lower.includes('location') ||
                lower.includes('emblem') ||
                lower.includes('seal') ||
                lower.includes('logo') ||
                lower.includes('diagram') ||
                lower.includes('collage') ||
                lower.includes('insignia') ||
                lower.includes('victoria_falls') ||
                lower.includes('victoriafalls') ||
                // Strict people filters
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
                lower.includes('person') ||
                lower.includes('human') ||
                lower.includes('member') ||
                lower.includes('parliament') ||
                lower.includes('legislator') ||
                lower.includes('politician') ||
                lower.includes('officer') ||
                lower.includes('police') ||
                lower.includes('soldier') ||
                lower.includes('family') ||
                lower.includes('children') ||
                lower.includes('kid') ||
                lower.includes('girl') ||
                lower.includes('boy') ||
                lower.includes('baby') ||
                lower.includes('student') ||
                lower.includes('teacher') ||
                lower.includes('gathering') ||
                lower.includes('meeting')
              ) {
                return false;
              }
              return true;
            }) as string[];

          if (urls.length > 0) {
            const uniqueUrls = Array.from(new Set(urls));
            setImages(uniqueUrls);
            if (typeof window !== 'undefined') {
              localStorage.setItem(cacheKey, JSON.stringify(uniqueUrls));
            }
          } else {
            setImages(safeDefaults.length > 0 ? safeDefaults : [fallbackImage]);
          }
        } else {
          setImages(safeDefaults.length > 0 ? safeDefaults : [fallbackImage]);
        }
      })
      .catch(err => {
        console.error("Failed to fetch wiki images for search term:", searchTerm, err);
        setImages(safeDefaults.length > 0 ? safeDefaults : [fallbackImage]);
      });
  }, [searchTerm, defaultImages]);

  // Handle auto-rotation
  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [images]);

  // Self-healing image load error fallback
  const handleImageError = () => {
    if (images.length > 1) {
      const updatedImages = [...images];
      updatedImages.splice(index, 1);
      setImages(updatedImages);
      setIndex(0);
    } else {
      setImages([fallbackImage]);
      setIndex(0);
    }
  };

  const currentImage = images[index] || fallbackImage;

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
