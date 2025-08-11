import { DefectDetector } from '@/components/defect-detector';

export default function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-primary tracking-tight sm:text-5xl">
          AI Quality Control
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Upload an image to automatically detect imperfections and ensure the
          highest quality for every piece.
        </p>
      </div>
      <DefectDetector />
    </div>
  );
}
