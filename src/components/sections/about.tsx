import Image from "next/image";
import {PlaceHolderImages} from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";

export default function AboutSection() {
  const aboutImage = PlaceHolderImages.find(p => p.id === "about-section-image");

  return (
    <section id="product" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black font-headline text-primary mb-4">GIVES YOU WIIINGS</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Inspired by functional drinks from the Far East, Dietrich Mateschitz founded Red Bull in the mid-1980s. He developed a new product and a unique marketing concept and launched Red Bull Energy Drink on April 1, 1987 in Austria. A completely new product category was born – energy drinks.
            </p>
            <p className="text-muted-foreground">
              Red Bull gives wings to people and ideas. This is made possible by our unique formula, which contains high-quality ingredients. Whether you're an athlete, a student, a professional, or a driver on a long journey, Red Bull is there when you need it.
            </p>
            <Button size="lg" className="mt-8 rounded-full">Learn More</Button>
          </div>
          <div>
            {aboutImage && (
              <div className="rounded-lg overflow-hidden shadow-2xl">
                 <Image
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    width={1200}
                    height={800}
                    data-ai-hint={aboutImage.imageHint}
                    className="w-full h-auto object-cover"
                 />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
