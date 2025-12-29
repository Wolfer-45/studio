"use client";

import { RedBullLogo } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/contexts/app-provider';

const navLinks = [
  { name: 'Product', href: '#product' },
  { name: 'Ingredients', href: '#ingredients' },
  { name: 'Nutrition', href: '#nutrition' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const { activeSection } = useAppContext();

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20 bg-background/50 backdrop-blur-lg rounded-b-lg px-6 shadow-md">
          <a href="#" className="text-2xl font-black font-headline text-foreground">
            <RedBullLogo />
          </a>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  activeSection === link.href.substring(1) ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
