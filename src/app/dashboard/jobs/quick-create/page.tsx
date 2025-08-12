
'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Camera, RefreshCcw, Check, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const initialJobs = [
    {
    id: 'ORD001',
    title: 'Customer Diamond Ring',
    orderType: 'Customer',
    customerOrderNumber: 'CUST-00123',
    urgency: 'High',
    budget: 5000,
    ornamentType: 'Ring',
    goldWeight: 8.5,
    diamondWeight: 1.2,
    stoneWeight: 0,
    description: '18k white gold ring with a 1.2-carat central diamond and pave setting on the band. Customer wants a classic, elegant design.',
    images: ['/placeholder-1.png', '/placeholder-2.png'],
    status: 'Pending Approval',
    stage: 'Pending',
    history: [
        { user: 'Showroom Staff', action: 'Created Job', timestamp: '2023-10-26T10:00:00Z' }
    ]
  },
];


export default function QuickCreateJobPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);


 useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({video: true});
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();
    
    return () => {
        // Stop camera stream on component unmount
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    };
  }, [toast]);


  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/png');
        setCapturedImage(dataUrl);
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const storedJobs = JSON.parse(sessionStorage.getItem('jobs') || '[]');
    const allJobs = storedJobs.length > 0 ? storedJobs : initialJobs;

    const stockOrdersCount = allJobs.filter((job: { orderType: string; }) => job.orderType === 'Stock').length;
    if (stockOrdersCount >= 50) {
        toast({
            variant: 'destructive',
            title: 'Stock Order Limit Reached',
            description: 'You cannot create more than 50 stock orders.',
        });
        setIsSubmitting(false);
        return;
    }
    
    const newJob = {
        id: `STK${Math.floor(Math.random() * 900) + 100}`,
        title: `${data.ornamentType} (Stock)`,
        orderType: 'Stock',
        customerOrderNumber: '',
        urgency: 'Low' as 'Low',
        budget: 0,
        ornamentType: data.ornamentType as string,
        goldWeight: 0,
        diamondWeight: 0,
        stoneWeight: 0,
        description: '',
        images: capturedImage ? [capturedImage] : [],
        status: 'Pending Approval',
        stage: 'Pending' as 'Pending',
        assignedTo: null,
        history: [
            { user: 'Current User', action: 'Created Job via Quick Create', timestamp: new Date().toISOString() }
        ]
    };

    sessionStorage.setItem('jobs', JSON.stringify([...allJobs, newJob]));


    await new Promise(resolve => setTimeout(resolve, 500));

    toast({
      title: 'Quick Job Created',
      description: 'The new stock job has been successfully created.',
    });

    router.push('/dashboard/jobs');
    setIsSubmitting(false);
  };

  return (
    <div className="flex-1 space-y-4 p-4 lg:p-6">
       <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon" className="h-7 w-7">
            <Link href="/dashboard/jobs">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
            </Link>
          </Button>
        <h1 className="text-lg font-semibold md:text-2xl">Quick Create Stock Job</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Camera Capture</CardTitle>
          <CardDescription>
            Point your camera at the item and capture a photo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           {hasCameraPermission === false && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Camera Access Required</AlertTitle>
                  <AlertDescription>
                    Please allow camera access in your browser settings to use this feature.
                  </AlertDescription>
                </Alert>
            )}
            <div className="relative aspect-video w-full max-w-md mx-auto bg-muted rounded-lg overflow-hidden">
                {capturedImage ? (
                     <Image src={capturedImage} alt="Captured image" layout="fill" objectFit="contain" />
                ) : (
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                )}
                 <canvas ref={canvasRef} className="hidden" />
            </div>
            <div className="flex justify-center gap-4">
                {capturedImage ? (
                    <Button onClick={handleRetake} variant="outline"><RefreshCcw className="mr-2"/>Retake</Button>
                ) : (
                    <Button onClick={handleCapture} disabled={!hasCameraPermission}><Camera className="mr-2"/>Capture Photo</Button>
                )}
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>
            Enter the type of ornament. Urgency is set to Low automatically.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="ornamentType">Ornament Type</Label>
                <Input id="ornamentType" name="ornamentType" placeholder="e.g., Ring, Necklace, Bracelet" required />
            </div>

            <div className="flex justify-end gap-2">
                 <Button type="button" variant="outline" onClick={() => router.push('/dashboard/jobs')}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || !capturedImage}>
                    <Check className="mr-2"/>
                    {isSubmitting ? 'Creating Job...' : 'Create Quick Job'}
                </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
