
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, MessageSquare, Paperclip, Send, User, AlertTriangle, CheckCircle, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

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
    ],
    assignedTo: null,
  },
   {
    id: 'ORD003',
    title: 'Wedding Band Set',
    orderType: 'Customer',
    customerOrderNumber: 'CUST-00125',
    urgency: 'High',
    budget: 7000,
    ornamentType: 'Ring Set',
    goldWeight: 15.0,
    diamondWeight: 2.0,
    stoneWeight: 0,
    description: 'Matching wedding bands in platinum. His and hers. Both with inset diamonds.',
    images: [],
    status: 'In Setting',
    stage: 'WIP',
     history: [
        { user: 'Showroom Manager', action: 'Created Job', timestamp: '2023-10-23T16:00:00Z' },
        { user: 'Manufacturing Manager', action: 'Approved Job', timestamp: '2023-10-23T17:00:00Z' },
        { user: 'Artisan (Casting)', action: 'Marked as complete', timestamp: '2023-10-24T14:00:00Z' },
        { user: 'Artisan (Filing)', action: 'Marked as complete', timestamp: '2023-10-25T11:00:00Z' },
        { user: 'Artisan (Setting)', action: 'Accepted Job', timestamp: '2023-10-25T12:00:00Z' }
    ],
    assignedTo: 'USR007'
  },
];

const initialUsers = [
  {
    id: 'USR001',
    name: 'Admin User',
    role: 'Admin',
    status: 'Active',
    code: '4243',
  },
  {
    id: 'USR006',
    name: 'CAD Artisan',
    role: 'Artisan (CAD)',
    status: 'Inactive',
  },
  {
    id: 'USR007',
    name: 'Casting Artisan',
    role: 'Artisan (Casting)',
    status: 'Active',
    code: '5678'
  },
];


type Job = (typeof initialJobs)[0];
type User = (typeof initialUsers)[0] & { role: string };

const JobDetailPage = () => {
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    const jobId = params.id as string;
    
    const [job, setJob] = useState<Job | null>(null);
    const [artisans, setArtisans] = useState<User[]>([]);
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    const [selectedArtisan, setSelectedArtisan] = useState('');
    const [rejectionReason, setRejectionReason] = useState('');
    
    const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
    const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    
    useEffect(() => {
        const storedJobs = JSON.parse(sessionStorage.getItem('jobs') || '[]');
        const allJobs = storedJobs.length > 0 ? storedJobs : initialJobs;
        const foundJob = allJobs.find((j: Job) => j.id === jobId) || null;
        setJob(foundJob);

        const storedUsers = JSON.parse(sessionStorage.getItem('users') || '[]');
        const allUsers = storedUsers.length > 0 ? storedUsers : initialUsers;
        const artisanUsers = allUsers.filter((u: User) => u.role.startsWith('Artisan') && u.status === 'Active');
        setArtisans(artisanUsers);

        const storedUser = sessionStorage.getItem('loggedInUser');
        if (storedUser) {
            setLoggedInUser(JSON.parse(storedUser));
        }

    }, [jobId]);

    const updateJobInStorage = (updatedJob: Job) => {
        const storedJobs = JSON.parse(sessionStorage.getItem('jobs') || '[]');
        const allJobs = storedJobs.length > 0 ? storedJobs : initialJobs;
        const updatedJobs = allJobs.map((j: Job) => (j.id === updatedJob.id ? updatedJob : j));
        sessionStorage.setItem('jobs', JSON.stringify(updatedJobs));
        setJob(updatedJob);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
        const newFiles = Array.from(selectedFiles);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
        setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
        }
    };
    
    const handleRemoveImage = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
        setImagePreviews((prevPreviews) => {
        const newPreviews = prevPreviews.filter((_, i) => i !== index);
        URL.revokeObjectURL(prevPreviews[index]);
        return newPreviews;
        });
    };

    const handleUploadImages = () => {
        if (!job) return;
        const updatedJob = {
            ...job,
            images: [...job.images, ...imagePreviews],
             history: [...job.history, { 
                user: loggedInUser?.name || 'Artisan', 
                action: `Uploaded ${files.length} new image(s)`, 
                timestamp: new Date().toISOString() 
            }],
        };
        updateJobInStorage(updatedJob);
        toast({ title: 'Success', description: 'Images uploaded successfully.' });
        setIsUploadDialogOpen(false);
        setImagePreviews([]);
        setFiles([]);
    };

    const handleAssignJob = () => {
        if (!job || !selectedArtisan) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please select an artisan.' });
            return;
        }
        const artisan = artisans.find(a => a.id === selectedArtisan);
        if (!artisan) return;

        const updatedJob = {
            ...job,
            status: `Assigned to ${artisan.name}`,
            assignedTo: artisan.id,
            history: [...job.history, {
                user: loggedInUser?.name || 'Manager',
                action: `Assigned job to ${artisan.name} (${artisan.role})`,
                timestamp: new Date().toISOString(),
            }],
        };

        updateJobInStorage(updatedJob);

        toast({
            title: 'Job Assigned',
            description: `${job.title} has been assigned to ${artisan.name}.`,
        });
        setIsAssignDialogOpen(false);
        setSelectedArtisan('');
    };
    
    const handleRejectJob = () => {
        if (!job || !rejectionReason) {
             toast({ variant: 'destructive', title: 'Error', description: 'Please provide a reason for rejection.' });
            return;
        }

        const updatedJob = {
            ...job,
            status: `Rejected`,
            stage: 'Pending' as const,
            assignedTo: null,
            history: [...job.history, {
                user: loggedInUser?.name || 'Manager',
                action: `Job Rejected. Reason: ${rejectionReason}`,
                timestamp: new Date().toISOString(),
            }],
        };

        updateJobInStorage(updatedJob);

        toast({
            variant: 'destructive',
            title: 'Job Rejected',
            description: `${job.title} has been rejected and sent back.`,
        });
        setRejectionReason('');
    };

    const handleArtisanAction = (action: 'Accepted' | 'Completed') => {
        if (!job || !loggedInUser) return;
        
        const isAccepting = action === 'Accepted';
        const newStatus = isAccepting ? `In Progress (${loggedInUser.name})` : `Completed by ${loggedInUser.name}`;
        const actionText = isAccepting ? 'Accepted Job' : 'Marked Job as Complete';

        const updatedJob = {
            ...job,
            status: newStatus,
            history: [...job.history, {
                user: loggedInUser.name,
                action: actionText,
                timestamp: new Date().toISOString(),
            }],
        };

        if (action === 'Completed') {
            updatedJob.status = `QC Pending`; // Or another appropriate status
        }

        updateJobInStorage(updatedJob);
        toast({ title: 'Success', description: `Job has been marked as: ${action}` });
    };

    if (!job) {
        return (
             <div className="flex-1 space-y-4 p-4 lg:p-6 flex flex-col items-center justify-center">
                 <p>Job not found.</p>
                 <Button onClick={() => router.push('/dashboard/jobs')}>Go Back</Button>
            </div>
        )
    }

    const urgencyBadge = {
        'High': 'destructive',
        'Medium': 'secondary',
        'Low': 'outline',
    } as const;

    const isArtisan = loggedInUser?.role.startsWith('Artisan');
    const isManager = loggedInUser?.role.includes('Manager');

    return (
        <div className="flex-1 space-y-4 p-4 lg:p-6">
            <div className="flex items-center gap-4">
                 <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-lg font-semibold md:text-2xl flex items-center gap-2">
                        {job.title} 
                        <Badge variant={urgencyBadge[job.urgency as keyof typeof urgencyBadge]}>{job.urgency}</Badge>
                        <Badge variant="outline">{job.status}</Badge>
                    </h1>
                    <p className="text-sm text-muted-foreground">{job.id}</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Job Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="grid grid-cols-2 gap-4">
                                <div className="font-semibold">Order Type:</div>
                                <div>{job.orderType} {job.orderType === 'Customer' && `(${job.customerOrderNumber})`}</div>

                                <div className="font-semibold">Ornament Type:</div>
                                <div>{job.ornamentType}</div>

                                <div className="font-semibold">Budget:</div>
                                <div>${job.budget.toLocaleString()}</div>
                             </div>
                             <Separator />
                             <div className="space-y-2">
                                <h4 className="font-semibold">Description</h4>
                                <p className="text-muted-foreground">{job.description}</p>
                             </div>
                             <Separator />
                             <div className="space-y-2">
                                <h4 className="font-semibold">Material Weights (Grams)</h4>
                                 <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div>Gold: <span className="font-medium text-foreground">{job.goldWeight}g</span></div>
                                    <div>Diamond: <span className="font-medium text-foreground">{job.diamondWeight}g</span></div>
                                    <div>Coloured Stone: <span className="font-medium text-foreground">{job.stoneWeight}g</span></div>
                                 </div>
                             </div>
                             <Separator />
                            <div>
                                <h4 className="font-semibold mb-4">Reference Images</h4>
                                {job.images.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {job.images.map((src, index) => (
                                            <Image key={index} src={src.startsWith('/') ? `https://placehold.co/300x300.png` : src} alt={`Reference ${index + 1}`} width={200} height={200} className="rounded-lg object-cover" />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">No reference images were uploaded.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MessageSquare className="h-5 w-5" />
                                Comments & Updates
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="flex gap-4">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                                 <div className="w-full">
                                    <Textarea placeholder="Add a comment or update..."/>
                                    <div className="flex justify-between items-center mt-2">
                                        <Button size="sm" variant="outline"><Paperclip className="mr-2 h-4 w-4"/>Attach</Button>
                                        <Button size="sm"><Send className="mr-2 h-4 w-4"/>Post</Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Job History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {job.history.slice().reverse().map((entry, index) => (
                                    <li key={index} className="flex gap-4">
                                         <div className="flex flex-col items-center">
                                            <div className="bg-primary rounded-full h-8 w-8 flex items-center justify-center">
                                                <User className="h-4 w-4 text-primary-foreground" />
                                            </div>
                                            {index < job.history.length - 1 && <div className="w-px h-full bg-border" />}
                                        </div>
                                        <div>
                                            <p className="font-medium">{entry.action}</p>
                                            <p className="text-sm text-muted-foreground">{entry.user}</p>
                                            <p className="text-xs text-muted-foreground">{new Date(entry.timestamp).toLocaleString()}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                             { isArtisan && job.assignedTo === loggedInUser?.id && (
                                <>
                                    <Button className="w-full" onClick={() => handleArtisanAction('Accepted')} disabled={job.status.startsWith('In Progress')}>Accept Job</Button>
                                    <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button variant="secondary" className="w-full">Upload Finished Work</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Upload Images</DialogTitle>
                                                <DialogDescription>Select images of the finished work to upload.</DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-center w-full">
                                                    <Label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                                            <p className="mb-2 text-sm text-muted-foreground">
                                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                                            </p>
                                                        </div>
                                                        <Input id="dropzone-file" type="file" className="hidden" multiple onChange={handleImageChange} accept="image/*" />
                                                    </Label>
                                                </div>
                                                {imagePreviews.length > 0 && (
                                                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    {imagePreviews.map((src, index) => (
                                                        <div key={index} className="relative group">
                                                        <Image src={src} alt={`Preview ${index}`} width={150} height={150} className="rounded-md object-cover w-full aspect-square"/>
                                                        <Button type="button" variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => handleRemoveImage(index)}>
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                        </div>
                                                    ))}
                                                    </div>
                                                )}
                                            </div>
                                            <DialogFooter>
                                                <Button type="button" variant="outline" onClick={() => setIsUploadDialogOpen(false)}>Cancel</Button>
                                                <Button type="button" onClick={handleUploadImages} disabled={files.length === 0}>Upload</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                    <Button className="w-full" onClick={() => handleArtisanAction('Completed')}>Mark as Complete</Button>
                                </>
                            )}
                            { isManager && (
                                <>
                                    <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button className="w-full">Assign to Artisan</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Assign Job to Artisan</DialogTitle>
                                                <DialogDescription>
                                                    Select an artisan to assign this job to. They will be notified.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="artisan" className="text-right">
                                                        Artisan
                                                    </Label>
                                                    <Select value={selectedArtisan} onValueChange={setSelectedArtisan}>
                                                        <SelectTrigger id="artisan" className="col-span-3">
                                                            <SelectValue placeholder="Select an artisan" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {artisans.map(artisan => (
                                                                <SelectItem key={artisan.id} value={artisan.id}>
                                                                    {artisan.name} - {artisan.role}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button type="button" onClick={handleAssignJob}>Assign Job</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                    <Button variant="secondary" className="w-full">Mark as Complete</Button>
                                    
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" className="w-full">Reject / Send Back</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure you want to reject this job?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action will send the job back to the previous stage. Please provide a reason for rejection.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <div className="space-y-2">
                                                <Label htmlFor="reason">Rejection Reason</Label>
                                                <Textarea 
                                                    id="reason" 
                                                    placeholder="e.g., Casting issue, design not as per spec..." 
                                                    value={rejectionReason}
                                                    onChange={(e) => setRejectionReason(e.target.value)}
                                                />
                                            </div>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={handleRejectJob} disabled={!rejectionReason}>
                                                    Confirm Rejection
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default JobDetailPage;
