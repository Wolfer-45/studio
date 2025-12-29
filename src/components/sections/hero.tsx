"use client";
import { useAppContext } from '@/contexts/app-provider';
import { RedBullLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { SocialLinks } from '../social-links';

export default function HeroSection() {
  const { variant, selectPrevVariant, selectNextVariant, currentVariantIndex } = useAppContext();
  
  return (
    <section id="hero" className="h-screen w-full flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-4 h-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full items-center">
          
          {/* Left Side: Text Block */}
          <div className="md:col-span-1 flex flex-col justify-center items-start text-left">
            <RedBullLogo className="text-lg font-headline font-black text-primary mb-4" />

            <div key={variant.name} className="animate-content-show">
              <h1 className="text-6xl md:text-8xl font-black font-headline uppercase text-foreground leading-none">
                {variant.name}
              </h1>
              <p className="text-2xl font-light text-foreground/80 mt-2">
                {variant.subtitle}
              </p>
              <p className="mt-6 max-w-sm text-foreground/70">
                {variant.description}
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Button size="lg" variant="outline" className="rounded-full border-2 bg-transparent text-foreground hover:bg-foreground hover:text-background">
                ADD TO CART
              </Button>
              <Button size="lg" className="rounded-full bg-primary text-black hover:bg-primary/90">
                BUY NOW
              </Button>
            </div>
          </div>
          
          {/* Right Side: Variant Navigation */}
          <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 flex items-center gap-2 md:gap-6">
            <span className="text-6xl md:text-9xl font-black font-headline text-foreground/10">
              {String(currentVariantIndex + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col items-center gap-2">
              <button onClick={selectPrevVariant} className="text-foreground/50 hover:text-primary transition-colors">
                <span className="text-xs tracking-widest">PREV</span>
                <ArrowUp className="h-6 w-6" />
              </button>
              <div className="w-px h-16 bg-border"></div>
              <button onClick={selectNextVariant} className="text-foreground/50 hover:text-primary transition-colors">
                <ArrowDown className="h-6 w-6" />
                <span className="text-xs tracking-widest">NEXT</span>
              </button>
            </div>
          </div>

        </div>
        <SocialLinks className="absolute bottom-8 left-1/2 -translate-x-1/2" />
      </div>
    </section>
  );
}
