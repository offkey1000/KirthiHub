
'use client';

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

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

export default function JobsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 lg:p-6 flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Job Pipeline</h1>
        <Button asChild>
          <Link href="/dashboard/jobs/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Job
          </Link>
        </Button>
      </div>
      <KanbanBoard jobs={jobs} />
    </div>
  );
}
