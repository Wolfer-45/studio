
"use client";
import React, { useEffect } from 'react';
import { useAppContext } from '@/contexts/app-provider';
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
  const { canvasRef, selectNextVariant, selectPrevVariant } = useAppContext();

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
      <div>
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
