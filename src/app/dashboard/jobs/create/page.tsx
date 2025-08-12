
'use client';

import { useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Upload, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const initialJobs: any[] = [];


export default function CreateJobPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [orderType, setOrderType] = useState('Customer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
        const newFiles = Array.from(selectedFiles);
        setFiles(prev => [...prev, ...newFiles]);

        newFiles.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews(prev => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    }
  };
  
  const handleRemoveImage = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const storedJobs = JSON.parse(sessionStorage.getItem('jobs') || '[]');
    const allJobs = storedJobs.length > 0 ? storedJobs : initialJobs;

    if (data.orderType === 'Stock') {
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
    }
    
    const newJob = {
        id: `${data.orderType === 'Customer' ? 'ORD' : 'STK'}${Math.floor(Math.random() * 900) + 100}`,
        title: `${data.ornamentType} (${data.orderType})`,
        orderType: data.orderType as string,
        customerOrderNumber: data.orderNumber as string || '',
        urgency: data.urgency as 'Low' | 'Medium' | 'High',
        budget: Number(data.budget),
        ornamentType: data.ornamentType as string,
        goldWeight: Number(data.goldWeight),
        diamondWeight: Number(data.diamondWeight),
        stoneWeight: Number(data.stoneWeight),
        description: data.description as string,
        images: imagePreviews,
        status: 'Pending Approval',
        stage: 'Pending' as 'Pending',
        assignedTo: null,
        history: [
            { user: 'Current User', action: 'Created Job', timestamp: new Date().toISOString() }
        ]
    };

    sessionStorage.setItem('jobs', JSON.stringify([...allJobs, newJob]));


    await new Promise(resolve => setTimeout(resolve, 500));

    toast({
      title: 'Job Created',
      description: 'The new job has been successfully created and is pending approval.',
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
        <h1 className="text-lg font-semibold md:text-2xl">Create New Job</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>
            Fill out the form below to create a new job order.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="orderType">Order Type</Label>
                <Select name="orderType" value={orderType} onValueChange={setOrderType}>
                  <SelectTrigger id="orderType">
                    <SelectValue placeholder="Select order type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Customer">Customer Order</SelectItem>
                    <SelectItem value="Stock">Stock Order</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {orderType === 'Customer' && (
                <div className="space-y-2">
                  <Label htmlFor="orderNumber">Customer Order Number</Label>
                  <Input id="orderNumber" name="orderNumber" placeholder="e.g., CUST-00123" />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency</Label>
                <Select name="urgency" required>
                  <SelectTrigger id="urgency">
                    <SelectValue placeholder="Select urgency level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget</Label>
                <Input id="budget" name="budget" type="number" placeholder="Enter budget amount" />
              </div>

               <div className="space-y-2 md:col-span-2">
                <Label htmlFor="ornamentType">Ornament Type</Label>
                <Input id="ornamentType" name="ornamentType" placeholder="e.g., Ring, Necklace, Bracelet" required />
              </div>

            </div>

             <div className="space-y-4 rounded-lg border p-4">
                 <h3 className="font-medium">Material Weights (Grams)</h3>
                 <p className="text-sm text-muted-foreground">
                    Only Manufacturing Managers or Admins can modify these values later.
                 </p>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                        <Label htmlFor="goldWeight">Gold</Label>
                        <Input id="goldWeight" name="goldWeight" type="number" step="0.01" placeholder="e.g., 10.50" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="diamondWeight">Diamond</Label>
                        <Input id="diamondWeight" name="diamondWeight" type="number" step="0.01" placeholder="e.g., 1.25" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="stoneWeight">Coloured Stone</Label>
                        <Input id="stoneWeight" name="stoneWeight" type="number" step="0.01" placeholder="e.g., 5.75" />
                    </div>
                </div>
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="description">Description / Notes</Label>
                <Textarea id="description" name="description" placeholder="Add any relevant details or instructions for the artisans."/>
            </div>

            <div className="space-y-2">
              <Label>Upload Images</Label>
              <div className="flex items-center justify-center w-full">
                  <Label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80"
                  >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                      </div>
                      <Input id="dropzone-file" type="file" className="hidden" multiple onChange={handleImageChange} accept="image/*" />
                  </Label>
              </div>
                {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imagePreviews.map((src, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={src}
                        alt={`Preview ${index}`}
                        width={150}
                        height={150}
                        className="rounded-md object-cover w-full aspect-square"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2">
                 <Button type="button" variant="outline" onClick={() => router.push('/dashboard/jobs')}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating Job...' : 'Create Job'}
                </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
