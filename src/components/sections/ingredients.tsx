"use client";

import { useAppContext } from '@/contexts/app-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function IngredientsSection() {
  const { variant } = useAppContext();

  return (
    <section id="ingredients" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black font-headline">QUALITY INGREDIENTS</h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
            Every can of Red Bull is crafted with high-quality, functional ingredients to give you wings when you need them.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {variant.ingredients.map((ingredient, index) => (
            <Card key={index} className="text-center border-2 border-transparent hover:border-primary hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline font-bold">{ingredient.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">A key component carefully selected for its functional benefits.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
