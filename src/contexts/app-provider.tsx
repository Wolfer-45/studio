"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { variants, type Variant } from '@/app/data/variants';
import { hexToHsl } from '@/lib/color-utils';

const INITIAL_FRAMES_TO_LOAD = 30;
const SCROLL_ANIMATION_DISTANCE = 3000; // in pixels

type AppContextType = {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  currentVariantIndex: number;
  variant: Variant;
  selectVariant: (index: number) => void;
  selectNextVariant: () => void;
  selectPrevVariant: () => void;
  isLoading: boolean;
  loadingProgress: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  activeSection: string;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('product');

  const images = useRef<HTMLImageElement[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();

  const variant = variants[currentVariantIndex];

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const selectVariant = (index: number) => {
    if (index === currentVariantIndex) return;
    const newIndex = (index + variants.length) % variants.length;
    setCurrentVariantIndex(newIndex);
    setIsLoading(true);
    setLoadingProgress(0);
  };

  const selectNextVariant = () => selectVariant(currentVariantIndex + 1);
  const selectPrevVariant = () => selectVariant(currentVariantIndex - 1);
  
  const drawImage = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const image = images.current[index];
    if (canvas && ctx && image) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const hRatio = canvas.width / image.width;
      const vRatio = canvas.height / image.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - image.width * ratio) / 2;
      const centerShift_y = (canvas.height - image.height * ratio) / 2;
      ctx.drawImage(image, 0, 0, image.width, image.height, centerShift_x, centerShift_y, image.width * ratio, image.height * ratio);
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    
    const color = theme === 'dark' ? variant.themeColorDark : variant.themeColor;
    const { h, s, l } = hexToHsl(color);
    document.documentElement.style.setProperty('--primary', `${h} ${s}% ${l}%`);

  }, [theme, variant]);

  useEffect(() => {
    if (!isMounted) return;

    let loadedCount = 0;
    const { baseUrl, frameCount } = variant.image;
    images.current = [];

    const loadImages = () => {
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = `${baseUrl}/frame_${String(i).padStart(3, '0')}.webp`;
        images.current[i-1] = img;
        img.onload = () => {
          loadedCount++;
          const progress = Math.round((loadedCount / frameCount) * 100);
          setLoadingProgress(progress);
          if (loadedCount === INITIAL_FRAMES_TO_LOAD) {
            setIsLoading(false);
            drawImage(0);
          }
        };
      }
    };
    
    loadImages();

  }, [variant, isMounted, drawImage]);


  useEffect(() => {
    if (isLoading || !isMounted) return;

    const handleScroll = () => {
      if(animationFrameId.current) cancelAnimationFrame(animationFrameId.current);

      animationFrameId.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const scrollFraction = Math.min(scrollY / SCROLL_ANIMATION_DISTANCE, 1);
        const frameIndex = Math.floor(scrollFraction * (variant.image.frameCount - 1));
        
        drawImage(frameIndex);

        const sections = ['product', 'ingredients', 'nutrition', 'reviews', 'faq', 'contact'];
        let currentSection = '';
        for (const id of sections) {
            const sectionEl = document.getElementById(id);
            if(sectionEl && sectionEl.offsetTop <= scrollY + window.innerHeight / 2) {
                currentSection = id;
            }
        }
        setActiveSection(currentSection);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
        window.removeEventListener('scroll', handleScroll);
        if(animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    }
  }, [isLoading, isMounted, variant, drawImage]);

  useEffect(() => {
    const handleResize = () => {
        const canvas = canvasRef.current;
        if(canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawImage(0);
        }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [drawImage]);

  const value = {
    theme,
    toggleTheme,
    currentVariantIndex,
    variant,
    selectVariant,
    selectNextVariant,
    selectPrevVariant,
    isLoading,
    loadingProgress,
    canvasRef,
    activeSection,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
