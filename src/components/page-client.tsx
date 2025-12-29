"use client";
import React, { useEffect } from 'react';
import { useAppContext } from '@/contexts/app-provider';
import LoadingScreen from '@/components/loading-screen';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import IngredientsSection from '@/components/sections/ingredients';
import NutritionSection from '@/components/sections/nutrition';
import ReviewsSection from '@/components/sections/reviews';
import FaqSection from '@/components/sections/faq';
import ContactSection from '@/components/sections/contact';

export default function PageClient() {
  const { isLoading, loadingProgress, canvasRef, selectNextVariant, selectPrevVariant } = useAppContext();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        selectNextVariant();
      } else if (e.key === 'ArrowLeft') {
        selectPrevVariant();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectNextVariant, selectPrevVariant]);

  return (
    <>
      {isLoading && <LoadingScreen progress={loadingProgress} />}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Header />
        <main>
          <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
          <HeroSection />
          <div className="bg-background relative z-10">
            <AboutSection />
            <IngredientsSection />
            <NutritionSection />
            <ReviewsSection />
            <FaqSection />
            <ContactSection />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
