"use client";

import { useAppContext } from '@/contexts/app-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function NutritionSection() {
  const { variant } = useAppContext();

  return (
    <section id="nutrition" className="py-20 md:py-32">
      <div className="container mx-auto px-4 flex justify-center">
        <Card className="w-full max-w-md shadow-2xl bg-card border-2 p-4">
          <CardHeader className="p-2">
            <CardTitle className="text-3xl font-black font-headline">Nutrition Facts</CardTitle>
            <p className="text-muted-foreground">Serving Size 1 can (8.4 fl oz / 250ml)</p>
          </CardHeader>
          <Separator className="my-2 border-t-8 border-foreground" />
          <CardContent className="p-2">
            <p className="text-sm font-bold text-muted-foreground mb-2">Amount Per Serving</p>
            <div className="flex justify-between items-end">
                <p className="text-2xl font-bold">Calories</p>
                <p className="text-3xl font-bold">{variant.nutrition.find(n => n.label === 'Calories')?.value}</p>
            </div>
            <Separator className="my-2" />
             <p className="text-right font-bold text-muted-foreground text-sm">% Daily Value*</p>
            <Separator className="my-2" />
            
            {variant.nutrition.slice(1).map((fact, index) => (
                <div key={index}>
                    <div className="flex justify-between items-center text-lg">
                        <p><span className="font-bold">{fact.label}</span> {fact.value}{fact.unit}</p>
                    </div>
                    <Separator className="my-2" />
                </div>
            ))}

            <p className="text-xs text-muted-foreground mt-4">*The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
