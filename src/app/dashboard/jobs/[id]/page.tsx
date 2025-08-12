
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, MessageSquare, Paperclip, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

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

type Job = typeof initialJobs[0];

const JobDetailPage = () => {
    const router = useRouter();
    const params = useParams();
    const jobId = params.id as string;
    const [job, setJob] = useState<Job | null>(null);

     useEffect(() => {
        const storedJobs = JSON.parse(sessionStorage.getItem('jobs') || '[]');
        const allJobs = storedJobs.length > 0 ? storedJobs : initialJobs;
        const foundJob = allJobs.find((j: Job) => j.id === jobId) || null;
        setJob(foundJob);
    }, [jobId]);


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
                            <Button className="w-full">Assign to Artisan</Button>
                            <Button variant="secondary" className="w-full">Mark as Complete</Button>
                            <Button variant="destructive" className="w-full">Reject / Send Back</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default JobDetailPage;
