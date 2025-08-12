
'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, MessageSquare, Paperclip, Plus, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

// This is mock data. In a real app, you'd fetch this from your database.
const jobs = [
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
  {
    id: 'STK001',
    title: 'Stock Gold Chain',
    orderType: 'Stock',
    urgency: 'Medium',
    budget: 1500,
    ornamentType: 'Chain',
    goldWeight: 20.0,
    diamondWeight: 0,
    stoneWeight: 0,
    description: '22k yellow gold, 24-inch rope chain for stock.',
    images: [],
    status: 'In Casting',
    stage: 'WIP',
    history: [
        { user: 'Admin', action: 'Created Job', timestamp: '2023-10-25T14:30:00Z' },
        { user: 'Manufacturing Manager', action: 'Approved Job', timestamp: '2023-10-25T15:00:00Z' },
        { user: 'Artisan (Casting)', action: 'Accepted Job', timestamp: '2023-10-25T16:00:00Z' }
    ]
  },
  {
    id: 'ORD002',
    title: 'Custom Necklace',
    orderType: 'Customer',
    customerOrderNumber: 'CUST-00124',
    urgency: 'Low',
    budget: 3200,
    ornamentType: 'Necklace',
    goldWeight: 12.0,
    diamondWeight: 0.5,
    stoneWeight: 2.5,
    description: 'Custom pendant necklace with a pear-shaped sapphire and small diamonds.',
    images: ['/placeholder-3.png'],
    status: 'In Filing',
    stage: 'WIP',
    history: [
        { user: 'Showroom Staff', action: 'Created Job', timestamp: '2023-10-24T11:00:00Z' },
        { user: 'Manufacturing Manager', action: 'Approved Job', timestamp: '2023-10-24T12:00:00Z' },
         { user: 'Artisan (Casting)', action: 'Marked as complete', timestamp: '2023-10-25T09:00:00Z' },
        { user: 'Artisan (Filing)', action: 'Accepted Job', timestamp: '2023-10-25T10:00:00Z' }
    ]
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
    ]
  },
  {
    id: 'STK002',
    title: 'Stock Pearl Earrings',
    orderType: 'Stock',
    urgency: 'Medium',
    budget: 800,
    ornamentType: 'Earrings',
    goldWeight: 4.0,
    diamondWeight: 0,
    stoneWeight: 1.5,
    description: 'Simple 14k gold stud earrings with freshwater pearls.',
    images: [],
    status: 'In Polishing',
    stage: 'WIP',
     history: [
        { user: 'Manufacturing Manager', action: 'Created Job', timestamp: '2023-10-22T10:00:00Z' },
        { user: 'Manufacturing Manager', action: 'Approved Job', timestamp: '2023-10-22T11:00:00Z' },
        { user: 'Artisan (Setting)', action: 'Marked as complete', timestamp: '2023-10-24T18:00:00Z' },
        { user: 'Artisan (Polishing)', action: 'Accepted Job', timestamp: '2023-10-25T08:00:00Z' }
    ]
  },
  {
    id: 'ORD004',
    title: 'Engraved Bracelet',
    orderType: 'Customer',
    customerOrderNumber: 'CUST-00126',
    urgency: 'Low',
    budget: 1200,
    ornamentType: 'Bracelet',
    goldWeight: 10.0,
    diamondWeight: 0,
    stoneWeight: 0,
    description: 'Silver bracelet to be engraved with "Amor Fati".',
    images: ['/placeholder-4.png'],
    status: 'QC Pending',
    stage: 'WIP',
     history: [
        { user: 'Showroom Staff', action: 'Created Job', timestamp: '2023-10-21T13:00:00Z' },
        { user: 'Manufacturing Manager', action: 'Approved Job', timestamp: '2023-10-21T14:00:00Z' },
        { user: 'Artisan (Polishing)', action: 'Marked as complete', timestamp: '2023-10-24T17:00:00Z' },
        { user: 'Manufacturing Manager', action: 'Sent to QC', timestamp: '2023-10-25T14:00:00Z' }
    ]
  },
  {
    id: 'STK003',
    title: 'Stock Ruby Pendant',
    orderType: 'Stock',
    urgency: 'Medium',
    budget: 2500,
    ornamentType: 'Pendant',
    goldWeight: 5.0,
    diamondWeight: 0.2,
    stoneWeight: 3.0,
    description: '18k gold pendant with a central oval ruby, surrounded by a halo of small diamonds.',
    images: [],
    status: 'Completed',
    stage: 'Completed',
    history: [
        { user: 'Manufacturing Manager', action: 'Created Job', timestamp: '2023-10-20T10:00:00Z' },
        { user: 'Manufacturing Manager', action: 'Approved Job', timestamp: '2023-10-20T11:00:00Z' },
        { user: 'QC Manager', action: 'Verified & Completed', timestamp: '2023-10-25T16:00:00Z' }
    ]
  },
];

const JobDetailPage = () => {
    const router = useRouter();
    const params = useParams();
    const jobId = params.id as string;

    const job = jobs.find(j => j.id === jobId);

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
