
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowUpRight, PlusCircle, CircleCheck, Clock, Cog } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

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
    assignedTo: null,
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
    assignedTo: null,
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
    assignedTo: null,
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
    assignedTo: 'USR007',
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
    assignedTo: null,
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
    assignedTo: null,
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
    assignedTo: null,
    history: [
        { user: 'Manufacturing Manager', action: 'Created Job', timestamp: '2023-10-20T10:00:00Z' },
        { user: 'Manufacturing Manager', action: 'Approved Job', timestamp: '2023-10-20T11:00:00Z' },
        { user: 'QC Manager', action: 'Verified & Completed', timestamp: '2023-10-25T16:00:00Z' }
    ]
  },
];


type Job = typeof initialJobs[0];

export default function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const storedJobs = sessionStorage.getItem('jobs');
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    } else {
      setJobs(initialJobs);
      sessionStorage.setItem('jobs', JSON.stringify(initialJobs));
    }
  }, []);

  const summaryStats = [
    {
      title: 'Total Jobs',
      value: jobs.length,
      icon: Cog,
      color: 'text-blue-500',
    },
    {
      title: 'Pending Approval',
      value: jobs.filter(job => job.stage === 'Pending').length,
      icon: Clock,
      color: 'text-orange-500',
    },
    {
      title: 'Work In Progress',
      value: jobs.filter(job => job.stage === 'WIP').length,
      icon: Cog,
      color: 'text-yellow-500',
    },
    {
      title: 'Completed',
      value: jobs.filter(job => job.stage === 'Completed').length,
      icon: CircleCheck,
      color: 'text-green-500',
    },
  ];

  const recentActivity = jobs
    .flatMap(job => job.history.map(h => ({ ...h, jobId: job.id })))
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);


  return (
    <main className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
         <Button asChild>
          <Link href="/dashboard/jobs/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Job
          </Link>
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {summaryStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
               <p className="text-xs text-muted-foreground">
                in the pipeline
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
          <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>An overview of the latest job updates.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Job ID</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Action</TableHead>
                            <TableHead className="text-right">Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentActivity.map((activity, index) => (
                             <TableRow key={index}>
                                <TableCell className="font-medium">
                                  <Link href={`/dashboard/jobs/${activity.jobId}`} className="hover:underline">
                                    {activity.jobId}
                                  </Link>
                                </TableCell>
                                <TableCell>{activity.user}</TableCell>
                                <TableCell>{activity.action}</TableCell>
                                <TableCell className="text-right text-muted-foreground">
                                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
              </CardContent>
          </Card>
           <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
                 <CardDescription>Navigate to key areas of the application.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                 <Link href="/dashboard/jobs" className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50">
                    <div>
                        <div className="font-semibold">View Job Pipeline</div>
                        <div className="text-sm text-muted-foreground">Manage the end-to-end workflow</div>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                 </Link>
                 <Link href="/dashboard/users" className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50">
                    <div>
                        <div className="font-semibold">Manage Users</div>
                        <div className="text-sm text-muted-foreground">Add, edit, and view all system users</div>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                 </Link>
                  <Link href="/dashboard/settings" className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50">
                    <div>
                        <div className="font-semibold">Application Settings</div>
                        <div className="text-sm text-muted-foreground">Configure system parameters</div>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                 </Link>
              </CardContent>
          </Card>
      </div>

    </main>
  );
}
