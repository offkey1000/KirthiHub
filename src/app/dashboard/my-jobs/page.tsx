
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ListChecks } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const initialJobs = [
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
    history: [],
    assignedTo: 'USR007' // Assigned to Casting Artisan
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
    status: 'Assigned to Casting Artisan',
    stage: 'WIP',
    history: [],
    assignedTo: 'USR007'
  },
];

type Job = typeof initialJobs[0];
type User = {
    id: string;
    role: string;
};

export default function MyJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('loggedInUser');
    if (storedUser) {
        const currentUser = JSON.parse(storedUser);
        setUser(currentUser);
        
        const storedJobs = sessionStorage.getItem('jobs');
        const allJobs = storedJobs ? JSON.parse(storedJobs) : initialJobs;

        // Filter jobs assigned to the current artisan
        const assignedJobs = allJobs.filter((job: Job) => job.assignedTo === currentUser.id);
        setJobs(assignedJobs);

    } else {
        // Handle case where user is not logged in
        // Maybe redirect to login page
    }
  }, []);

  const urgencyBadge = {
    'High': 'destructive',
    'Medium': 'secondary',
    'Low': 'outline',
  } as const;

  return (
    <div className="flex-1 space-y-4 p-4 lg:p-6">
      <div className="flex items-center">
        <ListChecks className="mr-2 h-6 w-6" />
        <h1 className="text-lg font-semibold md:text-2xl">My Assigned Jobs</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Job Queue</CardTitle>
          <CardDescription>
            These are the jobs that have been assigned to you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.id}</TableCell>
                    <TableCell>{job.title}</TableCell>
                    <TableCell>
                      <Badge variant={urgencyBadge[job.urgency as keyof typeof urgencyBadge]}>
                        {job.urgency}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{job.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                       <Button asChild variant="ghost" size="icon">
                          <Link href={`/dashboard/jobs/${job.id}`}>
                            <ArrowUpRight className="h-4 w-4" />
                            <span className="sr-only">View Job</span>
                          </Link>
                        </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                    <TableCell colSpan={5} className="text-center h-24">
                        You have no jobs assigned to you.
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
