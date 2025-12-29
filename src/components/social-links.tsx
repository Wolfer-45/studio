import { Twitter, Instagram, Facebook, Youtube } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SocialLinks({ className }: { className?: string }) {
    return (
        <div className={cn("flex items-center space-x-6", className)}>
            <a href="#" aria-label="Twitter" className="text-foreground/70 hover:text-primary transition-colors">
                <Twitter size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="text-foreground/70 hover:text-primary transition-colors">
                <Instagram size={20} />
            </a>
            <a href="#" aria-label="Facebook" className="text-foreground/70 hover:text-primary transition-colors">
                <Facebook size={20} />
            </a>
            <a href="#" aria-label="Youtube" className="text-foreground/70 hover:text-primary transition-colors">
                <Youtube size={20} />
            </a>
        </div>
    );
}
