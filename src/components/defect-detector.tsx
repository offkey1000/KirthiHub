'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { runDetectDefects } from '@/app/actions';
import {
  Loader2,
  Upload,
  AlertTriangle,
  Wand2,
  CheckCircle,
} from 'lucide-react';

export function DefectDetector() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [defects, setDefects] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisRun, setAnalysisRun] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        // 4MB limit
        toast({
          variant: 'destructive',
          title: 'File too large',
          description: 'Please upload an image smaller than 4MB.',
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setDefects([]);
        setAnalysisRun(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeClick = async () => {
    if (!imagePreview) {
      toast({
        variant: 'destructive',
        title: 'No image selected',
        description: 'Please upload an image to analyze.',
      });
      return;
    }
    setIsLoading(true);
    setDefects([]);
    setAnalysisRun(false);
    try {
      const result = await runDetectDefects(imagePreview);
      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Analysis Failed',
          description: result.error,
        });
      } else {
        setDefects(result.defects ?? []);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'An Unexpected Error Occurred',
        description: 'Please check the console for more details.',
      });
      console.error(error);
    } finally {
      setIsLoading(false);
      setAnalysisRun(true);
    }
  };

  const triggerFileSelect = () => fileInputRef.current?.click();

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <Card className="overflow-hidden shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Jewelry Image</CardTitle>
          <CardDescription>
            Upload an image for AI-powered defect detection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-square border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-card/50 relative">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Jewelry preview"
                fill
                className="object-contain"
              />
            ) : (
              <div className="text-center p-8">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">
                  Click button below to select an image
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG, WEBP up to 4MB
                </p>
              </div>
            )}
            <Input
              id="image-upload"
              type="file"
              className="hidden"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col sm:flex-row gap-4 justify-between items-center">
          <Button variant="outline" onClick={triggerFileSelect}>
            <Upload className="mr-2 h-4 w-4" />
            {imagePreview ? 'Change Image' : 'Upload Image'}
          </Button>
          <Button
            onClick={handleAnalyzeClick}
            disabled={isLoading || !imagePreview}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Detect Defects
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            Analysis Results
          </CardTitle>
          <CardDescription>
            Potential defects identified by the AI.
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[300px] flex justify-center items-center">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">
                Analyzing image, please wait...
              </p>
            </div>
          ) : !analysisRun ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Wand2 className="h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">
                Results will appear here after analysis.
              </p>
            </div>
          ) : defects.length > 0 ? (
            <ul className="space-y-3 w-full">
              {defects.map((defect, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-md bg-destructive/10 border border-destructive/20"
                >
                  <AlertTriangle className="h-5 w-5 mt-0.5 text-accent shrink-0" />
                  <span className="text-foreground">{defect}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <p className="mt-4 font-medium text-foreground">
                No Defects Found
              </p>
              <p className="mt-1 text-muted-foreground">
                The AI analysis completed successfully.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">
            This is an AI-generated analysis. Please use it as a reference and
            perform a manual inspection.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
