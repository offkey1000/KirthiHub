
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Camera } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { getAllJobs } from '@/lib/job-storage';

const KanbanBoard = dynamic(
  () => import('@/components/kanban-board').then((mod) => mod.KanbanBoard),
  {
    ssr: false,
    loading: () => (
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start h-full p-1">
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
           <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
           <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
          </div>
      </div>
    ),
  }
);

type Job = {
  id: string;
  title: string;
  orderType: string;
  customerOrderNumber?: string;
  urgency: 'High' | 'Medium' | 'Low';
  budget: number;
  ornamentType: string;
  goldWeight: number;
  diamondWeight: number;
  stoneWeight: number;
  description: string;
  images: string[];
  status: string;
  stage: 'Pending' | 'WIP' | 'Completed';
  history: { user: string; action: string; timestamp: string }[];
  assignedTo?: string | null;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    setJobs(getAllJobs());
  }, []);


  return (
    <div className="flex-1 space-y-4 p-4 lg:p-6 flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Job Pipeline</h1>
        <div className="flex gap-2">
            <Button asChild variant="secondary">
              <Link href="/dashboard/jobs/quick-create">
                <Camera className="mr-2 h-4 w-4" />
                Quick Create
              </Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/jobs/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Job
              </Link>
            </Button>
        </div>
      </div>
      <KanbanBoard jobs={jobs} />
    </div>
  );
}
