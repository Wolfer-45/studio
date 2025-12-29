
"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { variants, type Variant } from '@/app/data/variants';
import { hexToHsl } from '@/lib/color-utils';

type AppContextType = {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  currentVariantIndex: number;
  variant: Variant;
  selectVariant: (index: number) => void;
  selectNextVariant: () => void;
  selectPrevVariant: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  activeSection: string;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('product');

  const images = useRef<HTMLImageElement[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  const animationIntervalId = useRef<number>();
  const isAnimating = useRef(false);

  const variant = variants[currentVariantIndex];

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const drawImage = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Ensure canvas dimensions are set
    if (canvas.width === 0 || canvas.height === 0) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    // Check if index is valid and images array exists
    if (!images.current || images.current.length === 0) return;
    if (index < 0 || index >= images.current.length) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const image = images.current[index];
    
    // Only draw if image exists and is fully loaded
    if (image && image.complete && image.naturalWidth > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const hRatio = canvas.width / image.width;
      const vRatio = canvas.height / image.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - image.width * ratio) / 2;
      const centerShift_y = (canvas.height - image.height * ratio) / 2;
      ctx.drawImage(image, 0, 0, image.width, image.height, centerShift_x, centerShift_y, image.width * ratio, image.height * ratio);
    }
  }, []);

  const playAnimation = useCallback((direction: 'forward' | 'backward') => {
    if (isAnimating.current) return;
    if (!images.current || images.current.length === 0) return;

    isAnimating.current = true;
    const frameCount = images.current.length;
    let currentFrame = direction === 'forward' ? 0 : frameCount - 1;
    const endFrame = direction === 'forward' ? frameCount - 1 : 0;

    // Clear any existing animation
    if (animationIntervalId.current) {
      clearInterval(animationIntervalId.current);
    }

    // Play animation at ~60fps (16.67ms per frame)
    animationIntervalId.current = window.setInterval(() => {
      drawImage(currentFrame);
      
      if (direction === 'forward') {
        currentFrame++;
        if (currentFrame > endFrame) {
          clearInterval(animationIntervalId.current);
          isAnimating.current = false;
        }
      } else {
        currentFrame--;
        if (currentFrame < endFrame) {
          clearInterval(animationIntervalId.current);
          isAnimating.current = false;
        }
      }
    }, 16.67); // ~60fps
  }, [drawImage]);

  const selectVariant = useCallback((index: number) => {
    if (index === currentVariantIndex) return;
    const newIndex = (index + variants.length) % variants.length;
    
    // Stop any ongoing animation
    if (animationIntervalId.current) {
      clearInterval(animationIntervalId.current);
      isAnimating.current = false;
    }
    
    setCurrentVariantIndex(newIndex);
  }, [currentVariantIndex, variants.length]);

  const selectNextVariant = useCallback(() => {
    const nextIndex = (currentVariantIndex + 1) % variants.length;
    selectVariant(nextIndex);
    // Play forward animation after a brief delay to ensure variant has changed
    setTimeout(() => playAnimation('forward'), 200);
  }, [currentVariantIndex, variants.length, selectVariant, playAnimation]);

  const selectPrevVariant = useCallback(() => {
    const prevIndex = (currentVariantIndex - 1 + variants.length) % variants.length;
    selectVariant(prevIndex);
    // Play backward animation after a brief delay to ensure variant has changed
    setTimeout(() => playAnimation('backward'), 200);
  }, [currentVariantIndex, variants.length, selectVariant, playAnimation]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if(!isMounted) return;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    
    const color = theme === 'dark' ? variant.themeColorDark : variant.themeColor;
    const { h, s, l } = hexToHsl(color);
    document.documentElement.style.setProperty('--primary', `${h} ${s}% ${l}%`);

  }, [theme, variant, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
  
    let isCancelled = false;
    const { baseUrl, frameCount } = variant.image;
    
    // Initialize canvas dimensions immediately
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    // Load images progressively in background
    const loadAllImages = async () => {
        // Initialize array with frameCount length
        images.current = new Array(frameCount);
        
        // Load images progressively - they'll be available as they load
        for (let i = 0; i < frameCount; i++) {
            if (isCancelled) break;
            
            const img = new Image();
            img.src = `${baseUrl}/frame_${String(i).padStart(3, '0')}_delay-0.04s.webp`;
            img.onload = () => {
                if (!isCancelled) {
                    images.current[i] = img;
                    // If this is the first frame, draw it immediately
                    if (i === 0) {
                        drawImage(0);
                    }
                }
            };
            img.onerror = () => {
                console.warn(`Failed to load frame ${i}`);
            };
        }
    };
  
    loadAllImages();
  
    return () => {
      isCancelled = true;
    };
  }, [variant, isMounted, drawImage]);


  // Draw initial frame when variant changes (but don't animate on initial load)
  useEffect(() => {
    if (!isMounted) return;
    
    // Draw the first frame of the current variant
    drawImage(0);
  }, [variant, isMounted, drawImage]);

  useEffect(() => {
    const handleResize = () => {
        const canvas = canvasRef.current;
        if(canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Redraw current frame (first frame by default)
            drawImage(0);
        }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIntervalId.current) {
        clearInterval(animationIntervalId.current);
      }
    };
  }, [drawImage]);

  const value = {
    theme,
    toggleTheme,
    currentVariantIndex,
    variant,
    selectVariant,
    selectNextVariant,
    selectPrevVariant,
    canvasRef,
    activeSection,
  };

  return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
