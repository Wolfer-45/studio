import { RedBullLogo } from '@/components/icons';
import { Progress } from '@/components/ui/progress';

export default function LoadingScreen({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 text-center">
        <RedBullLogo className="text-4xl font-headline font-black text-primary mb-8" />
        <Progress value={progress} className="w-full h-2 bg-muted" />
        <p className="mt-4 text-lg font-medium text-foreground">{progress}%</p>
      </div>
    </div>
  );
}
