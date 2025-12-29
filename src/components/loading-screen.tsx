
import { RedBullLogo } from '@/components/icons';
import { Progress } from '@/components/ui/progress';

export default function LoadingScreen({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-sm flex flex-col items-center gap-4">
        <RedBullLogo className="text-3xl font-black font-headline text-primary" />
        <Progress value={progress} className="w-full h-2" />
        <p className="text-sm text-muted-foreground">{Math.round(progress)}% loaded</p>
      </div>
    </div>
  );
}
