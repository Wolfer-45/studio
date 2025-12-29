import { Button } from '@/components/ui/button';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-black font-headline text-primary">READY TO TAKE FLIGHT?</h2>
        <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
          Find your favorite flavor and get your wings today. Available online and in stores near you.
        </p>
        <div className="mt-8 flex justify-center items-center gap-4">
          <Button size="lg" variant="outline" className="rounded-full border-2">Find a Store</Button>
          <Button size="lg" className="rounded-full">Shop Online</Button>
        </div>
      </div>
    </section>
  );
}
